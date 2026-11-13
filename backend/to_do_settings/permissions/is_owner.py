from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsOwner(BasePermission):
    """
    Customized permission to ensure that only the owner of the record can access or modify it.
    """

    def has_object_permission(self, request, view, obj):

        return obj.user == request.user
