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

export const filterItems = [
  { name: "Image Bank", value: "imageBank" },
  { name: "Product Sheets", value: "productSheet" },
  { name: "2D Files", value: "2d" },
  { name: "3D Files", value: "3d" },
  { name: "Care Sheets", value: "careSheet" },
  { name: "Catalogs", value: "catalog" },
  { name: "Price Lists", value: "priceList" },
]

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
        if (file.categoryName) return category === file.categoryName
      })
    }
    if (productType.length) {
      files = files.filter((file) => {
        if (file.productType) return productType === file.productType
      })
    }
    if (fileType.length && fileType !== "all") {
      files = files.filter((file) => {
        if (file.fileType) return fileType === file.fileType
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

  const isWeirdCategory = (str: string | null) => {
    return str === "careSheet" || str === "catalog" || str === "priceList"
  }

  const renderItems = () => {
    if (category && productType) {
      return renderAlternative(filteredFiles)
    }
    if (!isImageView || search || isWeirdCategory(fileType)) {
      return (
        <div className="grid grid-cols-12 gap-2 md:gap-5">
          {filteredFiles.map((file, index) => (
            <Link
              href={
                isWeirdCategory(file.productType)
                  ? `/files/${file.fileType}/${file.fileName}`
                  : `/files/${file.categoryName}/${file.productType}/${file.productName}/${file.fileName}`
              }
              target="_blank"
              rel="noreferrer"
              className="col-span-6 flex cursor-pointer flex-col items-center overflow-hidden rounded-lg p-2 hover:bg-secondary md:col-span-3 md:p-5"
              key={index}
            >
              <Icons.fileText className="h-32 w-32" />
              <p className="w-full break-words text-center text-lg">
                {file.fileName}
              </p>
              <p className="w-full break-words text-center text-sm">
                {file.productName}
              </p>
            </Link>
          ))}
        </div>
      )
    }
    if (!category) {
      return (
        <div className="grid grid-cols-12 gap-2 md:gap-5">
          {categoryList.map((file, index) => (
            <Link
              href={
                fileType
                  ? `/gallery/${fileType ?? "all"}/${file}`
                  : `/gallery/all/${file}`
              }
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
          ))}
        </div>
      )
    }
    return (
      <div className="grid grid-cols-12 gap-2 md:gap-5">
        {productTypeList.map((file, index) => (
          <Link
            href={
              fileType
                ? `/gallery/${fileType}/${category}/${file}`
                : `/gallery/all/${category}/${file}`
            }
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
        ))}
      </div>
    )
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
        <Accordion
          type="single"
          collapsible
          className="px-2"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Filters</AccordionTrigger>
            <AccordionContent className="flex flex-col">
              <p className="font-bold">File Types</p>
              <div className="flex flex-col gap-1">
                {filterItems.map(({ name, value }) =>
                  isWeirdCategory(value) ? (
                    <Link
                      href={`/gallery/${value}`}
                      rel="noreferrer"
                      className=""
                      key={name}
                    >
                      {name}
                    </Link>
                  ) : (
                    <Link
                      href={`/gallery/${value}` + (category ? `/${category}` : "") + (productType ? `/${productType}` : "")}
                      rel="noreferrer"
                      className=""
                      key={name}
                    >
                      {name}
                    </Link>
                  )
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      {renderItems()}
    </div>
  )
}

const renderAlternative = (filteredFiles: TFile[]) => {
  const productNames = new Set<string>()
  filteredFiles.forEach((file) => {
    if (file.productName) {
      productNames.add(file.productName)
    }
  })
  const productNameList = Array.from(productNames)
  return (
    <div className="flex flex-col flex-wrap gap-5">
      {productNameList.map((productName) => {
        return (
          <div className="">
            <div className="font-bold">{productName}</div>
            <div className="grid grid-cols-12 gap-2 md:gap-5">
              {filteredFiles
                .filter((file) => file.productName === productName)
                .map((file, index) => (
                  <Link
                    href={`/files/${file.categoryName}/${file.productType}/${file.productName}/${file.fileName}`}
                    target="_blank"
                    rel="noreferrer"
                    className="col-span-6 flex cursor-pointer flex-col items-center overflow-hidden rounded-lg p-2 hover:bg-secondary md:col-span-3 md:p-5"
                    key={index}
                  >
                    <Icons.fileText className="h-32 w-32" />
                    <p className="w-full break-words text-center text-lg">
                      {file.fileName}
                    </p>
                    <p className="w-full break-words text-center text-sm">
                      {file.productName}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
