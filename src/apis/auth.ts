import express from "express"
import { prisma } from "../prisma"
import svgCaptcha from "svg-captcha"
import { authJwt, genJwtToken } from "../middlewares/auth"
import { getPermissionsCodes, getMenuTree } from "../service/menu"
import { detail_user } from "../service/user"
import { getI18n } from "../i18n"

const router = express.Router()

router.get("/captcha", async (req, res) => {
  const captcha = svgCaptcha.create({
    // ignoreChars:'abcdefghijklmnopqrstuvwxyz',
    charPreset: "0123456789",
    size: 4,
    noise: 3,
    color: true,
    background: "#f5f5f5",
  })
  const record = await prisma.captcha.create({
    data: {
      code: captcha.text,
      expiredTime: new Date(new Date().getTime() + 15 * 60 * 1000),
    },
  })

  res.success({ id: record.id, img: captcha.data })
})

router.post("/login", async (req, res) => {
  const t = getI18n(req)
  const { username, password, code, codeId } = req.body
  //验证码
  const captcha = await prisma.captcha.findUnique({ where: { id: codeId } })
  let is_captcha_valid = false
  if (captcha) {
    if (captcha.expiredTime < new Date()) {
      res.err(t("code-expired"))
      return
    } else if (captcha.code == code) {
      is_captcha_valid = true
    }
  }

  if (!is_captcha_valid) {
    res.err(t("code-err"))
    return
  }

  const cur_user = await prisma.user.findUnique({
    select: { username: true, password: true, roleId: true },
    where: { username },
  })
  if (cur_user && cur_user?.password === password) {
    // const { roleId } = cur_user
    const token = genJwtToken(cur_user.username)
    // let menus: Menu[] = []
    // let btnList: string[] = []
    // if (roleId) {
    //   menus = await getMenuTree(roleId)
    //   btnList = await getPermissionsCodes(roleId)
    // }
    res.success({
      token,
      //  menus, btnList,
      //  userInfo: cur_user
    })
  } else {
    res.err(t("account-pwd-err"))
  }
})

router.post("/logout", authJwt(), async (req, res) => {
  res.success()
})

router.get("/auth/profile", authJwt(), async (req, res) => {
  const { username } = req
  const user = await detail_user(username)
  res.success(user)
})
router.get("/auth/route", authJwt(), async (req, res) => {
  const username = req.username
  const user = await prisma.user.findUnique({
    select: { roleId: true },
    where: {
      username,
    },
  })
  let tree: any[] = []
  if (user?.roleId) tree = await getMenuTree(user.roleId)
  return res.success(tree)
})
router.get("/auth/code", authJwt(), async (req, res) => {
  const username = req.username
  const user = await prisma.user.findUnique({
    select: { roleId: true },
    where: {
      username,
    },
  })
  let codes: any[] = []
  if (user?.roleId) codes = await getPermissionsCodes(user.roleId)
  return res.success(codes)
})

export default router
