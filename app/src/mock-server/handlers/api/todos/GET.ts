import { rest } from "msw";
import { mockDataStore } from "../../../data-storage/mockDataStore";

let handler = rest.get("/api/todos", (req, res, ctx) => {
  const statusFilter = req.url.searchParams.get("status") || "all";

  const todos = mockDataStore.todos.getAllItems();

  const data = todos.filter((todo) => {
    switch (statusFilter) {
      case "active":
        return !todo.completed;
      case "completed":
        return todo.completed;
      default:
        return true;
    }
  });

  const json = {
    data,
  };

  return res(ctx.status(200), ctx.json(json));
});

if (process.env.REACT_APP_NO_PERSIST) {
  handler = rest.get("/api/todos", (req, res, ctx) => {
    const statusFilter = req.url.searchParams.get("status") || "all";

    const todos = [require("../../../fixtures/todos/1.json"), require("../../../fixtures/todos/2.json"), require("../../../fixtures/todos/3.json")];

    const data = todos.filter((todo) => {
      switch (statusFilter) {
        case "active":
          return !todo.completed;
        case "completed":
          return todo.completed;
        default:
          return true;
      }
    });

    const json = {
      data,
    };

    return res(ctx.status(200), ctx.json(json));
  });
}

export default handler;
