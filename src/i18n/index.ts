import { yi } from "soon-i18n"
import en from "./en"
import zh from "./zh"

const i18n = {
  zh,
  en,
}
export default i18n

export function getI18n(req: { headers: any }) {
  const lang = (req.headers["soon-lang"] as "en") ?? "en"
  return yi(i18n[lang])
}
