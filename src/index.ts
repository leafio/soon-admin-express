import express from "express"
import helmet from "helmet"
import "express-async-errors"

import routerUser from "./apis/user"
import routerDept from "./apis/dept"
import routerAuth from "./apis/auth"
import routerRole from "./apis/role"
import routerMenu from "./apis/menu"
import routerFile from "./apis/file"

import global_pre_req from "./middlewares/global-pre-req"
import globalError from "./middlewares/gloal-error"
import { existsSync, mkdir, mkdirSync } from "fs"
import path from "path"

const { PORT, CROS } = process.env

const app = express()
app.use(helmet())
if (CROS === "true") {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*") // 允许任何源的跨域请求
    res.header("Access-Control-Allow-Methods", "*") // 允许的HTTP方法
    res.header("Access-Control-Allow-Headers", "*") // 允许的HTTP请求头

    if (req.method === "OPTIONS") {
      res.send(200) // 对于预检请求直接返回
    } else {
      next()
    }
  })
}

app.use(express.json())
app.use(global_pre_req)

const public_files_path = "public/files"
if (!existsSync(path.resolve("public/files"))) {
  mkdirSync(public_files_path, { recursive: true })
}
app.use(express.static("public"))

app.use("/api", routerAuth)
app.use("/api", routerUser)
app.use("/api", routerDept)
app.use("/api", routerRole)
app.use("/api", routerMenu)
app.use("/api", routerFile)

app.get("/api", (req, res) => {
  res.send("Express + TypeScript Server")
})

app.use(globalError)

const server = app.listen(PORT, () =>
  console.log(`
🚀 Server ready at: http://localhost:${PORT}`),
)
