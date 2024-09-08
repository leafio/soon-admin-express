import { grig } from "grig"
import en from "./en"
import zh from "./zh"

const i18n = {
  zh,
  en,
}
export default i18n

export function getGrig(req: { headers: any }) {
  const lang = (req.headers["soon-lang"] as "en") ?? "en"
  return grig(i18n[lang])
}
