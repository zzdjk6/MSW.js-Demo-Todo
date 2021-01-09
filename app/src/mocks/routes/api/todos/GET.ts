import { rest } from "msw";
import { dataStorage } from "../../../storage/dataStorage";

const handler = rest.get("/api/todos", (req, res, ctx) => {
  const statusFilter = req.url.searchParams.get("status") || "all";

  const todos = Object.values(dataStorage.todos);

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

export default handler;
