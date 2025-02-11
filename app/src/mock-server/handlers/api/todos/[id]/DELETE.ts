import toInteger from "lodash/toInteger";
import { rest } from "msw";
import { mockDataStore } from "../../../../data-storage/mockDataStore";

let handler = rest.delete("/api/todos/:id", (req, res, ctx) => {
  const id = toInteger(req.params.id);

  if (id === 3) {
    return res(ctx.status(400));
  }

  const todo = mockDataStore.todos.getItem(id);

  if (!todo) {
    return res(ctx.status(404));
  }

  mockDataStore.todos.deleteItem(id);

  return res(ctx.status(204));
});

if (process.env.REACT_APP_NO_PERSIST) {
  handler = rest.delete("/api/todos/:id", (req, res, ctx) => {
    const id = toInteger(req.params.id);

    if (id === 3) {
      return res(ctx.status(400));
    }

    return res(ctx.status(204));
  });
}

export default handler;
