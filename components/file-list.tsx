"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { TFile } from "@/types/nav"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

type FileListProps = {
  allFiles: TFile[]
  initialSearch: string
  initialFileType: string
  initialCategory: string
  initialProductType: string
  isImageView: boolean
}

export function FileList({
  allFiles,
  initialSearch,
  initialFileType,
  initialCategory,
  initialProductType,
  isImageView,
}: FileListProps) {
  const [search, setSearch] = useState(initialSearch)
  const [category, setCategory] = useState<string>(initialCategory)
  const [productType, setProductType] = useState<string>(initialProductType)
  const [fileType, setFileType] = useState<string>(initialFileType)

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
    if (fileType.length) {
      files = files.filter((file) => {
        if (file.fileType) return fileType.includes(file.fileType)
      })
    }

    files = files.filter((file) => {
      return (
        file.fileName?.toLowerCase().includes(search.toLowerCase()) ||
        file.productName?.toLowerCase().includes(search.toLowerCase()) ||
        file.productId?.toLowerCase().includes(search.toLowerCase())
      )
    })
    return files
  }, [allFiles, search, category, productType, fileType])

  const categoryList = useMemo(() => {
    const categoryNames = new Set<string>()
    allFiles.forEach((file) => {
      if (file.categoryName) {
        categoryNames.add(file.categoryName)
      }
    })
    return Array.from(categoryNames)
  }, [allFiles])

  const productTypeList = useMemo(() => {
    const productTypes = new Set<string>()
    allFiles.forEach((file) => {
      if (file.productType && file.categoryName?.includes(category)) {
        productTypes.add(file.productType)
      }
    })
    return Array.from(productTypes)
  }, [allFiles, category])

  const fileTypeList = useMemo(() => {
    const fileTypes = new Set<string>()
    allFiles.forEach((file) => {
      if (file.fileType) {
        fileTypes.add(file.fileType)
      }
    })
    return Array.from(fileTypes)
  }, [allFiles])

  const renderItems = () => {
    if (!isImageView || search) {
      return filteredFiles.map((file, index) => (
        <Link
          href={`/files/${file.fileName}`}
          target="_blank"
          rel="noreferrer"
          className="col-span-6 flex cursor-pointer flex-col items-center overflow-hidden rounded-lg p-2 hover:bg-secondary md:col-span-3 md:p-5"
          key={index}
        >
          <Icons.fileVideo className="h-32 w-32" />
          <p className="w-full break-words text-center text-lg">
            {file.fileName}
          </p>
          <p className="w-full break-words text-center text-sm">
            {file.productName}
          </p>
        </Link>
      ))
    }
    if (!category) {
      return categoryList.map((file, index) => (
        <Link
          href={`/gallery/${file}`}
          rel="noreferrer"
          className="col-span-6 flex cursor-pointer flex-col items-center overflow-hidden rounded-lg p-2 hover:bg-secondary md:col-span-3 md:p-5"
          key={index}
        >
          <Image
            height="400"
            width="400"
            src={`https://productgallery.snoc.com.tr/files/${file}/collection.jpg`}
            alt="image"
          />
          <p className="w-full break-words text-center text-lg">{file}</p>
          <p className="w-full break-words text-center text-sm">{file}</p>
        </Link>
      ))
    }
    return productTypeList.map((file, index) => (
      <Link
        href={`/gallery/${category}/${file}`}
        rel="noreferrer"
        className="col-span-6 flex cursor-pointer flex-col items-center overflow-hidden rounded-lg p-2 hover:bg-secondary md:col-span-3 md:p-5"
        key={index}
      >
        <Image
          height="400"
          width="400"
          src={`https://productgallery.snoc.com.tr/files/${category}/${file}/producttype.jpg`}
          alt="image"
        />
        <p className="w-full break-words text-center text-lg">{file}</p>
        <p className="w-full break-words text-center text-sm">{file}</p>
      </Link>
    ))
  }

  return (
    <div className="flex flex-col gap-5 rounded-md border p-2 md:flex-row md:p-5">
      <div className="flex flex-col flex-wrap gap-2">
        <Input
          placeholder="Search..."
          className="h-8 w-full lg:w-[250px]"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Accordion type="single" collapsible className="px-2" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Filters</AccordionTrigger>
            <AccordionContent>
              <p className="font-bold">Product Type</p>
              {fileTypeList.map((item, index) => (
                <Link
                  href={`/gallery/${item}`}
                  rel="noreferrer"
                  className=""
                  key={index}
                >
                  {item}
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="grid grid-cols-12 gap-2 md:gap-5">{renderItems()}</div>
    </div>
  )
}
