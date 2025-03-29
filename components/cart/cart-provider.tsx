"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { supabase } from "@/lib/supabase"

type CartItem = {
  id: string
  product_id: string
  quantity: number
  product: {
    id: string
    name: string
    price: number
    image: string
    category: string
  }
}

type CartContextType = {
  cartItems: CartItem[]
  isLoading: boolean
  addToCart: (productId: string, quantity: number) => Promise<void>
  updateQuantity: (id: string, quantity: number) => Promise<void>
  removeFromCart: (id: string) => Promise<void>
  clearCart: () => Promise<void>
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity
  }, 0)

  useEffect(() => {
    if (user) {
      fetchCartItems()
    } else {
      // If no user, try to get cart from local storage
      const localCart = localStorage.getItem("cart")
      if (localCart) {
        setCartItems(JSON.parse(localCart))
      }
      setIsLoading(false)
    }
  }, [user])

  const fetchCartItems = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      const { data, error } = await supabase.from("cart_items").select("*, product:products(*)").eq("user_id", user.id)

      if (error) {
        throw error
      }

      setCartItems(data || [])
    } catch (error) {
      console.error("Error fetching cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addToCart = async (productId: string, quantity: number) => {
    try {
      if (user) {
        // Check if item already exists in cart
        const existingItem = cartItems.find((item) => item.product_id === productId)

        if (existingItem) {
          // Update quantity if item exists
          await updateQuantity(existingItem.id, existingItem.quantity + quantity)
        } else {
          // Add new item
          const { data, error } = await supabase
            .from("cart_items")
            .insert({
              user_id: user.id,
              product_id: productId,
              quantity,
            })
            .select("*, product:products(*)")
            .single()

          if (error) throw error

          setCartItems([...cartItems, data])
        }
      } else {
        // Handle guest cart with local storage
        const existingItemIndex = cartItems.findIndex((item) => item.product_id === productId)

        if (existingItemIndex >= 0) {
          // Update quantity if item exists
          const updatedItems = [...cartItems]
          updatedItems[existingItemIndex].quantity += quantity
          setCartItems(updatedItems)
          localStorage.setItem("cart", JSON.stringify(updatedItems))
        } else {
          // Fetch product details
          const { data: product } = await supabase.from("products").select("*").eq("id", productId).single()

          // Add new item
          const newItem = {
            id: `local-${Date.now()}`,
            product_id: productId,
            quantity,
            product,
          }

          const newCart = [...cartItems, newItem]
          setCartItems(newCart)
          localStorage.setItem("cart", JSON.stringify(newCart))
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return

    try {
      if (user) {
        const { error } = await supabase.from("cart_items").update({ quantity }).eq("id", id)

        if (error) throw error
      }

      // Update local state regardless of auth status
      const updatedItems = cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))

      setCartItems(updatedItems)

      if (!user) {
        localStorage.setItem("cart", JSON.stringify(updatedItems))
      }
    } catch (error) {
      console.error("Error updating cart:", error)
    }
  }

  const removeFromCart = async (id: string) => {
    try {
      if (user) {
        const { error } = await supabase.from("cart_items").delete().eq("id", id)

        if (error) throw error
      }

      // Update local state regardless of auth status
      const updatedItems = cartItems.filter((item) => item.id !== id)
      setCartItems(updatedItems)

      if (!user) {
        localStorage.setItem("cart", JSON.stringify(updatedItems))
      }
    } catch (error) {
      console.error("Error removing from cart:", error)
    }
  }

  const clearCart = async () => {
    try {
      if (user) {
        const { error } = await supabase.from("cart_items").delete().eq("user_id", user.id)

        if (error) throw error
      }

      setCartItems([])

      if (!user) {
        localStorage.removeItem("cart")
      }
    } catch (error) {
      console.error("Error clearing cart:", error)
    }
  }

  const value = {
    cartItems,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

