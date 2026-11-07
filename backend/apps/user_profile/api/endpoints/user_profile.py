from rest_framework import viewsets

from apps.user_profile.models import UserProfile
from apps.user_profile.api.serializers import UserProfileSerializer


class UserProfileViewSets(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
