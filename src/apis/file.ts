import express from "express"
import { existsSync, unlinkSync, writeFileSync } from "fs"
import multer from "multer"
import path from "path"
import { authJwt } from "../middlewares/auth"
import { getI18n } from "../i18n"

const router = express.Router()

const upload = multer()

router.post(
  "/file",
  authJwt(),
  upload.single("file") as any,
  async (req, res) => {
    const t = getI18n(req)
    const file = req.file
    if (file) {
      const filename =
        new Date().toISOString().replaceAll(":", "_").replaceAll(".", "_") +
        "+" +
        file.originalname
      writeFileSync(path.resolve("public/files", filename), file.buffer)
      const url = `/files/${filename}`
      res.success({ url })
    }
    res.err(t("upload-failed"))
  },
)
router.delete("/file/:name", authJwt(), async (req, res) => {
  const t = getI18n(req)
  const { name } = req.params
  const filepath = path.resolve("public/files", name)
  if (existsSync(filepath)) {
    unlinkSync(filepath)
    res.success()
  } else {
    res.err(t("file-not-exists"))
  }
})

export default router
