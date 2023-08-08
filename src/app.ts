import { Hono, HTTPException } from "hono/mod.ts";
import { compress, cors } from "hono/middleware.ts";

const app = new Hono();

app.use("*", cors({ origin: "*" }));
app.use("*", compress());

app
  .get("/", (ctx) => {
    return ctx.json({ name: "fer" });
  })
  .notFound((ctx) => {
    return ctx.json({ message: "Not found" }, 404);
  })
  .onError((err, ctx) => {
    if (err instanceof HTTPException) {
      return err.getResponse();
    }

    let message = "Internal server error";

    if (err instanceof Error) {
      message = err.message;
    }

    return ctx.json({ message }, 500);
  });

export default app;
