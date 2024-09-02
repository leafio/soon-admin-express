export function parseSkipTake(page?: { pageSize: number; pageIndex: number }) {
  if (page) {
    return {
      skip: page.pageSize * (page.pageIndex - 1),
      take: page.pageSize,
    }
  }
}
export function parseTimeRange(timeRange?: string | string[]) {
  const createTimeOptions = {} as {
    gte?: Date
    lte?: Date
  }
  if (Array.isArray(timeRange)) {
    const [startTime, endTime] = timeRange
    if (startTime) {
      createTimeOptions.gte = new Date(startTime)
    }
    if (endTime) {
      createTimeOptions.lte = new Date(endTime)
    }
  }
  return createTimeOptions
}

export function parseKeywordOptions<T>(keyword?: string, keys?: (keyof T)[]) {
  if (!keyword) return []
  return keys?.map((key) => ({
    [key]: {
      contains: keyword,
    },
  }))
}

function str2int(str?: string) {
  const num = parseInt(Number(str) + "")
  if (!Number.isNaN(num)) {
    return num
  }
}

export function parsePageParams(
  total: number,
  pageSize?: string,
  pageIndex?: string,
) {
  if (pageSize) {
    const _pageSize = str2int(pageSize) ?? 10
    const _pageIndex = str2int(pageIndex) ?? 1
    const page = {
      pageSize: _pageSize < 1 ? 10 : _pageSize,
      pageIndex: _pageIndex < 1 ? 1 : _pageIndex,
    }
    const maxPage = Math.ceil(total / page.pageSize)
    if (total > 0 && page.pageIndex > maxPage) page.pageIndex = maxPage
    return page
  }
}
