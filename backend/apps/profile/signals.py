from functools import partial

from django.db import transaction
from django.db.models.signals import post_delete
from django.dispatch import receiver

from apps.profile.models import UserProfile


@receiver(post_delete, sender=UserProfile)
def delete_profile_image(instance, using, **_):
    image_name = instance.image.name
    if image_name:
        transaction.on_commit(
            partial(instance.image.storage.delete, image_name),
            using=using,
        )
