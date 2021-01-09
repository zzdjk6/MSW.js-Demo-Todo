import { resetTodoStorage, todosStorage } from "./todos";

export const dataStorage = {
  todos: todosStorage,
};

export const resetDataStorage = () => {
  resetTodoStorage();
};

// TODO: updateDataStorage => immutable
