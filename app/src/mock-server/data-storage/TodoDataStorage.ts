import { DataStorage } from "./DataStorage";
import { Todo } from "../../models/Todo";
import max from "lodash/max";

export class TodoDataStorage extends DataStorage<number, Todo> {
  reset() {
    super.reset();

    // Reload fixtures
    this.store.set(1, require("../fixtures/todos/1.json"));
    this.store.set(2, require("../fixtures/todos/2.json"));
    this.store.set(3, require("../fixtures/todos/3.json"));
  }

  getNextId(): number {
    const maxId = max(Array.from(this.store.keys())) || 0;
    return maxId + 1;
  }
}
