from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, Role, OTP
from rest_framework.exceptions import ValidationError
from .utils import generate_otp, send_otp_email


# User registration serializer
class RegistrationSerializer(serializers.ModelSerializer):
    role = serializers.CharField()

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password', 'role']

    def validate_role(self, value):
        """ Ensure the role exists and is valid. """
        try:
            role = Role.objects.get(name=value)
        except Role.DoesNotExist:
            raise ValidationError("Invalid role. Allowed roles are 'buyer' and 'supplier'.")

        if role.name == 'admin':
            raise ValidationError("The 'admin' role can only be assigned through the Django admin panel.")

        return role

    def create(self, validated_data):
        # Pop the role name and get the Role instance
        role_name = validated_data.pop('role')
        role_instance = Role.objects.get(name=role_name)

        # Create the user
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
            role=role_instance,
        )

        # Generate OTP
        otp_code = generate_otp()
        OTP.objects.create(user=user, code=otp_code)

        # Send OTP via email
        send_otp_email(validated_data['email'], otp_code)

        return user


# Class to verify if email already exists
class VerifyEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)

    def validate(self, data):
        try:
            # Fetch user and associated OTP
            user = User.objects.get(email=data['email'])
            otp_record = OTP.objects.filter(user=user, code=data['otp'], is_used=False).latest('created_at')

            # Mark the OTP as used
            otp_record.is_used = True
            otp_record.save()

            # Verify user's email
            user.is_email_verified = True
            user.save()

            return data
        except (User.DoesNotExist, OTP.DoesNotExist):
            raise serializers.ValidationError("Invalid email or OTP.")


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        if not user.is_email_verified:
            raise serializers.ValidationError("Email not verified")
        return user


class CheckUsernameSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150, required=True)

    def validate(self, data):
        user = User.objects.filter(username=data["username"])
        if not user:
            return user
        else:
            raise serializers.ValidationError("Account with this username already exists.")


class UserSerializer(serializers.ModelSerializer):
    role = serializers.StringRelatedField()  # To display the role as a string

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'is_email_verified', 'role']
