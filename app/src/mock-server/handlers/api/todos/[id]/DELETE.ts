import toInteger from "lodash/toInteger";
import { rest } from "msw";
import { mockDataStore } from "../../../../data-storage/mockDataStore";

const handler = rest.delete("/api/todos/:id", (req, res, ctx) => {
  const id = toInteger(req.params.id);
  const todo = mockDataStore.todos.getItem(id);

  if (!todo) {
    return res(ctx.status(404));
  }

  mockDataStore.todos.deleteItem(id);

  return res(ctx.status(204));
});

export default handler;
