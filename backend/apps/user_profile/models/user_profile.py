from functools import partial

from django.db import models
from to_do_settings.functions import file_directory_path


class UserProfile(models.Model):
    user = models.OneToOneField("auth.User", on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to=partial(file_directory_path, data=["user"]), blank=True, null=True
    )

    def __str__(self):
        return self.user.username
