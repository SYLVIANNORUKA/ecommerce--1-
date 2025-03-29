"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Heart, Minus, Plus, Share2, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import { useCart } from "@/components/cart/cart-provider"

export function ProductDetails({ id }: { id: string }) {
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [productReviews, setProductReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("black")
  const [selectedSize, setSelectedSize] = useState("m")

  const { toast } = useToast()
  const { addToCart } = useCart()

  // Update the useEffect to handle the case where tables don't exist
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        // Fetch product
        const { data: productData, error: productError } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single()

        if (productError) {
          console.error("Error fetching product:", productError)
          // Use fallback product data
          const fallbackProduct = {
            id: id,
            name: "Wireless Headphones",
            category: "Electronics",
            price: 129.99,
            image: "/placeholder.svg?height=400&width=400",
            rating: 4,
            reviews: 42,
            description: "Premium wireless headphones with noise cancellation and long battery life.",
            stock: 38,
          }
          setProduct(fallbackProduct)

          // Set fallback related products
          setRelatedProducts([
            {
              id: "2",
              name: "Smart Watch",
              category: "Electronics",
              price: 199.99,
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              id: "6",
              name: "Smartphone",
              category: "Electronics",
              price: 699.99,
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              id: "9",
              name: "Fitness Tracker",
              category: "Electronics",
              price: 49.99,
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              id: "7",
              name: "Desk Lamp",
              category: "Home",
              price: 39.99,
              image: "/placeholder.svg?height=400&width=400",
            },
          ])

          // Set fallback reviews
          setProductReviews([
            {
              id: "1",
              rating: 5,
              comment: "Excellent product! The quality exceeded my expectations. Would definitely recommend.",
              created_at: "2023-03-15T00:00:00.000Z",
              user: {
                first_name: "John",
                last_name: "D.",
              },
            },
            {
              id: "2",
              rating: 4,
              comment: "Great product for the price. Shipping was fast and the item was as described.",
              created_at: "2023-02-28T00:00:00.000Z",
              user: {
                first_name: "Sarah",
                last_name: "M.",
              },
            },
          ])
        } else {
          setProduct(productData)

          // Fetch related products
          const { data: relatedData, error: relatedError } = await supabase
            .from("products")
            .select("*")
            .eq("category", productData.category)
            .neq("id", id)
            .limit(4)

          if (relatedError) {
            console.error("Error fetching related products:", relatedError)
            // Use fallback related products
            setRelatedProducts([
              {
                id: "2",
                name: "Smart Watch",
                category: "Electronics",
                price: 199.99,
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                id: "6",
                name: "Smartphone",
                category: "Electronics",
                price: 699.99,
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                id: "9",
                name: "Fitness Tracker",
                category: "Electronics",
                price: 49.99,
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                id: "7",
                name: "Desk Lamp",
                category: "Home",
                price: 39.99,
                image: "/placeholder.svg?height=400&width=400",
              },
            ])
          } else {
            setRelatedProducts(relatedData || [])
          }

          // Fetch reviews
          const { data: reviewsData, error: reviewsError } = await supabase
            .from("reviews")
            .select("*, user:users(first_name, last_name)")
            .eq("product_id", id)

          if (reviewsError) {
            console.error("Error fetching reviews:", reviewsError)
            // Use fallback reviews
            setProductReviews([
              {
                id: "1",
                rating: 5,
                comment: "Excellent product! The quality exceeded my expectations. Would definitely recommend.",
                created_at: "2023-03-15T00:00:00.000Z",
                user: {
                  first_name: "John",
                  last_name: "D.",
                },
              },
              {
                id: "2",
                rating: 4,
                comment: "Great product for the price. Shipping was fast and the item was as described.",
                created_at: "2023-02-28T00:00:00.000Z",
                user: {
                  first_name: "Sarah",
                  last_name: "M.",
                },
              },
            ])
          } else {
            setProductReviews(reviewsData || [])
          }
        }
      } catch (error) {
        console.error("Error fetching product data:", error)
        // Use fallback data in case of any other errors
        setProduct({
          id: id,
          name: "Wireless Headphones",
          category: "Electronics",
          price: 129.99,
          image: "/placeholder.svg?height=400&width=400",
          rating: 4,
          reviews: 42,
          description: "Premium wireless headphones with noise cancellation and long battery life.",
          stock: 38,
        })
        setRelatedProducts([
          {
            id: "2",
            name: "Smart Watch",
            category: "Electronics",
            price: 199.99,
            image: "/placeholder.svg?height=400&width=400",
          },
          {
            id: "6",
            name: "Smartphone",
            category: "Electronics",
            price: 699.99,
            image: "/placeholder.svg?height=400&width=400",
          },
        ])
        setProductReviews([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity)

      toast({
        title: "Added to cart",
        description: `${quantity} × ${product.name} added to your cart`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not add item to cart. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="container py-8 text-center">Loading product details...</div>
  }

  if (!product) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link href="/products">
          <Button>Browse all products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <Link href="/products" className="text-muted-foreground hover:text-foreground">
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <span>{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-md border">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">({product.reviews} reviews)</span>
            </div>
            <p className="text-2xl font-bold mt-4">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          {/* Color Selection */}
          <div>
            <h3 className="font-medium mb-3">Color</h3>
            <div className="flex space-x-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color.value ? "border-primary" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(color.value)}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Size</h3>
              <Button variant="link" className="p-0 h-auto text-sm">
                Size Guide
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size.value}
                  className={`px-3 py-1 rounded-md border ${
                    selectedSize === size.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-input hover:bg-muted"
                  }`}
                  onClick={() => setSelectedSize(size.value)}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-medium mb-3">Quantity</h3>
            <div className="flex items-center w-32">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-none" onClick={decrementQuantity}>
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <div className="flex-1 h-8 px-3 flex items-center justify-center border-y">{quantity}</div>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-none" onClick={incrementQuantity}>
                <Plus className="h-3 w-3" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
          </div>

          {/* Add to Cart and Wishlist */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button className="flex-1 gap-2" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share product</span>
            </Button>
          </div>

          {/* Shipping and Returns */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-start gap-2">
              <div className="font-medium">Free Shipping</div>
              <div className="text-sm text-muted-foreground">Free standard shipping on orders over $50</div>
            </div>
            <div className="flex items-start gap-2">
              <div className="font-medium">Returns</div>
              <div className="text-sm text-muted-foreground">
                30-day return policy. See our return policy for more details.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-6">
            <div className="space-y-4">
              <p>{product.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Premium quality materials</li>
                <li>Designed for comfort and durability</li>
                <li>Perfect for everyday use</li>
                <li>Modern and stylish design</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Material</span>
                  <span>{product.specifications?.material || "Premium"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Dimensions</span>
                  <span>{product.specifications?.dimensions || "10 x 5 x 2 inches"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Weight</span>
                  <span>{product.specifications?.weight || "0.5 kg"}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Manufacturer</span>
                  <span>{product.specifications?.manufacturer || "Acme Inc."}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Country of Origin</span>
                  <span>{product.specifications?.origin || "United States"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Warranty</span>
                  <span>{product.specifications?.warranty || "1 year"}</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
            <div className="space-y-6">
              {productReviews.length > 0 ? (
                productReviews.map((review, index) => (
                  <div key={index} className="border-b pb-6 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">
                        {review.user ? `${review.user.first_name} ${review.user.last_name}` : "Anonymous"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No reviews yet. Be the first to review this product!</p>
                  <Button>Write a Review</Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
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
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

const colors = [
  { name: "Black", value: "black", hex: "#000000" },
  { name: "White", value: "white", hex: "#FFFFFF" },
  { name: "Gray", value: "gray", hex: "#808080" },
  { name: "Blue", value: "blue", hex: "#0000FF" },
  { name: "Red", value: "red", hex: "#FF0000" },
]

const sizes = [
  { label: "XS", value: "xs" },
  { label: "S", value: "s" },
  { label: "M", value: "m" },
  { label: "L", value: "l" },
  { label: "XL", value: "xl" },
]

