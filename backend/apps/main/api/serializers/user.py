from jsonschema import ValidationError
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


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True, write_only=True)
    password_confirm = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
            "password_confirm",
        ]

    def validate(self, attrs):
        required_fields = ["username", "password", "password_confirm"]
        for field in required_fields:
            if not attrs.get(field, None):
                raise serializers.ValidationError(f"{field} is required.")

        if attrs.get("password") != attrs.get("password_confirm"):
            raise serializers.ValidationError("Passwords do not match xds.")

        return super().validate(attrs)

    def create(self, validated_data):
        password = validated_data.pop("password")
        validated_data.pop("password_confirm")

        create = super().create(validated_data)
        print(create)

        create.set_password(password)
        create.save()

        return create
