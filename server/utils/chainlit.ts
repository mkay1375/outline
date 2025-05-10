import * as Cookies from "cookies";
import jwt from "jsonwebtoken";
import { getUserForJWT } from "@server/utils/jwt";

export default async function createChainlitCopilotJwt(
  cookies: Cookies,
  chainlitJwtSecret: string | undefined
) {
  const accessToken = cookies.get("accessToken");
  if (!accessToken || !chainlitJwtSecret) {
    return "";
  }
  try {
    const user = await getUserForJWT(accessToken);
    const toEncode = {
      identifier: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1, // 1 day
    };
    return jwt.sign(toEncode, chainlitJwtSecret, {
      algorithm: "HS256",
    });
  } catch (e) {
    return "";
  }
}
