import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

export async function GET(request: Request) {
  const cookieStore = cookies()
  const headersList = headers()

  const referer = headersList.get("referer")
  const token = cookieStore.get("referer")?.value

  if (token?.includes("snoc.com.tr")) {
    redirect("/gallery")
  }

  if (referer?.includes("snoc.com.tr")) {
    cookieStore.set("referer", referer ?? "")
    redirect("/gallery")
  }

  return new Response(
    "Üzgünüz, ancak bu sayfaya erişiminiz yok. Kimliğinizi doğrulamak için lütfen bu sayfaya snoc.com.tr'deki bağlantınızdan ulaşın.",
    {
      status: 401,
    }
  )
}
