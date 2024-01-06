import { Request, Response } from "express";

import { auth } from "@/config/auth.js";

// https://lucia-auth.com/guidebook/sign-in-with-username-and-password/express/

async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const key = await auth.useKey("username", username.toLowerCase(), password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(req, res);
    authRequest.setSession(session);

    return res.status(200).send("Logged in");
  } catch (err) {
    return res.status(500).send("Unexpected error");
  }
}

async function logout(req: Request, res: Response) {
  try {
    const authRequest = auth.handleRequest(req, res);
    const session = await authRequest.validate();

    console.log("session", session);

    if (!session) {
      return res.sendStatus(401);
    }
    await auth.invalidateSession(session.sessionId);

    authRequest.setSession(null);

    return res.status(200).send("Logout");
  } catch (err) {
    return res.status(500).send("Unexpected error");
  }
}

async function register(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const user = await auth.createUser({
      key: {
        providerId: "username",
        providerUserId: username.toLowerCase(),
        password,
      },
      attributes: {
        username,
      },
    });

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    const authRequest = auth.handleRequest(req, res);

    authRequest.setSession(session);

    return res.status(200).send("Registered");
  } catch (err) {
    console.log("err", err);

    return res.status(500).send("Unexpected error");
  }
}

async function authenticate(req: Request, res: Response) {
  try {
    const authRequest = auth.handleRequest(req, res);
    const session = await authRequest.validate();

    console.log("session", session);

    if (session) {
      return res.status(200).send({ user: session.user });
    }

    return res.status(200).send({});
  } catch (err) {
    return res.status(500).send("Unexpected error");
  }
}

export default {
  login,
  logout,
  register,
  authenticate,
};
