from rest_framework import serializers

from apps.task.models import TaskItem


class TaskItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskItem
        fields = [
            "id",
            "title",
            "description",
            "task_type",
            "due_date",
            "completed",
            "location",
            "meeting_link",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate(self, attrs):
        print("Validating attrs:", attrs)
        data = attrs
        print("Validating data:", data)
        # Obtener el tipo de tarea (considerando creación o actualización parcial/total)
        task_type = data.get(
            "task_type", getattr(self.instance, "task_type", TaskItem.TaskType.TASK)
        )

        # Validar campos requeridos según el tipo de evento
        if (
            task_type == TaskItem.TaskType.APPOINTMENT
            and not data.get("location")
            and not getattr(self.instance, "location", None)
        ):
            raise serializers.ValidationError(
                {
                    "location": "Las citas o reuniones presenciales requieren una ubicación física."
                }
            )

        if (
            task_type == TaskItem.TaskType.CONFERENCE
            and not data.get("meeting_link")
            and not getattr(self.instance, "meeting_link", None)
        ):
            raise serializers.ValidationError(
                {
                    "meeting_link": "Las conferencias por videollamada requieren un enlace de reunión."
                }
            )

        return data
