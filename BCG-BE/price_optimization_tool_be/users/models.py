from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    role = models.ForeignKey('Role', on_delete=models.SET_NULL, null=True, related_name='users')
    is_email_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.email


class OTP(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='otps')
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp for OTP generation
    is_used = models.BooleanField(default=False)  # Flag to mark if the OTP was used

    def __str__(self):
        return f"OTP for {self.user.email} - {self.code}"


class Role(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name
