import { Todo, TodoStatusFilter } from "../models/Todo";

const sampleTodos: Todo[] = [
  {
    id: 1,
    description: "Active",
    completed: false,
    createAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
  },
  {
    id: 2,
    description: "Completed",
    completed: true,
    createAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
  },
];

export const todoApi = {
  fetchTodos: async (statusFilter: TodoStatusFilter) => {
    // TODO: API request
    return sampleTodos;
  },
  addTodo: async (description: string) => {
    // TODO: API request
    const newTodo: Todo = {
      id: Math.random(),
      completed: false,
      description,
      createAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    };
    return newTodo;
  },
  deleteTodo: async (id: number) => {
    // TODO: API request
  },
  toggleTodo: async (id: number) => {
    // TODO: API request
  },
};
