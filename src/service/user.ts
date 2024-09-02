import { User } from "@prisma/client"
import { prisma } from "../prisma"
import {
  parseKeywordOptions,
  parsePageParams,
  parseSkipTake,
  parseTimeRange,
} from "../utils/prisma"

export async function detail_user(username: string): Promise<User>
export async function detail_user(id: number): Promise<User>
export async function detail_user(query: string | number) {
  const where = {} as { username: string; id: number }
  if (typeof query === "string") {
    where.username = query
  } else {
    where.id = query
  }
  const user = await prisma.user.findUnique({
    where,
  })
  return user
}

export async function list_user(query?: {
  pageSize?: string
  pageIndex?: string
  keyword?: string
  timeRange?: [string, string]
}) {
  const { keyword, timeRange, pageIndex, pageSize } = query ?? {}
  const createTimeOptions = parseTimeRange(timeRange)
  const keywordOptions = parseKeywordOptions<User>(keyword,['name','nickname','username','phone','email'])
  const where = {
    AND: {
      OR: keywordOptions,
      createTime: createTimeOptions,
    },
  }
  const total = await prisma.user.count({ where })
  const page = parsePageParams(total, pageSize, pageIndex)
  const skipTake = parseSkipTake(page)
  const list = await prisma.user.findMany({
    ...skipTake,
    omit:{
      password:true
    },
    include: {
      role: {
        select: {
          id: true,
          name: true,
        },
      },
      dept: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where,
  })

  return { list, total,...page }
}
