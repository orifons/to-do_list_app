import axiosInstance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/shared/navbar";
import {
  CalendarDays,
  Check,
  Clock3,
  LayoutGrid,
  List,
  Plus,
  Search,
} from "lucide-react";

import { TaskCard, TaskListItem } from "@/features/task/components";
import type {
  Task,
  TaskFilter,
  TaskResponse,
  ViewMode,
} from "@/features/task/types";
import { getApiError } from "@/lib/api-error";

const EMPTY_TASKS: Task[] = [];

function getTasks(response: TaskResponse) {
  return Array.isArray(response) ? response : response.results;
}

function TaskListPage() {
  const view = localStorage.getItem("tasks-mode-view") as ViewMode ?? "cards"

  const [viewMode, setViewMode] = useState<ViewMode>(view);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks-mode-view", viewMode)
  }, [viewMode])

  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<TaskResponse>("/tasks/");
      return getTasks(data);
    },
  });
  const taskError = tasksQuery.isError ? getApiError(tasksQuery.error) : null;

  const tasks = tasksQuery.data ?? EMPTY_TASKS;
  const filteredTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("es");
    return tasks.filter((task) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "completed" ? task.completed : !task.completed);
      const matchesSearch =
        !normalizedSearch ||
        `${task.title} ${task.description ?? ""}`
          .toLocaleLowerCase("es")
          .includes(normalizedSearch);
      return matchesFilter && matchesSearch;
    });
  }, [filter, search, tasks]);

  const pendingCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.length - pendingCount;
  const filters: { id: TaskFilter; label: string; count: number }[] = [
    { id: "all", label: "Todas", count: tasks.length },
    { id: "pending", label: "Pendientes", count: pendingCount },
    { id: "completed", label: "Completadas", count: completedCount },
  ];

  return (
    <main className="min-h-svh bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Navbar />

        <section aria-labelledby="tasks-heading">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                Organiza tu día
              </p>
              <h1 id="tasks-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Mis tareas<span className="text-primary">.</span>
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Todo lo que tienes por hacer, en un solo lugar.
              </p>
            </div>
            <Button
              nativeButton={false}
              render={<Link to="/tasks/new" />}
              className="w-full rounded-xl normal-case tracking-normal sm:w-auto"
            >
              <Plus aria-hidden="true" />
              Nueva tarea
            </Button>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Card className="rounded-2xl border-0 shadow-sm ring-1 ring-border/70">
              <CardContent className="flex items-center gap-3.5 p-4">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
                  <CalendarDays className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Total de tareas</p>
                  <p className="text-xl font-semibold">{tasks.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-0 shadow-sm ring-1 ring-border/70">
              <CardContent className="flex items-center gap-3.5 p-4">
                <span className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400">
                  <Clock3 className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Por completar</p>
                  <p className="text-xl font-semibold">{pendingCount}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-0 shadow-sm ring-1 ring-border/70">
              <CardContent className="flex items-center gap-3.5 p-4">
                <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Check className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Completadas</p>
                  <p className="text-xl font-semibold">{completedCount}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex gap-1 overflow-x-auto" aria-label="Filtrar tareas">
              {filters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={filter === item.id}
                  onClick={() => setFilter(item.id)}
                  className={
                    filter === item.id
                      ? "inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground"
                      : "inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  }
                >
                  {item.label}
                  <span className={filter === item.id ? "rounded-full bg-primary-foreground/15 px-1.5 py-0.5 text-[10px]" : "rounded-full bg-muted px-1.5 py-0.5 text-[10px]"}>
                    {item.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-xl border border-border/80 bg-background px-3 text-muted-foreground focus-within:ring-2 focus-within:ring-ring/30 sm:w-56 sm:flex-none">
                <Search className="size-4 shrink-0" aria-hidden="true" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar tareas..."
                  aria-label="Buscar tareas"
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </label>
              <div className="flex shrink-0 rounded-xl border border-border/80 bg-background p-1" aria-label="Modo de visualización">
                <Button
                  type="button"
                  size="icon-sm"
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  aria-label="Ver en lista"
                  aria-pressed={viewMode === "list"}
                  onClick={() => setViewMode("list")}
                  className="rounded-lg"
                >
                  <List aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  size="icon-sm"
                  variant={viewMode === "cards" ? "secondary" : "ghost"}
                  aria-label="Ver en tarjetas"
                  aria-pressed={viewMode === "cards"}
                  onClick={() => setViewMode("cards")}
                  className="rounded-lg"
                >
                  <LayoutGrid aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>

          {tasksQuery.isPending ? (
            <div className="rounded-2xl border border-dashed border-border bg-background px-6 py-16 text-center">
              <div className="mx-auto mb-4 size-7 animate-spin rounded-full border-2 border-primary/20 border-t-primary" role="status" aria-label="Cargando tareas" />
              <p className="text-sm text-muted-foreground">Cargando tus tareas...</p>
            </div>
          ) : tasksQuery.isError ? (
            <div className="rounded-2xl border border-destructive/20 bg-background px-6 py-12 text-center">
              <p className="font-medium">No pudimos cargar tus tareas</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {taskError?.message || "Comprueba tu conexión e inténtalo de nuevo."}
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => void tasksQuery.refetch()}
                className="mt-5 rounded-xl normal-case tracking-normal"
              >
                Reintentar
              </Button>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-background px-6 py-16 text-center">
              <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                <CalendarDays className="size-5" aria-hidden="true" />
              </span>
              <h2 className="font-semibold">
                {tasks.length === 0 ? "Aún no tienes tareas" : "No encontramos tareas"}
              </h2>
              <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
                {tasks.length === 0
                  ? "Crea tu primera tarea y empieza a organizar tu día."
                  : "Prueba con otra búsqueda o cambia el filtro seleccionado."}
              </p>
              {tasks.length === 0 && (
                <Button
                  nativeButton={false}
                  render={<Link to="/tasks/new" />}
                  className="mt-5 rounded-xl normal-case tracking-normal"
                >
                  <Plus aria-hidden="true" />
                  Crear primera tarea
                </Button>
              )}
            </div>
          ) : viewMode === "list" ? (
            <div className="overflow-hidden rounded-2xl border border-border/80 bg-background shadow-sm">
              {filteredTasks.map((task) => (
                <TaskListItem key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}

          {!tasksQuery.isPending && !tasksQuery.isError && filteredTasks.length > 0 && (
            <p className="mt-4 text-right text-xs text-muted-foreground">
              Mostrando {filteredTasks.length} de {tasks.length} tareas
            </p>
          )}
        </section>
      </div >
    </main >
  );
}

export default TaskListPage;