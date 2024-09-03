import jwt from "jsonwebtoken"
import { getPermissionsCodes } from "../service/menu"
import { detail_user } from "../service/user"
const JWT_SECRET = `SSSS`

export function genJwtToken(username: string) {
  return jwt.sign({ username }, JWT_SECRET)
}
export const authJwt = (code?: string) => (req: any, res: any, next: any) => {
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, JWT_SECRET, async (err: any, user: any) => {
      if (err) {
        console.error(err)
        return res.sendStatus(401)
      }
      const { username } = user
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
