from django.contrib import admin

from apps.main.admin import TimestampedModelAdmin
from apps.task.models import TaskItem


@admin.register(TaskItem)
class TaskItemAdmin(TimestampedModelAdmin):
    list_display = (
        "title",
        "user",
        "task_type",
        "due_date",
        "completed",
        "location",
        "meeting_link",
    )

    search_fields = (
        "title",
        "user__username",
    )

    ordering = (
        "due_date",
        "completed",
    )

    list_filter = (
        "task_type",
        "completed",
        "due_date",
        "location",
    )
