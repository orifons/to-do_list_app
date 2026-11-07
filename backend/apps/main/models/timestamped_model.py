from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _


class TimeStampedModel(models.Model):
    """
    An abstract base class model that provides self-updating
    ``created`` and ``modified`` fields.
    """

    create_date = models.DateTimeField(verbose_name=_("create date"), auto_now_add=True)
    update_date = models.DateTimeField(verbose_name=_("update date"), auto_now=True)

    class Meta:
        abstract = True


@receiver(pre_save)
def my_handler(sender, instance, **kwargs):
    if issubclass(sender, TimeStampedModel):
        print("El objeto se ha actualizado: ", instance)
