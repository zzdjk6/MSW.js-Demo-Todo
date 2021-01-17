import toInteger from "lodash/toInteger";
import { rest } from "msw";
import { inMemoryData } from "../../../../data-storage/inMemoryData";

const handler = rest.delete("/api/todos/:id", (req, res, ctx) => {
  const id = toInteger(req.params.id);
  const todo = inMemoryData.todos.getItem(id);

  if (!todo) {
    return res(ctx.status(404));
  }

  inMemoryData.todos.deleteItem(id);

  return res(ctx.status(204));
});

export default handler;
