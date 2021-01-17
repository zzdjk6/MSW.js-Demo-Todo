import { TodoDataStorage } from "./TodoDataStorage";

export const inMemoryData = {
  todos: new TodoDataStorage(),
};

export const resetInMemoryData = () => {
  Object.values(inMemoryData).forEach((dataStorage) => dataStorage.reset());
};
