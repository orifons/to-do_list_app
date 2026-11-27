import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, Trash2 } from "lucide-react";
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

type DeleteTaskDialogProps = {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
};

function DeleteTaskDialog({
  task,
  open,
  onOpenChange,
  onDeleted,
}: DeleteTaskDialogProps) {
  const queryClient = useQueryClient();
  const deleteTaskMutation = useMutation({
    mutationFn: () =>
      axiosInstance.delete(API_URLS.tasks.deleteTask(task.id)),
    onSuccess: async () => {
      queryClient.removeQueries({
        queryKey: ["tasks", task.id],
        exact: true,
      });
      queryClient.setQueryData<Task[]>(["tasks"], (currentTasks) =>
        currentTasks?.filter((currentTask) => currentTask.id !== task.id),
      );
      onOpenChange(false);
      onDeleted();
      toast.success("Task deleted successfully.");
      await queryClient.invalidateQueries({
        queryKey: ["tasks"],
        exact: true,
      });
    },
    onError: (error) => {
      const { message } = getApiError(error);
      toast.error(message || "Unable to delete the task. Please try again.");
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && deleteTaskMutation.isPending) return;
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md gap-0 rounded-3xl p-0">
        <DialogHeader className="border-b border-border/70 px-6 py-5 sm:px-7">
          <div className="mb-1 flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
            <Trash2 className="size-5" aria-hidden="true" />
          </div>
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Delete task?
          </DialogTitle>
          <DialogDescription>
            <span className="font-medium text-foreground">{task.title}</span>{" "}
            will be permanently deleted. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="px-6 py-4 sm:px-7">
          <Button
            type="button"
            variant="outline"
            disabled={deleteTaskMutation.isPending}
            autoFocus
            onClick={() => handleOpenChange(false)}
            className="rounded-xl"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={deleteTaskMutation.isPending}
            onClick={() => deleteTaskMutation.mutate()}
            className="rounded-xl"
          >
            {deleteTaskMutation.isPending ? (
              <LoaderCircle className="animate-spin" aria-hidden="true" />
            ) : (
              <Trash2 aria-hidden="true" />
            )}
            {deleteTaskMutation.isPending ? "Deleting..." : "Delete task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteTaskDialog;
