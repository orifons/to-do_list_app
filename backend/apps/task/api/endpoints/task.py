from datetime import timedelta

from django.utils import timezone
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from to_do_settings.permissions import IsOwnerOrReadOnly

from apps.task.models import TaskItem
from apps.task.api.serializers import TaskItemSerializer


class TaskItemViewSet(viewsets.ModelViewSet):
    queryset = TaskItem.objects.all()
    serializer_class = TaskItemSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        """
        Filter exclusively for the items belonging to the currently authenticated user
        """

        return (
            super().get_queryset().filter(user=self.request.user).order_by("due_date")
        )

    def perform_create(self, serializer):
        # Automatically assign the currently authenticated user when creating the task
        serializer.save(user=self.request.user)

    @action(detail=False, methods=["get"], url_path="alerts")
    def expiring_alerts(self):
        """
        Custom endpoint: /api/tasks/alerts/
        Returns pending tasks that expire between the current moment and the next 3 days.
        """
        now = timezone.now()
        three_days_later = now + timedelta(days=3)

        alerts_qs = self.get_queryset().filter(
            completed=False, due_date__gte=now, due_date__lte=three_days_later
        )

        serializer = self.get_serializer(alerts_qs, many=True)
        return Response({"count": alerts_qs.count(), "alerts": serializer.data})
