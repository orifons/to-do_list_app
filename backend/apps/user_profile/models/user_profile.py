from functools import partial
from django.db import models

from apps.main.models import TimeStampedModel
from django.utils.translation import gettext_lazy as _
from to_do_settings.functions import file_directory_path


class UserProfile(TimeStampedModel):
    user = models.OneToOneField(
        "auth.User", verbose_name=_("user"), on_delete=models.CASCADE
    )
    image = models.ImageField(
        verbose_name=_("image"),
        upload_to=partial(file_directory_path, data=["user"]),
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.user.username
