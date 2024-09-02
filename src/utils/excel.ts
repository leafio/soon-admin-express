import { writeFileXLSX, utils, writeXLSX } from "xlsx"
export function exportExcel<T extends object>(
  tableData: T[],
  options?: {
    fileName?: string
    tableHeader?: Partial<{ [P in keyof T]: string }>
    colsWidth?: Partial<{ [P in keyof T]: number }>
    fitWidth?: boolean
  },
) {
  //处理数据
  const headerKeys = Object.keys(options?.tableHeader || tableData[0] || [])
  //1.根据表头筛选
  let data = [...tableData].map((item) => {
    const result = {} as Record<string, any>
    headerKeys.forEach((key) => {
      let value = item[key as keyof T] as any
      //数组转为,间隔字符串
      if (value) {
        if (Array.isArray(value)) {
          value = value.join(",")
        } else if (typeof value === "object") {
          value = JSON.stringify(value)
        }
      }
      result[key] = value
    })
    return result
  })

  //2.插入表头
  if (options?.tableHeader) {
    data = [options.tableHeader, ...data]
  }
  // console.log('导出Excel', tableData)
  //3.创建工作簿
  const workbook = utils.book_new()
  //将数据添加到工作表   //skipHeader不把key值当做表头
  const worksheet = utils.json_to_sheet(data, {
    skipHeader: !!options?.tableHeader,
  })
  //4.列宽
  let _widths = {} as Partial<{ [P in keyof T]: number }>
  if (options?.colsWidth) {
    _widths = options.colsWidth
  } else if (options?.fitWidth) {
    _widths = autoCalcCellWidths(data)
  }
  worksheet["!cols"] = headerKeys.map((key) => {
    return {
      wch: _widths[key as keyof T] || 20,
    }
  })

  //5.保存 工作簿、工作表、工作表名
  utils.book_append_sheet(workbook, worksheet, "sheet1")
  if (options?.fileName) {
    return writeFileXLSX(workbook, options?.fileName + ".xlsx", {
      compression: true,
    })
  } else {
    return writeXLSX(workbook, { type: "buffer" })
  }
  // writeFileXLSX(workbook, (options?.fileName ?? (new Date()).toLocaleString()) + ".xlsx", { compression: true })
}
function autoCalcCellWidths<T extends object>(data: T[]) {
  if (data.length === 0) return {}
  const colWidths = {} as { [P in keyof T]: number }
  //初始化列宽
  Object.keys(data[0]).forEach((key) => {
    colWidths[key as keyof T] = 4
  })
  // 计算每一列的所有单元格宽度
  // 先遍历行
  data.forEach((row) => {
    // 遍历列
    for (const key in row) {
      switch (typeof row[key]) {
        case "string":
        case "number":
        case "boolean":
          const cellWidth = getCellWidth(row[key])
          // 每一列取最大值最为列宽
          if (colWidths[key] < cellWidth) colWidths[key] = cellWidth
          break
      }
    }
  })
  return colWidths
}

// 经过评论反馈优化
function getCellWidth(value: unknown) {
  // 判断是否为null或undefined
  if (value === null || value === undefined) {
    return 0
  } else {
    return value.toString().replace(/[\u0391-\uFFE5]/g, "aa").length * 1.01
  }
}
