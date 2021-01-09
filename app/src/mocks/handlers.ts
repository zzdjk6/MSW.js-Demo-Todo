export const handlers = [
  require("./routes/api/todos/GET").default,
  require("./routes/api/todos/POST").default,
  require("./routes/api/todos/[id]/PATCH").default,
  require("./routes/api/todos/[id]/DELETE").default,
];
