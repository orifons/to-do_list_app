from rest_framework import viewsets, permissions
from to_do_settings.permissions import IsOwnerOrReadOnly

from apps.profile.models import UserProfile
from apps.profile.api.serializers import UserProfileSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)
