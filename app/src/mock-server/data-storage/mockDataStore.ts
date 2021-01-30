import { TodoDataStorage } from "./TodoDataStorage";

export const mockDataStore = {
  todos: new TodoDataStorage(),
};

export const resetMockDataStore = () => {
  Object.values(mockDataStore).forEach((dataStorage) => dataStorage.reset());
};
