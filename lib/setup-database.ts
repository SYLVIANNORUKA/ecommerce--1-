import { supabase } from "./supabase"

export async function setupDatabase() {
  console.log("Setting up database tables...")

  try {
    // Create products table
    const { error: productsError } = await supabase.rpc("create_products_table")
    if (productsError) {
      console.error("Error creating products table:", productsError)
    } else {
      console.log("Products table created successfully")
    }

    // Create categories table
    const { error: categoriesError } = await supabase.rpc("create_categories_table")
    if (categoriesError) {
      console.error("Error creating categories table:", categoriesError)
    } else {
      console.log("Categories table created successfully")
    }

    // Create users table
    const { error: usersError } = await supabase.rpc("create_users_table")
    if (usersError) {
      console.error("Error creating users table:", usersError)
    } else {
      console.log("Users table created successfully")
    }

    // Create orders table
    const { error: ordersError } = await supabase.rpc("create_orders_table")
    if (ordersError) {
      console.error("Error creating orders table:", ordersError)
    } else {
      console.log("Orders table created successfully")
    }

    // Create order_items table
    const { error: orderItemsError } = await supabase.rpc("create_order_items_table")
    if (orderItemsError) {
      console.error("Error creating order_items table:", orderItemsError)
    } else {
      console.log("Order items table created successfully")
    }

    // Create cart_items table
    const { error: cartItemsError } = await supabase.rpc("create_cart_items_table")
    if (cartItemsError) {
      console.error("Error creating cart_items table:", cartItemsError)
    } else {
      console.log("Cart items table created successfully")
    }

    // Create reviews table
    const { error: reviewsError } = await supabase.rpc("create_reviews_table")
    if (reviewsError) {
      console.error("Error creating reviews table:", reviewsError)
    } else {
      console.log("Reviews table created successfully")
    }

    console.log("Database setup completed")
    return true
  } catch (error) {
    console.error("Error setting up database:", error)
    return false
  }
}

export async function insertSampleData() {
  console.log("Inserting sample data...")

  try {
    // Insert sample categories
    const { error: categoriesError } = await supabase.from("categories").insert([
      { id: "electronics", name: "Electronics", image: "/placeholder.svg?height=300&width=300" },
      { id: "clothing", name: "Clothing", image: "/placeholder.svg?height=300&width=300" },
      { id: "home", name: "Home & Kitchen", image: "/placeholder.svg?height=300&width=300" },
      { id: "accessories", name: "Accessories", image: "/placeholder.svg?height=300&width=300" },
      { id: "footwear", name: "Footwear", image: "/placeholder.svg?height=300&width=300" },
    ])

    if (categoriesError) {
      console.error("Error inserting sample categories:", categoriesError)
    } else {
      console.log("Sample categories inserted successfully")
    }

    // Insert sample products
    const { error: productsError } = await supabase.from("products").insert([
      {
        id: "1",
        name: "Wireless Headphones",
        description: "Premium wireless headphones with noise cancellation and long battery life.",
        price: 129.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "Electronics",
        rating: 4,
        reviews: 42,
        stock: 38,
      },
      {
        id: "2",
        name: "Smart Watch",
        description: "Feature-packed smartwatch with health monitoring and smartphone notifications.",
        price: 199.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "Electronics",
        rating: 5,
        reviews: 87,
        stock: 24,
      },
      {
        id: "3",
        name: "Leather Backpack",
        description: "Stylish and durable leather backpack with multiple compartments.",
        price: 79.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "Accessories",
        rating: 4,
        reviews: 36,
        stock: 52,
      },
      {
        id: "4",
        name: "Running Shoes",
        description: "Comfortable running shoes with excellent support and cushioning.",
        price: 89.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "Footwear",
        rating: 4,
        reviews: 128,
        stock: 18,
      },
      {
        id: "5",
        name: "Coffee Maker",
        description: "Programmable coffee maker with thermal carafe to keep your coffee hot for hours.",
        price: 59.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "Home",
        rating: 3,
        reviews: 24,
        stock: 15,
      },
    ])

    if (productsError) {
      console.error("Error inserting sample products:", productsError)
    } else {
      console.log("Sample products inserted successfully")
    }

    console.log("Sample data insertion completed")
    return true
  } catch (error) {
    console.error("Error inserting sample data:", error)
    return false
  }
}

