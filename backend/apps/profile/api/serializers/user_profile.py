from rest_framework import serializers
from apps.profile.models import UserProfile
from apps.main.api.serializers import TimeStampedModelSerializer

class UserProfileSerializer(TimeStampedModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"
