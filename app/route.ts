import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

export async function GET(request: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get("referer")

  const headersList = headers()
  const referer = headersList.get("referer")

  cookieStore.set("referer", referer ?? "")

  redirect("/download")
}
