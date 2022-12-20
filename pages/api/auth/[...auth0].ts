import { handleAuth, handleCallback, handleLogin } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";


export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          scope: "openid profile email ",
          prompt: "login",
        },
      });
    } catch (error: any) {
      res.status(error.status || 500).end();
    }
  },
  async callback(req: NextApiRequest, res: NextApiResponse) {
    if (req.query.error == "unauthorized") {
      res.setHeader("Location", "/verify-email");
      res.status(302).end();
    }
    try {
      await handleCallback(req, res, {});
    } catch (error: any) {
      res.status(error.status || 500).end();
    }
  },
});
