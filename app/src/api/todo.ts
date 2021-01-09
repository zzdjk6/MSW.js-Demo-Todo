import { Todo, TodoStatusFilter } from "../models/Todo";
import get from "lodash/get";
import toInteger from "lodash/toInteger";
import toString from "lodash/toString";

export const todoApi = {
  fetchTodos: async (statusFilter: TodoStatusFilter) => {
    // TODO: API request
    const response = await fetch(`/api/todos?status=${statusFilter}`);
    const json = await response.json();
    const data = get(json, "data");

    if (!Array.isArray(data)) {
      throw new Error("Malformed response");
    }

    return data.map(parseTodo);
  },
  addTodo: async (description: string) => {
    // TODO: API request
    const response = await fetch(`/api/todos`, {
      method: "POST",
      body: JSON.stringify({
        description,
      }),
    });
    const json = await response.json();
    const data = get(json, "data");
    return parseTodo(data);
  },
  deleteTodo: async (id: number) => {
    // TODO: API request
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
  },
  markTodoCompleted: async (id: number) => {
    // TODO: API request
    const response = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: true,
      }),
    });
    const json = await response.json();
    const data = get(json, "data");
    return parseTodo(data);
  },
  markTodoInCompleted: async (id: number) => {
    // TODO: API request
    const response = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: false,
      }),
    });
    const json = await response.json();
    const data = get(json, "data");
    return parseTodo(data);
  },
};

const parseTodo = (item: any) => {
  const todo: Todo = {
    id: toInteger(get(item, "id")),
    description: toString(get(item, "description")),
    completed: Boolean(get(item, "completed")),
    createAt: toString(get(item, "createAt")),
    updateAt: toString(get(item, "updateAt")),
  };

  return todo;
};
