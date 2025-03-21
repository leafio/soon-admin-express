import express from "express"
import { prisma } from "../prisma"
import { authJwt } from "../middlewares/auth"
const router = express.Router()

type AUTH_DEPT = "dept.add" | "dept.edit" | "dept.del" | "dept.list"

router.get("/dept/tree", async (req, res) => {
  const tree = await prisma.dept.findMany({
    where: { parentId: null },
    include: { children: true },
  })
  return res.success({ list: tree, total: tree.length })
})
router.get("/dept/list", authJwt<AUTH_DEPT>("dept.list"), async (req, res) => {
  const list = await prisma.dept.findMany({ orderBy: { sort: "desc" } })
  res.success({ list, total: list.length })
})
router.post(
  "/dept/create",
  authJwt<AUTH_DEPT>("dept.add"),
  async (req, res) => {
    const result = await prisma.dept.create({
      data: {
        ...req.body,
      },
    })
    res.success(result)
  },
)

router.delete(
  "/dept/delete",
  authJwt<AUTH_DEPT>("dept.del"),
  async (req, res) => {
    const { id } = req.body
    const post = await prisma.dept.delete({
      where: {
        id: Number(id),
      },
    })
    res.success(post)
  },
)
router.put(
  "/dept/update",
  authJwt<AUTH_DEPT>("dept.edit"),
  async (req, res) => {
    const { children, ...data } = req.body
    const post = await prisma.dept.update({
      data,
      where: {
        id: Number(data.id),
      },
    })
    res.success(post)
  },
)
export default router
