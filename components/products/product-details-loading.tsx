export function ProductDetailsLoading() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      {/* Breadcrumbs skeleton */}
      <div className="flex items-center mb-6">
        <div className="h-4 w-10 bg-muted rounded animate-pulse"></div>
        <div className="h-4 w-4 mx-1 bg-muted rounded-full animate-pulse"></div>
        <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
        <div className="h-4 w-4 mx-1 bg-muted rounded-full animate-pulse"></div>
        <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images skeleton */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-lg animate-pulse"></div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Product Details skeleton */}
        <div className="space-y-6">
          <div>
            <div className="h-8 w-48 bg-muted rounded animate-pulse mb-2"></div>
            <div className="flex items-center mt-2">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-4 w-4 bg-muted rounded animate-pulse"></div>
                ))}
              </div>
              <div className="h-4 w-16 bg-muted rounded animate-pulse ml-2"></div>
            </div>
            <div className="h-8 w-24 bg-muted rounded animate-pulse mt-4"></div>
          </div>

          <div className="h-16 w-full bg-muted rounded animate-pulse"></div>

          {/* Color Selection skeleton */}
          <div>
            <div className="h-5 w-16 bg-muted rounded animate-pulse mb-3"></div>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-muted animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Size Selection skeleton */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="h-5 w-12 bg-muted rounded animate-pulse"></div>
              <div className="h-5 w-20 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-10 bg-muted rounded animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Quantity skeleton */}
          <div>
            <div className="h-5 w-20 bg-muted rounded animate-pulse mb-3"></div>
            <div className="h-8 w-32 bg-muted rounded animate-pulse"></div>
          </div>

          {/* Buttons skeleton */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <div className="h-10 w-full sm:w-40 bg-muted rounded animate-pulse"></div>
            <div className="h-10 w-10 bg-muted rounded animate-pulse"></div>
            <div className="h-10 w-10 bg-muted rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="mt-12">
        <div className="border-b">
          <div className="flex space-x-4 mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 w-24 bg-muted rounded animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="py-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 w-full bg-muted rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

