import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: NavItem[]
  firstSlug: string | null
  secondSlug: string | null
}

export function MainNav({ items, firstSlug, secondSlug }: MainNavProps) {
  return (
    <div className="flex flex-1 gap-6">
      <Link
        href="/gallery"
        className="flex items-center space-x-2"
        aria-label="logo link"
      >
        <Icons.logo className="h-6 w-6" />
      </Link>
      {items?.length ? (
        <nav className="flex gap-1 md:gap-2">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title} /
                </Link>
              )
          )}
          {firstSlug ? (
            <Link
              href={`/gallery/${firstSlug}`}
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground"
              )}
            >
              {firstSlug} /
            </Link>
          ) : null}
          {
            secondSlug ? (
              <Link
                href={`/gallery/${firstSlug}/${secondSlug}`}
                className={cn(
                  "flex items-center text-sm font-medium text-muted-foreground"
                )}
              >
                {secondSlug}
              </Link>
            ) : null
          }
        </nav>
      ) : null}
    </div>
  )
}
