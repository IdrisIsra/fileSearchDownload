import { pgTable, text } from "drizzle-orm/pg-core"

export const files = pgTable("snoc_files", {
  fileName: text("file_name"),
  productName: text("product_name"),
  productId: text("product_id"),
  categoryName: text("category_name"),
  productType: text("product_type"),
  fileType: text("filetype"),
})
