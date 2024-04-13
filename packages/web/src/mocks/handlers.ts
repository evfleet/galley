import { http, HttpResponse } from "msw";

export const handlers = [
  http.get<never, never, [], "/api/collections">("/api/collections", () => {
    return HttpResponse.json([], {
      status: 200,
    });
  }),

  http.get("/api/v1/auth/", () => {
    return HttpResponse.json({
      user: {
        id: "1",
        email: "",
      },
    });
  }),
];
