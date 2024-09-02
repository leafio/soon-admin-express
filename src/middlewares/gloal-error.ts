//全局响应中间件
export default async function (err: any, req: any, res: any, next: any) {
  console.error(err.stack)
  // res.err(err.stack);
  res.status(500).send(err.stack)
}
