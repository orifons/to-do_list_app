export const API_URLS = {
  auth: {
    signIn: "accounts/token/",
    register: "accounts/user/create/",
    getCurrentUser: "accounts/me/",
  },
  tasks: {
    getTasks: "tasks/",
    createTask: "tasks/",
    updateTask: (taskId: number) => `tasks/${taskId}/`,
    deleteTask: (taskId: number) => `tasks/${taskId}/`,
  }
};