export const handlers = [
  require("./api/todos/GET").default,
  require("./api/todos/POST").default,
  require("./api/todos/[id]/PATCH").default,
  require("./api/todos/[id]/DELETE").default,
];
