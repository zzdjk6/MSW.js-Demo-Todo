export enum TodoStatusFilter {
  All = "all",
  Active = "active",
  Completed = "completed",
}

export type Todo = {
  id: number;
  description: string;
  completed: boolean;
  createAt: string;
  updateAt: string;
};
