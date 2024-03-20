import { createServer } from "miragejs";

export function makeServer() {
  createServer({
    logging: true,

    routes() {
      this.namespace = "api";

      this.get("/test", () => {
        return { message: "Hello from Mirage!" };
      });
    },
  });
}
