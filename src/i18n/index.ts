import { grig } from "grig"
import en from "./en"
import zhCn from "./zh-cn"

const i18n = {
  "zh-cn": zhCn,
  en: en,
}
export default i18n

export function getGrig(req: { headers: any }) {
  const lang = (req.headers["soon-lang"] as "en") ?? "en"
  return grig(i18n[lang])
}
