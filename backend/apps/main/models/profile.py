from functools import partial
from django.db import models, router, transaction
from django.utils.translation import gettext_lazy as _

from apps.main.models.timestamped_abstract import TimeStampedModel
from to_do_settings.functions import file_directory_path


class Profile(TimeStampedModel):
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

    def save(self, *args, **kwargs):
        using = kwargs.get("using") or router.db_for_write(type(self), instance=self)
        update_fields = kwargs.get("update_fields")

        if update_fields is not None and "image" not in update_fields:
            return super().save(*args, **kwargs)

        with transaction.atomic(using=using):
            old_image_name = None
            if self.pk:
                old_image_name = (
                    Profile.objects.using(using)
                    .filter(pk=self.pk)
                    .values_list("image", flat=True)
                    .first()
                )

            super().save(*args, **kwargs)

            new_image_name = self.image.name
            if old_image_name and old_image_name != new_image_name:
                transaction.on_commit(
                    partial(self.image.storage.delete, old_image_name),
                    using=using,
                )
