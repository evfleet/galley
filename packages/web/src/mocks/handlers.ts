import { http, HttpResponse } from "msw";

export const handlers = [
  http.get<never, never, [], "/api/collections">("/api/collections", () => {
    return HttpResponse.json([], {
      status: 200,
    });
  }),
];
