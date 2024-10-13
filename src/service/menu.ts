import { prisma } from "../prisma"
const parseChildren = (data: { children?: any[]; meta: any }[]) => {
  data.forEach((item) => {
    item.meta = JSON.parse(item.meta)
    if (item.children?.length) {
      parseChildren(item.children)
    } else {
      item.children = undefined
    }
  })
}
export async function listMenuTree(hasBtn = false) {
  let hasBtnWhere = {
    menuType: {
      not: "btn",
    },
  } as any
  if (hasBtn) {
    hasBtnWhere = {}
  }
  const tree = await prisma.menu.findMany({
    where: {
      parentId: null,
      ...hasBtnWhere,
    },
    orderBy: [{ sort: "asc" }],
    include: {
      children: {
        orderBy: [{ sort: "asc" }],
        where: {
          ...hasBtnWhere,
        },
        include: {
          children: {
            orderBy: [{ sort: "asc" }],
            where: {
              ...hasBtnWhere,
            },
          },
        },
      },
    },
  })
  parseChildren(tree)
  return tree
}

export async function getMenuTree(roleId: string) {
  const tree = await prisma.menu.findMany({
    orderBy: [{ sort: "asc" }],
    where: {
      parentId: null,
      permissions: {
        some: {
          roleId,
        },
      },
      menuType: {
        not: "btn",
      },
    },
    include: {
      children: {
        orderBy: [{ sort: "asc" }],
        where: {
          permissions: {
            some: {
              roleId,
            },
          },
        },
      },
    },
  })
  parseChildren(tree)
  return tree
}

export async function getPermissionsCodes(roleId: string) {
  const list = await prisma.menu.findMany({
    select: {
      auth: true,
    },
    where: {
      menuType: "btn",
      auth: {
        not: null,
      },
      permissions: {
        some: {
          roleId,
        },
      },
    },
  })
  return list.map((m) => m.auth) as string[]
}
