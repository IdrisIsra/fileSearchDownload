import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

export async function GET(request: Request) {
  const cookieStore = cookies()
  const headersList = headers()

  const referer = headersList.get("referer")
  const token = cookieStore.get("referer")?.value

  if (token?.includes("vercel.com")) {
    redirect("/download")
  }

  if (referer?.includes("vercel.com")) {
    cookieStore.set("referer", referer ?? "")
    redirect("/download")
  }

  return new Response(
    "Üzgünüz, ancak bu sayfaya erişiminiz yok. Kimliğinizi doğrulamak için lütfen bu sayfaya snoc.com.tr'deki bağlantınızdan ulaşın.",
    {
      status: 401,
    }
  )
}
