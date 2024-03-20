import { createServer } from "miragejs";

export function makeServer() {
  createServer({
    logging: true,

    routes() {
      this.namespace = "api";

      this.get("/collections", () => {
        return [];
      });
    },
  });
}
