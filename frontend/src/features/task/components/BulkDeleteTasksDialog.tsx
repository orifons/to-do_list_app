import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { API_URLS } from "@/configs/api-urls";
import axiosInstance from "@/configs/axios";
import type { Task } from "@/features/task/types";
import { getApiError } from "@/lib/api-error";

type BulkDeleteTasksDialogProps = {
  tasks: Task[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: (taskIds: number[]) => void;
  onRemoveTask: (taskId: number) => void;
};

function BulkDeleteTasksDialog({
  tasks,
  open,
  onOpenChange,
  onDeleted,
  onRemoveTask,
}: BulkDeleteTasksDialogProps) {
  const queryClient = useQueryClient();
  const [partialFailureMessage, setPartialFailureMessage] = useState("");

  const deleteTasksMutation = useMutation({
    mutationFn: async (taskIds: number[]) =>
      Promise.allSettled(
        taskIds.map((taskId) =>
          axiosInstance.delete(API_URLS.tasks.deleteTask(taskId)),
        ),
      ),
    onSuccess: async (results, taskIds) => {
      const deletedIds = results.flatMap((result, index) =>
        result.status === "fulfilled" ? [taskIds[index]] : [],
      );
      const failedResults = results.filter(
        (result) => result.status === "rejected",
      );

      deletedIds.forEach((taskId) => {
        queryClient.removeQueries({
          queryKey: ["tasks", taskId],
          exact: true,
        });
      });
      queryClient.setQueryData<Task[]>(["tasks"], (currentTasks) =>
        currentTasks?.filter((task) => !deletedIds.includes(task.id)),
      );

      if (deletedIds.length > 0) onDeleted(deletedIds);
      if (failedResults.length > 0) {
        const firstError = getApiError(failedResults[0].reason);
        const message = `${deletedIds.length} deleted; ${failedResults.length} could not be deleted. ${
          firstError.message || "Try again."
        }`;
        setPartialFailureMessage(message);
        toast.error(message);
      } else {
        setPartialFailureMessage("");
        onOpenChange(false);
        toast.success(
          deletedIds.length === 1
            ? "Task deleted successfully."
            : `${deletedIds.length} tasks deleted successfully.`,
        );
      }

      await queryClient.invalidateQueries({
        queryKey: ["tasks"],
        exact: true,
      });
    },
    onError: (error) => {
      const { message } = getApiError(error);
      const errorMessage = message || "Unable to delete the selected tasks.";
      setPartialFailureMessage(errorMessage);
      toast.error(errorMessage);
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && deleteTasksMutation.isPending) return;
    if (nextOpen) setPartialFailureMessage("");
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[min(90vh,42rem)] max-w-lg gap-0 overflow-y-auto rounded-3xl p-0">
        <DialogHeader className="border-b border-border/70 px-6 py-5 sm:px-7">
          <div className="mb-1 flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
            <Trash2 className="size-5" aria-hidden="true" />
          </div>
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Delete selected tasks?
          </DialogTitle>
          <DialogDescription>
            {tasks.length} {tasks.length === 1 ? "task is" : "tasks are"} selected.
            Remove any tasks you want to keep, then confirm deletion. This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <ul className="max-h-64 space-y-2 overflow-y-auto px-6 py-5 sm:px-7">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-border/70 px-3 py-2"
            >
              <span className="min-w-0 flex-1 truncate text-sm font-medium">
                {task.title}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Keep ${task.title}; remove from deletion`}
                title="Remove from deletion"
                disabled={deleteTasksMutation.isPending}
                onClick={() => onRemoveTask(task.id)}
                className="shrink-0 rounded-lg text-muted-foreground"
              >
                <X aria-hidden="true" />
              </Button>
            </li>
          ))}
        </ul>

        {partialFailureMessage && (
          <p className="px-6 pb-3 text-sm text-destructive" role="alert">
            {partialFailureMessage}
          </p>
        )}

        <DialogFooter className="border-t border-border/70 px-6 py-4 sm:px-7">
          <Button
            type="button"
            variant="outline"
            disabled={deleteTasksMutation.isPending}
            autoFocus
            onClick={() => handleOpenChange(false)}
            className="rounded-xl"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={deleteTasksMutation.isPending || tasks.length === 0}
            onClick={() =>
              deleteTasksMutation.mutate(tasks.map((task) => task.id))
            }
            className="rounded-xl"
          >
            {deleteTasksMutation.isPending ? (
              <LoaderCircle className="animate-spin" aria-hidden="true" />
            ) : (
              <Trash2 aria-hidden="true" />
            )}
            {deleteTasksMutation.isPending
              ? "Deleting..."
              : `Delete ${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BulkDeleteTasksDialog;
