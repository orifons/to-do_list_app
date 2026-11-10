from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from main.api.serializers.user import UserSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def create(self, validated_data):
        return validated_data

    def validate(self, attrs):
        data = super().validate(attrs)

        if self.user:
            refresh = self.get_token(self.user)

            data["refresh"] = str(refresh)
            data["access"] = str(refresh["access_token"])
            data["user"] = str(UserSerializer(self.user).data)

        return data
