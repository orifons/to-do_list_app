import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarClock, LoaderCircle, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API_URLS } from "@/configs/api-urls";
import axiosInstance from "@/configs/axios";
import type { Task } from "@/features/task/types";
import { getApiError } from "@/lib/api-error";

const taskTypes = [
  { value: "task", label: "Task", description: "Something you want to get done" },
  {
    value: "appointment",
    label: "In person",
    description: "An appointment or meeting",
  },
  {
    value: "conference",
    label: "Video call",
    description: "An online meeting",
  },
] as const;

const createTaskSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Enter a task title.")
      .max(255, "The title cannot exceed 255 characters."),
    description: z.string().trim(),
    task_type: z.enum(["task", "appointment", "conference"]),
    due_date: z
      .string()
      .min(1, "Select a date and time.")
      .refine((value) => !Number.isNaN(new Date(value).getTime()), {
        message: "Enter a valid date and time.",
      }),
    location: z.string().trim(),
    meeting_link: z.string().trim(),
  })
  .superRefine((values, context) => {
    if (values.task_type === "appointment" && !values.location) {
      context.addIssue({
        code: "custom",
        message: "Enter the appointment or meeting location.",
        path: ["location"],
      });
    }

    if (values.task_type === "conference") {
      if (!values.meeting_link) {
        context.addIssue({
          code: "custom",
          message: "Enter the video call link.",
          path: ["meeting_link"],
        });
      } else {
        try {
          const meetingUrl = new URL(values.meeting_link);
          if (!["http:", "https:"].includes(meetingUrl.protocol)) {
            throw new Error("Unsupported URL protocol");
          }
        } catch {
          context.addIssue({
            code: "custom",
            message: "Enter a valid link starting with http:// or https://.",
            path: ["meeting_link"],
          });
        }
      }
    }
  });

type CreateTaskFormValues = z.infer<typeof createTaskSchema>;
type CreateTaskPayload = Pick<
  Task,
  | "title"
  | "description"
  | "task_type"
  | "due_date"
  | "completed"
  | "location"
  | "meeting_link"
>;

type CreateTaskDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function CreateTaskDialog({ open, onOpenChange }: CreateTaskDialogProps) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      task_type: "task",
      due_date: "",
      location: "",
      meeting_link: "",
    },
  });

  const selectedTaskType = watch("task_type");
  const createTaskMutation = useMutation({
    mutationFn: (payload: CreateTaskPayload) =>
      axiosInstance.post<Task>(API_URLS.tasks.createTask, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task created successfully.");
      reset();
      onOpenChange(false);
    },
    onError: (error) => {
      const { fieldErrors, message } = getApiError(error);
      const formFieldNames = [
        "title",
        "description",
        "task_type",
        "due_date",
        "location",
        "meeting_link",
      ] as const;

      for (const field of formFieldNames) {
        const fieldMessage = fieldErrors[field];
        if (fieldMessage) {
          setError(field, { type: "server", message: fieldMessage });
        }
      }

      const errorMessage =
        [message, ...Object.values(fieldErrors)].filter(Boolean).join(" ") ||
        "Unable to create the task. Please try again.";
      setError("root.server", { type: "server", message: errorMessage });
      toast.error(errorMessage);
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && !createTaskMutation.isPending) {
      reset();
    }
    onOpenChange(nextOpen);
  };

  const onSubmit = (values: CreateTaskFormValues) => {
    const payload: CreateTaskPayload = {
      title: values.title,
      description: values.description || null,
      task_type: values.task_type,
      due_date: new Date(values.due_date).toISOString(),
      completed: false,
      location:
        values.task_type === "appointment" ? values.location : null,
      meeting_link:
        values.task_type === "conference" ? values.meeting_link : null,
    };

    createTaskMutation.mutate(payload);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[min(90vh,48rem)] max-w-xl gap-0 overflow-y-auto rounded-3xl p-0"
      >
        <DialogHeader className="border-b border-border/70 px-6 py-5 pr-16 sm:px-7">
          <div className="mb-1 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CalendarClock className="size-5" aria-hidden="true" />
          </div>
          <DialogTitle className="text-xl font-semibold tracking-tight">
            New task
          </DialogTitle>
          <DialogDescription>
            Add details to organize your next activity.
          </DialogDescription>
        </DialogHeader>

        <DialogClose
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Close form"
              disabled={createTaskMutation.isPending}
              className="absolute top-4 right-4 rounded-full"
            />
          }
        >
          <X aria-hidden="true" />
        </DialogClose>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup className="gap-4 px-6 py-5 sm:px-7">
            <Field>
              <FieldLabel htmlFor="task-title">
                Title <span aria-hidden="true" className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="task-title"
                placeholder="e.g. Prepare a presentation"
                maxLength={255}
                autoFocus
                required
                aria-invalid={Boolean(errors.title)}
                {...register("title")}
              />
              <FieldError errors={[errors.title]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="task-description">Description</FieldLabel>
              <Textarea
                id="task-description"
                placeholder="Add notes or details (optional)"
                rows={3}
                aria-invalid={Boolean(errors.description)}
                {...register("description")}
              />
              <FieldError errors={[errors.description]} />
            </Field>

            <fieldset className="flex flex-col gap-2">
              <legend className="mb-1 text-sm font-medium">
                Activity type
              </legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {taskTypes.map((type) => (
                  <label
                    key={type.value}
                    htmlFor={`task-type-${type.value}`}
                    className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-border/80 p-3 transition-colors hover:bg-muted/50 has-checked:border-primary has-checked:bg-primary/5 has-focus-visible:ring-2 has-focus-visible:ring-ring/40"
                  >
                    <input
                      id={`task-type-${type.value}`}
                      type="radio"
                      value={type.value}
                      className="mt-1 accent-primary"
                      {...register("task_type")}
                    />
                    <span className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium">{type.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {type.description}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
              <FieldError errors={[errors.task_type]} />
            </fieldset>

            <Field>
              <FieldLabel htmlFor="task-due-date">
                Date and time <span aria-hidden="true" className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="task-due-date"
                type="datetime-local"
                required
                aria-invalid={Boolean(errors.due_date)}
                {...register("due_date")}
              />
              <FieldDescription>
                The date and time are saved according to your time zone.
              </FieldDescription>
              <FieldError errors={[errors.due_date]} />
            </Field>

            {selectedTaskType === "appointment" && (
              <Field>
                <FieldLabel htmlFor="task-location">
                  Location{" "}
                  <span aria-hidden="true" className="text-destructive">
                    *
                  </span>
                </FieldLabel>
                <Input
                  id="task-location"
                  placeholder="Ej. Sala de reuniones"
                  maxLength={255}
                  required
                  aria-invalid={Boolean(errors.location)}
                  {...register("location")}
                />
                <FieldError errors={[errors.location]} />
              </Field>
            )}

            {selectedTaskType === "conference" && (
              <Field>
                <FieldLabel htmlFor="task-meeting-link">
                  Video call link{" "}
                  <span aria-hidden="true" className="text-destructive">
                    *
                  </span>
                </FieldLabel>
                <Input
                  id="task-meeting-link"
                  type="url"
                  placeholder="https://..."
                  required
                  aria-invalid={Boolean(errors.meeting_link)}
                  {...register("meeting_link")}
                />
                <FieldError errors={[errors.meeting_link]} />
              </Field>
            )}

            <FieldError errors={[errors.root?.server]} />
          </FieldGroup>

          <DialogFooter className="border-t border-border/70 px-6 py-4 sm:px-7">
            <Button
              type="button"
              variant="outline"
              disabled={createTaskMutation.isPending}
              className="rounded-xl"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createTaskMutation.isPending}
              className="rounded-xl"
            >
              {createTaskMutation.isPending ? (
                <LoaderCircle className="animate-spin" aria-hidden="true" />
              ) : (
                <Plus aria-hidden="true" />
              )}
              {createTaskMutation.isPending ? "Creating..." : "Create task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTaskDialog;
