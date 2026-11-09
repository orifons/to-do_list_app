from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.main.models import TimeStampedModel


class TaskItem(TimeStampedModel):
    class TaskType(models.TextChoices):
        TASK = "task", _("Simple task")
        APPOINTMENT = "appointment", _("In-person appointment or meeting")
        CONFERENCE = "conference", _("Video call")

    user = models.ForeignKey("auth.User", verbose_name=_("User"), on_delete=models.CASCADE, related_name="tasks")
    title = models.CharField(max_length=255, verbose_name=_("Title"))
    description = models.TextField(blank=True, null=True, verbose_name=_("Description"))

    # Clasificación
    task_type = models.CharField(
        max_length=20, choices=TaskType.choices, default=TaskType.TASK, verbose_name=_("Task type")
    )

    # Control de expiración / fecha límite
    due_date = models.DateTimeField(
        help_text=_("Expiration or event date and time"),
        verbose_name=_("Due date")
    )
    completed = models.BooleanField(default=False, verbose_name=_("Completed"))

    # Campos específicos para eventos / reuniones (opcionales)
    location = models.CharField(
        max_length=255, blank=True, null=True, help_text=_("For in-person meetings"),
        verbose_name=_("Location")
    )
    meeting_link = models.URLField(
        blank=True, null=True, help_text=_("For video calls"),
        verbose_name=_("Meeting link")
    )

    def __str__(self: "TaskItem") -> str:
        """Returns a readable representation of the task."""
        # return f"[{self.get_task_type_display()}] {self.title}"
        return f"[{self.task_type}] {self.title}"
