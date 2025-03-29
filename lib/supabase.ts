import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://oyzrmworsxvvhpicncct.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95enJtd29yc3h2dmhwaWNuY2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNTYxNDcsImV4cCI6MjA1ODgzMjE0N30.At1hS-WdUylgccSFWSKSRnvuGC2Q1sDKXom2ZSX9yLQ"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for common Supabase operations
export async function getProducts(limit?: number, category?: string) {
  try {
    let query = supabase.from("products").select("*")

    if (category) {
      query = query.eq("category", category)
    }

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching products:", error)
      // Return fallback data if the table doesn't exist
      return fallbackProducts
    }

    return data
  } catch (error) {
    console.error("Error fetching products:", error)
    return fallbackProducts
  }
}

export async function getProductById(id: string) {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }

  return data
}

export async function getCategories() {
  try {
    const { data, error } = await supabase.from("categories").select("*")

    if (error) {
      console.error("Error fetching categories:", error)
      // Return fallback data if the table doesn't exist
      return fallbackCategories
    }

    return data
  } catch (error) {
    console.error("Error fetching categories:", error)
    return fallbackCategories
  }
}

export async function getOrders(userId: string) {
  const { data, error } = await supabase.from("orders").select("*, order_items(*)").eq("user_id", userId)

  if (error) {
    console.error("Error fetching orders:", error)
    return []
  }

  return data
}

export async function createOrder(order: any) {
  const { data, error } = await supabase.from("orders").insert(order).select()

  if (error) {
    console.error("Error creating order:", error)
    return null
  }

  return data[0]
}

export async function getUserCart(userId: string) {
  const { data, error } = await supabase.from("cart_items").select("*, products(*)").eq("user_id", userId)

  if (error) {
    console.error("Error fetching cart:", error)
    return []
  }

  return data
}

export async function addToCart(cartItem: any) {
  const { data, error } = await supabase.from("cart_items").insert(cartItem)

  if (error) {
    console.error("Error adding to cart:", error)
    return null
  }

  return data
}

export async function updateCartItem(id: string, quantity: number) {
  const { data, error } = await supabase.from("cart_items").update({ quantity }).eq("id", id)

  if (error) {
    console.error("Error updating cart item:", error)
    return null
  }

  return data
}

export async function removeFromCart(id: string) {
  const { error } = await supabase.from("cart_items").delete().eq("id", id)

  if (error) {
    console.error("Error removing from cart:", error)
    return false
  }

  return true
}

// Add fallback data for when the database tables don't exist yet
const fallbackProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 129.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4,
    reviews: 42,
    description: "Premium wireless headphones with noise cancellation and long battery life.",
    stock: 38,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Smart Watch",
    category: "Electronics",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 5,
    reviews: 87,
    description: "Feature-packed smartwatch with health monitoring and smartphone notifications.",
    stock: 24,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Leather Backpack",
    category: "Accessories",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4,
    reviews: 36,
    description: "Stylish and durable leather backpack with multiple compartments.",
    stock: 52,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Running Shoes",
    category: "Footwear",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4,
    reviews: 128,
    description: "Comfortable running shoes with excellent support and cushioning.",
    stock: 18,
    created_at: new Date().toISOString(),
  },
]

const fallbackCategories = [
  {
    id: "electronics",
    name: "Electronics",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "clothing",
    name: "Clothing",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "home",
    name: "Home & Kitchen",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    image: "/placeholder.svg?height=300&width=300",
  },
]

