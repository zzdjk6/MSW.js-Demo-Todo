export abstract class DataStorage<KEY, DATA> {
  readonly store: Map<KEY, DATA>;

  constructor() {
    this.store = new Map<KEY, DATA>();
    this.reset();
  }

  getItem(id: KEY): DATA | null {
    return this.store.get(id) || null;
  }

  getAllItems(): DATA[] {
    return Array.from(this.store.values());
  }

  setItem(id: KEY, item: DATA): void {
    this.store.set(id, item);
  }

  deleteItem(id: KEY): void {
    this.store.delete(id);
  }

  reset(): void {
    this.store.clear();
  }

  abstract getNextId(): KEY;
}
