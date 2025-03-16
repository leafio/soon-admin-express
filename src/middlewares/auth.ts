import jwt from "jsonwebtoken"
import { getPermissionsCodes } from "../service/menu"
import { detail_user } from "../service/user"
import { getI18n } from "../i18n"
const JWT_SECRET_ACCESS = `soon_access`
const JWT_SECRET_REFRESH = `soon_refresh`

export function genJwtToken_Access(username: string) {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 4
  return jwt.sign({ username, exp }, JWT_SECRET_ACCESS)
}
export function genJwtToken_Refresh(username: string) {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 14
  return jwt.sign({ username, exp }, JWT_SECRET_REFRESH)
}

export function verifyRefreshToken(token: string) {
  let username
  try {
    const decoded = jwt.verify(token, JWT_SECRET_REFRESH)
    username = (decoded as jwt.JwtPayload).username
  } catch (err) {
    console.log(err)
  }
  return username
}

export const authJwt =
  <T>(code?: T, passExpired: boolean = false) =>
  (req: any, res: any, next: any) => {
    const token = req.headers.authorization

    if (token) {
      jwt.verify(token, JWT_SECRET_ACCESS, async (err: any, decoded: any) => {
        let username
        if (err) {
          if (passExpired && err.name === "TokenExpiredError") {
            const decoded_expired = jwt.decode(token)
            if (typeof decoded_expired !== "string")
              username = decoded_expired?.username
          }
        } else {
          if (typeof decoded !== "string") username = decoded.username
        }
        if (!username) {
          if (passExpired) {
            const t = getI18n(req)
            res.err(t("invalid-token"))
          } else {
            res.sendStatus(401)
          }
        }

        if (code) {
          const { roleId } = await detail_user(username)
          if (roleId) {
            const btnList = await getPermissionsCodes(roleId)
            if (!btnList.find((b) => b == code)) {
              return res.sendStatus(403)
            }
          } else {
            return res.sendStatus(403)
          }
        }

        req.username = username
        next()
      })
    } else {
      res.sendStatus(401)
    }
  }
