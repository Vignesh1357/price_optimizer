from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegistrationSerializer, VerifyEmailSerializer, LoginSerializer, CheckUsernameSerializer, \
    UserSerializer
from rest_framework.permissions import IsAuthenticated


# User Registration View
class RegisterView(APIView):
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered. Please verify your email."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# OTP Verification
class VerifyEmailView(APIView):
    def post(self, request):
        serializer = VerifyEmailSerializer(data=request.data)
        if serializer.is_valid():
            return Response({"message": "Email verified successfully."}, status=status.HTTP_200_OK)
        return Response({"message": "OTP is Invalid."}, status=status.HTTP_400_BAD_REQUEST)


# Login View
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "first_name": user.first_name
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# View to validate Username
class CheckUsernameView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CheckUsernameSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"message": "Account with this username already exists."},
                status=status.HTTP_400_BAD_REQUEST
            )
        return Response(
            {"message": "Username is valid."},
            status=status.HTTP_200_OK
        )

# View to fetch user details
class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
