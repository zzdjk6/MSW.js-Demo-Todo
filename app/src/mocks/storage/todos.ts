import { Todo } from "../../models/Todo";

export const todosStorage: Record<string, Todo> = {};

export const resetTodoStorage = () => {
  Object.keys(todosStorage).forEach((key) => {
    delete todosStorage[key];
  });

  todosStorage["1"] = require("../fixtures/todos/1.json");
  todosStorage["2"] = require("../fixtures/todos/2.json");
};
