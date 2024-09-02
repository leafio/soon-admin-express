import express from "express"
import { prisma } from "../prisma"
import { parsePageParams, parseSkipTake } from "../utils/prisma"
import { authJwt } from "../middlewares/auth"
const router = express.Router()

router.get("/role/list", authJwt("role.list"), async (req, res) => {
  const { pageSize, pageIndex } = (req.query as any) ?? {}
  const where = {}
  const total = await prisma.role.count({ where })
  const page = parsePageParams(total, pageSize, pageIndex)
  const skipTake = parseSkipTake(page)
  const list = await prisma.role.findMany({
    ...skipTake,
    where,
    include: {
      permissions: {
        select: {
          menuId: true,
        },
      },
    },
  })
  const _list = list.map((item) => ({
    ...item,
    permissions: item.permissions.map((p) => p.menuId),
  }))
  res.success({ list: _list, total: list.length })
})

// router.get("/role/permissions", async (req, res) => {
//   const tree = await prisma.menu.findMany({
//     where: {
//       parentId: null,
//       permissions: {
//         some: {
//           roleId: 1,
//         },
//       },
//     },
//     include: {
//       children: {
//         where: {
//           permissions: {
//             some: {
//               roleId: 1,
//             },
//           },
//         },
//       },
//     },
//   })
//   res.success({ list: tree, total: tree.length })
// })
router.post("/role/create", authJwt("role.add"), async (req, res) => {
  const { permissions, ...role } = req.body
  const ids: number[] = permissions ?? []
  const result = await prisma.role.create({
    data: {
      ...role,
      permissions: {
        create: ids.map((p) => ({ menuId: p })),
      },
    },
  })
  res.success(result)
})

router.delete("/role/delete", authJwt("role.del"), async (req, res) => {
  const { id } = req.body
  const post = await prisma.role.delete({
    where: {
      id: id,
    },
  })
  res.success(post)
})
router.put("/role/update", authJwt("role.edit"), async (req, res) => {
  const { permissions, ...role } = req.body
  const ids: number[] = permissions ?? []
  const delPermissions = prisma.permission.deleteMany({
    where: {
      roleId: role.id,
    },
  })
  const updateRole = prisma.role.update({
    data: {
      ...role,
      permissions: {
        create: ids.map((p) => ({ menuId: p })),
      },
    },
    where: {
      id: role.id,
    },
  })
  const [, result] = await prisma.$transaction([delPermissions, updateRole])
  res.success(result)
})

export default router
