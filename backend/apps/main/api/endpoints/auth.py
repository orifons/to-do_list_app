from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView

from main.api.serializers import CustomTokenObtainPairSerializer, UserSerializer


class SignInView(TokenObtainPairView):
    permission_classes = []
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK and response.data:
            user = User.objects.get(id=response.data["user"]["id"])
            response.data.update(
                {"user": UserSerializer(user, context={"request": request}).data}
            )
            return response
        return response
