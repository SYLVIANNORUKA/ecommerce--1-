import { Suspense } from "react"
import { ProductDetails } from "@/components/products/product-details"
import { ProductDetailsLoading } from "@/components/products/product-details-loading"

export const revalidate = 3600 // Revalidate at most every hour

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<ProductDetailsLoading />}>
      <ProductDetails id={params.id} />
    </Suspense>
  )
}

