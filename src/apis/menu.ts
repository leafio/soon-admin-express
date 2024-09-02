import express from "express"
import { prisma } from "../prisma"
import { getPermissionsCodes, getMenuTree, listMenuTree } from "../service/menu"
import { authJwt } from "../middlewares/auth"
const router = express.Router()

router.get("/menu/tree", authJwt(), async (req, res) => {
  const { hasBtn } = req.query
  const tree = await listMenuTree(Boolean(hasBtn == "true"))
  return res.success({ list: tree, total: tree.length })
})
router.get("/menu/list", authJwt("menu.list"), async (req, res) => {
  const list = await prisma.menu.findMany({ orderBy: { sort: "desc" } })
  res.success({ list, total: list.length })
})
router.post("/menu/create", authJwt("menu.add"), async (req, res) => {
  const data = req.body
  data.meta = JSON.stringify(data.meta)
  const result = await prisma.menu.create({
    data: {
      ...data,
    },
  })
  res.success(result)
})

router.delete("/menu/delete", authJwt("menu.del"), async (req, res) => {
  const { id } = req.body
  const post = await prisma.menu.delete({
    where: {
      id: Number(id),
    },
  })
  res.success(post)
})
router.put("/menu/update", authJwt("menu.edit"), async (req, res) => {
  const { children, ...data } = req.body
  data.meta = JSON.stringify(data.meta)
  const post = await prisma.menu.update({
    data: { ...data },
    where: {
      id: Number(data.id),
    },
  })
  res.success(post)
})
export default router
