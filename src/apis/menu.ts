import express from "express"
import { prisma } from "../prisma"
import { listMenuTree } from "../service/menu"
import { authJwt } from "../middlewares/auth"
const router = express.Router()

type AUTH_MENU = "menu.add" | "menu.edit" | "menu.del" | "menu.list"

router.get("/menu/tree", authJwt(), async (req, res) => {
  const { hasBtn } = req.query
  const tree = await listMenuTree(Boolean(hasBtn == "true"))
  return res.success({ list: tree, total: tree.length })
})
router.get("/menu/list", authJwt<AUTH_MENU>("menu.list"), async (req, res) => {
  const list = await prisma.menu.findMany({ orderBy: { sort: "desc" } })
  res.success({ list, total: list.length })
})
router.post(
  "/menu/create",
  authJwt<AUTH_MENU>("menu.add"),
  async (req, res) => {
    const data = req.body
    data.meta = JSON.stringify(data.meta)
    const result = await prisma.menu.create({
      data: {
        ...data,
      },
    })
    res.success(result)
  },
)

router.delete(
  "/menu/delete",
  authJwt<AUTH_MENU>("menu.del"),
  async (req, res) => {
    const { id } = req.body
    const post = await prisma.menu.delete({
      where: {
        id: Number(id),
      },
    })
    res.success(post)
  },
)
router.put(
  "/menu/update",
  authJwt<AUTH_MENU>("menu.edit"),
  async (req, res) => {
    const { children, ...data } = req.body
    data.meta = JSON.stringify(data.meta)
    const post = await prisma.menu.update({
      data: { ...data },
      where: {
        id: Number(data.id),
      },
    })
    res.success(post)
  },
)
export default router
