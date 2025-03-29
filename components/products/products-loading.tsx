export function ProductsLoading() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-4 md:space-y-8">
        <div>
          <div className="h-8 w-48 bg-muted rounded animate-pulse mb-2"></div>
          <div className="h-4 w-64 bg-muted rounded animate-pulse"></div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6">
          {/* Desktop filters skeleton */}
          <div className="hidden md:block w-[250px] flex-shrink-0 space-y-6">
            <div>
              <div className="h-5 w-24 bg-muted rounded animate-pulse mb-3"></div>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="h-5 w-24 bg-muted rounded animate-pulse mb-3"></div>
              <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
            </div>
          </div>

          <div className="flex-1">
            {/* Search and sort skeleton */}
            <div className="hidden md:flex items-center justify-between mb-6">
              <div className="h-10 w-64 bg-muted rounded animate-pulse"></div>
              <div className="h-10 w-36 bg-muted rounded animate-pulse"></div>
            </div>

            {/* Mobile search skeleton */}
            <div className="w-full mb-4 md:hidden">
              <div className="h-10 w-full bg-muted rounded animate-pulse"></div>
            </div>

            {/* Product grid skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-lg border overflow-hidden">
                  <div className="aspect-square bg-muted animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="h-5 w-24 bg-muted rounded animate-pulse"></div>
                        <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                      </div>
                      <div className="h-5 w-12 bg-muted rounded animate-pulse"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((j) => (
                          <div key={j} className="h-4 w-4 bg-muted rounded animate-pulse"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

