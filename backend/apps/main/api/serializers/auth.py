from typing import Any

from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from apps.main.api.serializers.user import UserSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def create(self, validated_data):
        return validated_data

    def validate(self, attrs):
        data: dict[str, Any] = super().validate(attrs)

        if not self.user:
            raise AuthenticationFailed(
                "No active account found with the given credentials"
            )

        refresh = self.get_token(self.user)

        data["refresh"] = str(refresh)
        data["access"] = str(getattr(refresh, "access_token"))
        data["user"] = UserSerializer(self.user).data

        return data
