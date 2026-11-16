from django.contrib.auth import get_user_model
from django.contrib.auth.models import UserManager
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from to_do_settings.permissions import IsOwner
from apps.main.api.serializers import UserSerializer, UserCreateSerializer

User = get_user_model()


class WhoIAmViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsOwner]
    http_method_names = ["get"]

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(pk=self.request.user.pk)


class UserCreateViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    http_method_names = ["post"]
