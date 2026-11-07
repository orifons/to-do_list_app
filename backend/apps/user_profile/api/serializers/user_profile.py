from rest_framework import serializers
from apps.user_profile.models import UserProfile
from apps.main.api.serializers import TimeStampedModelSerializer

class UserProfileSerializer(TimeStampedModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"
