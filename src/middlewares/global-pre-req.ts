//全局响应中间件
export default async function (req: any, res: any, next: any) {
  // console.log("***** default request middleware******")

  //覆盖原始的send方法
  res.success = (data: any) => {
    res.json({
      code: 0,
      data,
    })
  }
  res.err = (err: any, code?: number) => {
    res.json({
      code: code ?? -1,
      err,
    })
  }
  next()
}
