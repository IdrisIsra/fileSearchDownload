"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

import { TFile } from "@/types/nav"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

import { FacetedFilter } from "./faceted-filter"
import { Button } from "./ui/button"

interface FileListProps {
  allFiles: TFile[]
}

export function FileList({ allFiles }: FileListProps) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string[]>([])
  const [productType, setProductType] = useState<string[]>([])

  const filteredFiles = useMemo(() => {
    let files = allFiles
    if (category.length) {
      files = files.filter((file) => {
        if (file.categoryName) return category.includes(file.categoryName)
      })
    }
    if (productType.length) {
      files = files.filter((file) => {
        if (file.productType) return productType.includes(file.productType)
      })
    }
    files = files.filter((file) => {
      return (
        file.fileName?.toLowerCase().includes(search.toLowerCase()) ||
        file.productName?.toLowerCase().includes(search.toLowerCase())
      )
    })
    return files
  }, [allFiles, search, category, productType])

  const categoryList = useMemo(() => {
    const categoryNames = new Map<string, number>()
    allFiles.forEach((file) => {
      if (file.categoryName) {
        const count = categoryNames.get(file.categoryName) || 0
        categoryNames.set(file.categoryName, count + 1)
      }
    })
    return Array.from(categoryNames.entries()).map(([label, count]) => ({
      label,
      value: count.toString(),
    }))
  }, [allFiles])

  const productTypeList = useMemo(() => {
    const productTypes = new Map<string, number>()
    allFiles.forEach((file) => {
      if (file.productType) {
        const count = productTypes.get(file.productType) || 0
        productTypes.set(file.productType, count + 1)
      }
    })
    return Array.from(productTypes.entries()).map(([label, count]) => ({
      label,
      value: count.toString(),
    }))
  }, [allFiles])

  const isFiltered = category.length || productType.length

  return (
    <div className="space-y-5 rounded-md border p-5">
      <div className="flex flex-wrap gap-2">
        <Input
          placeholder="Search..."
          className="h-8 w-[150px] lg:w-[250px]"
          onChange={(event) => setSearch(event.target.value)}
        />
        <FacetedFilter
          selectedValues={category}
          setSelectedValues={(values) => setCategory(values)}
          title="Category"
          options={categoryList}
        />
        <FacetedFilter
          selectedValues={productType}
          setSelectedValues={(values) => setProductType(values)}
          title="Product Type"
          options={productTypeList}
        />
        {isFiltered ? (
          <Button
            variant="ghost"
            onClick={() => {
              setCategory([])
              setProductType([])
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        ) : null
        }
      </div>
      <div className="grid grid-cols-12 gap-5">
        {filteredFiles.map((file) => (
          <Link
            href={`/files/${file.fileName}`}
            target="_blank"
            rel="noreferrer"
            className="col-span-6 flex cursor-pointer flex-col items-center overflow-hidden rounded-lg  p-5 hover:bg-secondary md:col-span-3"
            key={file.fileName}
          >
            <Icons.fileVideo className="h-32 w-32" />
            <p className=" text-lg">{file.fileName}</p>
            <p className=" text-sm">{file.productName}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
