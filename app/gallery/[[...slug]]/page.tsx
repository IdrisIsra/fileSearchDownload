import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { db } from "@/db"

import { FileList, filterItems } from "@/components/file-list"

export const dynamic = "auto"

const fileTypes = ["imageBank", "productSheet", "2d", "3d", "careSheet", "catalog", "priceList"]

export default async function IndexPage({
  params,
}: {
  params: { slug: string }
}) {
  const allFiles = await db.query.files.findMany()

  const referer = cookies().get("referer")?.value

  const categoryNames = new Set<string>()
  const productTypes = new Set<string>()

  allFiles.forEach((file) => {
    if (file.categoryName) {
      categoryNames.add(file.categoryName)
    }
    if (file.productType) {
      productTypes.add(file.productType)
    }
  })

  const firstSlug = params.slug?.[0]
  const secondSlug = params.slug?.[1]
  const thirdSlug = params.slug?.[2]

  const decodedSecondSlug = decodeURIComponent(secondSlug)
  const decodedThirdSlug = decodeURIComponent(thirdSlug)

  const initialSearch = firstSlug === "search" ? secondSlug : ""
  const initialFileType = fileTypes.includes(firstSlug) || firstSlug === 'all' ? firstSlug : ""
  const initialCategory = categoryNames.has(decodedSecondSlug) ? decodedSecondSlug : ""
  const initialProductType = productTypes.has(decodedThirdSlug)
    ? decodedThirdSlug
    : ""

  // if (!referer?.includes("snoc.com.tr")) {
  //   redirect("/")
  // }

  const isImageView = () => {
    if (!firstSlug) {
      return true
    }
    if (!secondSlug) {
      return true
    }
    if (!!initialCategory && !initialProductType) {
      return true
    }
    return false
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-6">
      <FileList
        allFiles={allFiles}
        initialSearch={initialSearch}
        initialFileType={initialFileType}
        initialCategory={initialCategory}
        initialProductType={initialProductType}
        isImageView={isImageView()}
      />
    </section>
  )
}
