from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import serializers

from apps.profile.models import UserProfile
from apps.profile.api.serializers import UserProfileSerializer


class UserSettingsUpdateSerializer(serializers.Serializer):
    avatar = serializers.ImageField(required=False, allow_null=True, write_only=True)
    current_password = serializers.CharField(
        required=False, write_only=True, allow_blank=True
    )
    new_password = serializers.CharField(
        required=False, write_only=True, allow_blank=True
    )
    confirm_password = serializers.CharField(
        required=False, write_only=True, allow_blank=True
    )

    def validate(self, attrs):
        password_fields = ["current_password", "new_password", "confirm_password"]
        provided_password_fields = [
            field for field in password_fields if attrs.get(field) not in (None, "")
        ]

        if provided_password_fields:
            missing_fields = [
                field
                for field in password_fields
                if field not in provided_password_fields
            ]
            if missing_fields:
                raise serializers.ValidationError(
                    {
                        field: "Este campo es obligatorio al actualizar la contraseña."
                        for field in missing_fields
                    }
                )

            if attrs["new_password"] != attrs["confirm_password"]:
                raise serializers.ValidationError(
                    {
                        "confirm_password": "La confirmación de la contraseña no coincide."
                    }
                )

            user = self.context["request"].user
            if not user.check_password(attrs["current_password"]):
                raise serializers.ValidationError(
                    {"current_password": "La contraseña actual es incorrecta."}
                )

        return attrs

    def update(self, instance, validated_data):
        profile = UserProfile.objects.get_or_create(user=instance)[0]

        if "avatar" in validated_data:
            profile.image = validated_data["image"]
            profile.save()

        if "new_password" in validated_data:
            instance.set_password(validated_data["new_password"])
            instance.save()

        return instance


class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        exclude = ["password", "user_permissions", "groups"]

    def get_profile(self, obj=None):

        if not obj:
            print("El obj esta vacio", obj)
            return obj

        profile = UserProfile.objects.get_or_create(user=obj)[0]

        return UserProfileSerializer(profile, context=self.context).data


class UserSerializerUpdate(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
        ]


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True, write_only=True)
    provider = serializers.CharField(required=False, write_only=True)

    class Meta:
        model = User
        exclude = [
            "groups",
            "user_permissions",
            "date_joined",
            "last_login",
            "is_superuser",
            "is_staff",
            "is_active",
        ]

    def create(self, validated_data):
        if validated_data.get("provider", None):
            validated_data.pop("provider")
        validated_data["is_active"] = False
        password = validated_data.pop("password")

        usuario = User.objects.create(**validated_data)
        usuario.set_password(password)
        usuario.save()
        return usuario
