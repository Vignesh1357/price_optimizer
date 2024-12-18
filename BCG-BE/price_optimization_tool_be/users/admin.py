from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import User, Role, OTP

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'role', 'is_active', 'is_staff')

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    list_display = ('user','code', 'is_used')