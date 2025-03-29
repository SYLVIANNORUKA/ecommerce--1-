"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Search, SlidersHorizontal, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { supabase } from "@/lib/supabase"

export function ProductsList() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortOption, setSortOption] = useState("featured")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        // Fetch products
        const { data: productsData, error: productsError } = await supabase.from("products").select("*")

        if (productsError) {
          console.error("Error fetching products:", productsError)
          // Use fallback data
          setProducts([
            {
              id: "1",
              name: "Wireless Headphones",
              category: "Electronics",
              price: 129.99,
              image: "/placeholder.svg?height=400&width=400",
              rating: 4,
              reviews: 42,
            },
            {
              id: "2",
              name: "Smart Watch",
              category: "Electronics",
              price: 199.99,
              image: "/placeholder.svg?height=400&width=400",
              rating: 5,
              reviews: 87,
            },
            {
              id: "3",
              name: "Leather Backpack",
              category: "Accessories",
              price: 79.99,
              image: "/placeholder.svg?height=400&width=400",
              rating: 4,
              reviews: 36,
            },
            {
              id: "4",
              name: "Running Shoes",
              category: "Footwear",
              price: 89.99,
              image: "/placeholder.svg?height=400&width=400",
              rating: 4,
              reviews: 128,
            },
            {
              id: "5",
              name: "Coffee Maker",
              category: "Home",
              price: 59.99,
              image: "/placeholder.svg?height=400&width=400",
              rating: 3,
              reviews: 24,
            },
            {
              id: "6",
              name: "Smartphone",
              category: "Electronics",
              price: 699.99,
              image: "/placeholder.svg?height=400&width=400",
              rating: 5,
              reviews: 214,
            },
            {
              id: "7",
              name: "Desk Lamp",
              category: "Home",
              price: 39.99,
              image: "/placeholder.svg?height=400&width=400",
              rating: 4,
              reviews: 56,
            },
            {
              id: "8",
              name: "Winter Jacket",
              category: "Clothing",
              price: 149.99,
              image: "/placeholder.svg?height=400&width=400",
              rating: 4,
              reviews: 78,
            },
            {
              id: "9",
              name: "Fitness Tracker",
              category: "Electronics",
              price: 49.99,
              image: "/placeholder.svg?height=400&width=400",
              rating: 3,
              reviews: 42,
            },
          ])
        } else {
          setProducts(productsData || [])
        }

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase.from("categories").select("name")

        if (categoriesError) {
          console.error("Error fetching categories:", categoriesError)
          // Use fallback categories
          setCategories(["Electronics", "Clothing", "Home", "Accessories", "Footwear"])
        } else {
          setCategories(categoriesData.map((cat) => cat.name) || [])
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        // Use fallback data in case of any other errors
        setProducts([
          {
            id: "1",
            name: "Wireless Headphones",
            category: "Electronics",
            price: 129.99,
            image: "/placeholder.svg?height=400&width=400",
            rating: 4,
            reviews: 42,
          },
          {
            id: "2",
            name: "Smart Watch",
            category: "Electronics",
            price: 199.99,
            image: "/placeholder.svg?height=400&width=400",
            rating: 5,
            reviews: 87,
          },
          {
            id: "3",
            name: "Leather Backpack",
            category: "Accessories",
            price: 79.99,
            image: "/placeholder.svg?height=400&width=400",
            rating: 4,
            reviews: 36,
          },
          {
            id: "4",
            name: "Running Shoes",
            category: "Footwear",
            price: 89.99,
            image: "/placeholder.svg?height=400&width=400",
            rating: 4,
            reviews: 128,
          },
        ])
        setCategories(["Electronics", "Clothing", "Home", "Accessories", "Footwear"])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter products based on search query, price range, and categories
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    return matchesSearch && matchesPrice && matchesCategory
  })

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low-high":
        return a.price - b.price
      case "price-high-low":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  if (loading) {
    return <div className="container py-8 text-center">Loading products...</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col space-y-4 md:space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
            <p className="text-muted-foreground">Browse our collection of high-quality products</p>
          </div>

          {/* Mobile filter button */}
          <div className="flex items-center justify-between md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Narrow down your product search</SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-medium">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`mobile-category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <label htmlFor={`mobile-category-${category}`} className="text-sm">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Price Range</h3>
                      <div className="text-sm">
                        ${priceRange[0]} - ${priceRange[1]}
                      </div>
                    </div>
                    <Slider
                      defaultValue={[0, 1000]}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  Sort by
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortOption("featured")}>Featured</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("price-low-high")}>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("price-high-low")}>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("rating")}>Highest Rated</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-6">
            {/* Desktop filters */}
            <div className="hidden md:block w-[250px] flex-shrink-0 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <label htmlFor={`category-${category}`}>{category}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Price Range</h3>
                  <div className="text-sm">
                    ${priceRange[0]} - ${priceRange[1]}
                  </div>
                </div>
                <Slider
                  defaultValue={[0, 1000]}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
              </div>
            </div>

            <div className="flex-1">
              {/* Search and sort (desktop) */}
              <div className="hidden md:flex items-center justify-between mb-6">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile search */}
              <div className="relative w-full mb-4 md:hidden">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Product grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                      <div className="relative aspect-square">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                          </div>
                          <div className="font-semibold">${product.price.toFixed(2)}</div>
                        </div>
                        <div className="flex items-center mt-2">
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-2">({product.reviews})</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Empty state */}
              {sortedProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-lg font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setPriceRange([0, 1000])
                      setSelectedCategories([])
                    }}
                  >
                    Reset filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

