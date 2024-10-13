import express from "express"
import { prisma } from "../prisma"
import { detail_user, list_user } from "../service/user"
import { authJwt } from "../middlewares/auth"
import { exportExcel } from "../utils/excel"
import { User } from "@prisma/client"
import { getPartialObject } from "../utils/data"
import { getI18n } from "../i18n"
import dayjs from "dayjs"

const router = express.Router()

type ListUserQuery = {
  pageSize?: string
  pageIndex?: string
  keyword?: string
  timeRange?: [string, string]
}

const getUser = (data: any) =>
  getPartialObject<User>(data)([
    "username",
    "password",
    "email",
    "phone",
    "name",
    "nickname",
    "roleId",
    "deptId",
    "status",
    "gender",
    "desc",
  ])

router.get("/user", authJwt("user.list"), async (req, res) => {
  const result = await list_user(req.query as ListUserQuery)
  res.success(result)
})
router.post("/user", authJwt("user.add"), async (req, res) => {
  const data = getUser(req.body)
  const result = await prisma.user.create({
    data,
  })
  res.success(result)
})
router.delete("/user/:id", authJwt("user.del"), async (req, res) => {
  const { id } = req.params as { id: string }
  const user = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  })
  res.success(user)
})

router.get("user/:id", authJwt("user.detail"), async (req, res) => {
  const { id } = req.params as { id: string }
  const user = await detail_user(Number(id))
  res.success(user)
})

router.put("/user/:id", authJwt("user.edit"), async (req, res) => {
  const { id } = req.params as { id: string }
  const data = getUser(req.body)
  const post = await prisma.user.update({
    data: {
      ...data,
    },
    where: {
      id: Number(id),
    },
  })
  res.success(post)
})

router.get("/user/export", authJwt("user.export"), async (req, res) => {
  const t = getI18n(req)
  const { pageIndex, pageSize, ...rest } = req.query as ListUserQuery
  const { list } = await list_user(rest)
  const outList = list.map((user) => ({
    ...user,
    status: user.status ? t("user.status.enabled") : t("user.status.disabled"),
    gender:
      user.gender === 1
        ? t("user.gender.man")
        : user.gender === 2
          ? t("user.gender.woman")
          : t("user.gender.unknown"),
    roleName: user.role?.name,
    deptName: user.dept?.name,
    createTime: dayjs(user.createTime).format("YYYY-MM-DD HH:mm:ss"),
    updateTime: dayjs(user.updateTime).format("YYYY-MM-DD HH:mm:ss"),
  }))
  const tableHeader = {
    id: "ID",
    username: t("user.col.username"),
    nickname: t("user.col.nickname"),
    name: t("user.col.name"),
    gender: t("user.col.gender"),
    phone: t("user.col.phone"),
    email: t("user.col.email"),
    status: t("user.col.status"),
    avatar: t("user.col.avatar"),
    roleName: t("user.col.roleName"),
    deptName: t("user.col.deptName"),
    createTime: t("user.col.createTime"),
    updateTime: t("user.col.updateTime"),
  }
  const file = exportExcel(outList, { tableHeader, fitWidth: true })
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  )
  res.setHeader("Content-Disposition", "attachment; filename=user.xlsx")
  res.send(file)
})
export default router
