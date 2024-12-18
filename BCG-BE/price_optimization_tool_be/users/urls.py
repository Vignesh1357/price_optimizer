from django.urls import path
from .views import RegisterView, VerifyEmailView, LoginView, CheckUsernameView, UserDetailView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'), # URL to Register User
    path('verify-email/', VerifyEmailView.as_view(), name='verify_email'), # URL to verify email using otp
    path('login/', LoginView.as_view(), name='login'), # URL to Login
    path('check-username/', CheckUsernameView.as_view(), name='check-username'), # URL to check if account already exist with this username
    path('profile/', UserDetailView.as_view(), name='user-detail'), # URL to get user details
]
