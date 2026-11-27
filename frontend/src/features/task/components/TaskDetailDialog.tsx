import { useQuery } from "@tanstack/react-query";
import { CalendarClock, Clock3, LoaderCircle, MapPin, Video, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { API_URLS } from "@/configs/api-urls";
import axiosInstance from "@/configs/axios";
import type { Task } from "@/features/task/types";
import { taskTypeLabels } from "@/features/task/types";
import { getApiError } from "@/lib/api-error";
import TaskStatus from "./TaskStatus";
import TaskTypeIcon from "./TaskTypeIcon";

type TaskDetailDialogProps = {
  taskId: number | null;
  onOpenChange: (open: boolean) => void;
};

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

function TaskDetailDialog({ taskId, onOpenChange }: TaskDetailDialogProps) {
  const open = taskId !== null;
  const taskQuery = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      if (taskId === null) {
        throw new Error("A task ID is required to load task details.");
      }

      const { data } = await axiosInstance.get<Task>(
        API_URLS.tasks.getTask(taskId),
      );
      return data;
    },
    enabled: open,
  });
  const taskError = taskQuery.isError ? getApiError(taskQuery.error) : null;
  const task = taskQuery.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(90vh,48rem)] max-w-xl gap-0 overflow-y-auto rounded-3xl p-0">
        <DialogHeader className="border-b border-border/70 px-6 py-5 pr-16 sm:px-7">
          <div className="mb-1 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {task ? (
              <TaskTypeIcon type={task.task_type} />
            ) : (
              <CalendarClock className="size-5" aria-hidden="true" />
            )}
          </div>
          <DialogTitle className="text-xl font-semibold tracking-tight">
            {task?.title ?? "Task details"}
          </DialogTitle>
          <DialogDescription>
            {task ? taskTypeLabels[task.task_type] : "Details for the selected task"}
          </DialogDescription>
        </DialogHeader>

        <DialogClose
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Close task details"
              className="absolute top-4 right-4 rounded-full"
            />
          }
        >
          <X aria-hidden="true" />
        </DialogClose>

        {taskQuery.isPending ? (
          <div className="flex items-center justify-center gap-2 px-6 py-12 text-sm text-muted-foreground" role="status">
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            Loading task details...
          </div>
        ) : taskQuery.isError ? (
          <div className="px-6 py-10 text-center sm:px-7" role="alert">
            <p className="font-medium">We couldn't load this task</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {taskError?.message || "Check your connection and try again."}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => void taskQuery.refetch()}
              className="mt-5 rounded-xl"
            >
              Try again
            </Button>
          </div>
        ) : task ? (
          <div className="space-y-6 px-6 py-6 sm:px-7">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                {taskTypeLabels[task.task_type]}
              </span>
              <TaskStatus completed={task.completed} />
            </div>

            <section aria-labelledby="task-description-heading">
              <h3 id="task-description-heading" className="mb-2 text-sm font-medium">
                Description
              </h3>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                {task.description || "No description provided."}
              </p>
            </section>

            <dl className="space-y-4 border-t border-border/70 pt-5">
              <div>
                <dt className="mb-1 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Clock3 className="size-4" aria-hidden="true" />
                  Due date
                </dt>
                <dd className="text-sm">{formatDateTime(task.due_date)}</dd>
              </div>
              {task.location && (
                <div>
                  <dt className="mb-1 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <MapPin className="size-4" aria-hidden="true" />
                    Location
                  </dt>
                  <dd className="text-sm">{task.location}</dd>
                </div>
              )}
              {task.meeting_link && (
                <div>
                  <dt className="mb-1 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <Video className="size-4" aria-hidden="true" />
                    Video call
                  </dt>
                  <dd>
                    <a
                      href={task.meeting_link}
                      target="_blank"
                      rel="noreferrer"
                      className="break-all text-sm text-primary hover:underline"
                    >
                      {task.meeting_link}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-xs font-medium text-muted-foreground">
                  Created
                </dt>
                <dd className="mt-1 text-sm">{formatDateTime(task.created_at)}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted-foreground">
                  Last updated
                </dt>
                <dd className="mt-1 text-sm">{formatDateTime(task.updated_at)}</dd>
              </div>
            </dl>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

export default TaskDetailDialog;
