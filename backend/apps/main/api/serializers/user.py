from rest_framework import serializers
from django.contrib.auth import get_user_model

from apps.main.models import Profile
from apps.main.api.serializers import ProfileSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = User
        exclude = ["password", "user_permissions", "groups"]

    def get_avatar(self, obj=None):
        if not obj:
            return None

        profile = Profile.objects.get_or_create(user=obj)[0]
        return ProfileSerializer(profile, context=self.context).data
