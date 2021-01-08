import { Todo, TodoStatusFilter } from "../models/Todo";
import { useEffect, useState } from "react";
import { todoApi } from "../api/todo";

export const useTodos = (statusFilter: TodoStatusFilter) => {
  const [fetchedTodos, setFetchedTodos] = useState<Todo[]>([]);

  const addTodo = async (description: string) => {
    try {
      const newTodo = await todoApi.addTodo(description);
      setFetchedTodos((prevState) => {
        return [...prevState, newTodo];
      });
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await todoApi.deleteTodo(id);
      setFetchedTodos((prevState) => {
        return prevState.filter((todo) => todo.id !== id);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      await todoApi.toggleTodo(id);
      setFetchedTodos((prevState) => {
        return prevState.map((todo) => {
          if (todo.id !== id) {
            return todo;
          }

          return {
            ...todo,
            completed: !todo.completed,
          };
        });
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    todoApi.fetchTodos(statusFilter).then(setFetchedTodos);
  }, [statusFilter]);

  const todos = fetchedTodos
    .filter((todo) => {
      switch (statusFilter) {
        case TodoStatusFilter.All:
          return true;
        case TodoStatusFilter.Active:
          return !todo.completed;
        case TodoStatusFilter.Completed:
          return todo.completed;
      }
    })
    .sort((a, b) => {
      if (a.completed !== b.completed) {
        const weightA = a.completed ? 1 : 0;
        const weightB = b.completed ? 1 : 0;
        return weightA - weightB;
      }

      return b.updateAt.localeCompare(a.updateAt);
    });

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
  };
};
