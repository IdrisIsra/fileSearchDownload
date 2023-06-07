export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

export type TFile = {
    fileName: string | null;
    productName: string | null;
    productId: string | null;
    categoryName: string | null;
    productType: string | null;
}