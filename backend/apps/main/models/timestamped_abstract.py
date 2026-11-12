from django.db import models
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _


class TimeStampedModel(models.Model):
    """
    An abstract base class model that provides self-updating
    ``created`` and ``modified`` fields.
    """

    created_at = models.DateTimeField(verbose_name=_("create date"), auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name=_("update date"), auto_now=True)

    class Meta:
        abstract = True


@receiver(models.signals.pre_save)
def my_handler(sender, instance, **kwargs):
    if issubclass(sender, TimeStampedModel):
        print(f"El {sender._meta.model_name} se ha actualizado")
