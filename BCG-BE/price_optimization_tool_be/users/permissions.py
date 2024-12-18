from rest_framework.permissions import BasePermission

# Check if the user has admin role
class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return (
                request.user.is_authenticated
                and request.user.role is not None
                and request.user.role.name == 'admin'
        )


# Check if the user has buyer role
class IsBuyer(BasePermission):
    def has_permission(self, request, view):
        return (
                request.user.is_authenticated
                and request.user.role is not None
                and request.user.role.name == 'buyer'
        )


# Check if the user has supplier role
class IsSupplier(BasePermission):
    def has_permission(self, request, view):
        return (
                request.user.is_authenticated
                and request.user.role is not None
                and request.user.role.name == 'supplier'
        )


# Logical OR for combining multiple permissions
class Or(BasePermission):
    def __init__(self, permission_classes):
        self.permission_classes = permission_classes

    def has_permission(self, request, view):
        return any(permission().has_permission(request, view) for permission in self.permission_classes)
