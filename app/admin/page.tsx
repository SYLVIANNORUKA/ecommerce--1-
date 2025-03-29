"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpDown,
  BarChart3,
  CreditCard,
  DollarSign,
  Download,
  Home,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <ShoppingBag className="h-5 w-5" />
            <span>Admin Dashboard</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Button
              variant={activeTab === "dashboard" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("dashboard")}
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === "orders" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("orders")}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Orders
            </Button>
            <Button
              variant={activeTab === "products" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("products")}
            >
              <Package className="mr-2 h-4 w-4" />
              Products
            </Button>
            <Button
              variant={activeTab === "customers" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("customers")}
            >
              <Users className="mr-2 h-4 w-4" />
              Customers
            </Button>
            <Button
              variant={activeTab === "analytics" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("analytics")}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            <Separator className="my-2" />
            <Button variant="ghost" className="justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className="flex items-center gap-2 rounded-lg border bg-background p-4">
            <div className="relative h-8 w-8 rounded-full bg-muted">
              <Image src="/placeholder.svg?height=32&width=32" alt="Admin" fill className="rounded-full" />
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  width="32"
                  height="32"
                  className="rounded-full"
                  alt="Avatar"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold sm:text-2xl">Dashboard</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">$45,231.89</p>
                    </div>
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                      <DollarSign className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <span className="text-green-500">+12.5%</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Orders</p>
                      <p className="text-2xl font-bold">356</p>
                    </div>
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                      <ShoppingCart className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <span className="text-green-500">+8.2%</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Customers</p>
                      <p className="text-2xl font-bold">2,453</p>
                    </div>
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <span className="text-green-500">+5.7%</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                      <p className="text-2xl font-bold">3.2%</p>
                    </div>
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                      <CreditCard className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <span className="text-red-500">-0.5%</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <div className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Showing the latest 5 orders</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/orders">View All</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.status === "Completed"
                                  ? "default"
                                  : order.status === "Processing"
                                    ? "outline"
                                    : "secondary"
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">${order.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Top Products */}
            <div className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Top Products</CardTitle>
                    <CardDescription>Best selling products this month</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/products">View All</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Sales</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Stock</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="relative h-10 w-10 overflow-hidden rounded">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span className="font-medium">{product.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.sales}</TableCell>
                          <TableCell>${product.revenue}</TableCell>
                          <TableCell>
                            <Badge
                              variant={product.stock > 50 ? "default" : product.stock > 10 ? "outline" : "destructive"}
                            >
                              {product.stock}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold sm:text-2xl">Orders</h1>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-8">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.status === "Completed"
                                  ? "default"
                                  : order.status === "Processing"
                                    ? "outline"
                                    : "secondary"
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell className="text-right">${order.amount}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View details</DropdownMenuItem>
                                <DropdownMenuItem>Update status</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Cancel order</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold sm:text-2xl">Products</h1>
              <div className="flex items-center gap-2">
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>
                          <Button variant="ghost" className="p-0 font-medium">
                            Price
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button variant="ghost" className="p-0 font-medium">
                            Stock
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="relative h-10 w-10 overflow-hidden rounded">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span className="font-medium">{product.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>${product.price}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>
                            <Badge variant={product.status === "Active" ? "default" : "secondary"}>
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        )}

        {/* Customers Tab */}
        {activeTab === "customers" && (
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold sm:text-2xl">Customers</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Spent</TableHead>
                        <TableHead>Last Order</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                <Image
                                  src={customer.avatar || "/placeholder.svg"}
                                  alt={customer.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span className="font-medium">{customer.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.orders}</TableCell>
                          <TableCell>${customer.spent}</TableCell>
                          <TableCell>{customer.lastOrder}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View details</DropdownMenuItem>
                                <DropdownMenuItem>View orders</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Send email</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold sm:text-2xl">Analytics</h1>
              <div className="flex items-center gap-2">
                <Select defaultValue="30">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                    <SelectItem value="365">Last year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-8">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                  <CardDescription>Monthly revenue and order count</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center">
                    <p className="text-muted-foreground">Sales chart placeholder</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where your customers come from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center">
                    <p className="text-muted-foreground">Traffic chart placeholder</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Product Categories</CardTitle>
                  <CardDescription>Sales by product category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center">
                    <p className="text-muted-foreground">Categories chart placeholder</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Customer Retention</CardTitle>
                  <CardDescription>New vs returning customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center">
                    <p className="text-muted-foreground">Retention chart placeholder</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        )}
      </div>
    </div>
  )
}

// Sample data
const recentOrders = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    date: "2023-06-20",
    status: "Completed",
    amount: "129.99",
  },
  {
    id: "#ORD-002",
    customer: "Jane Smith",
    date: "2023-06-19",
    status: "Processing",
    amount: "79.99",
  },
  {
    id: "#ORD-003",
    customer: "Robert Johnson",
    date: "2023-06-18",
    status: "Pending",
    amount: "249.99",
  },
  {
    id: "#ORD-004",
    customer: "Emily Davis",
    date: "2023-06-17",
    status: "Completed",
    amount: "189.99",
  },
  {
    id: "#ORD-005",
    customer: "Michael Brown",
    date: "2023-06-16",
    status: "Processing",
    amount: "99.99",
  },
]

const topProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    category: "Electronics",
    sales: 142,
    revenue: "18,459.99",
    stock: 38,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Smart Watch",
    category: "Electronics",
    sales: 89,
    revenue: "17,799.99",
    stock: 24,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Leather Backpack",
    category: "Accessories",
    sales: 65,
    revenue: "5,199.99",
    stock: 52,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Running Shoes",
    category: "Footwear",
    sales: 49,
    revenue: "4,409.99",
    stock: 18,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Coffee Maker",
    category: "Home",
    sales: 32,
    revenue: "1,919.99",
    stock: 5,
    image: "/placeholder.svg?height=40&width=40",
  },
]

const allOrders = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    date: "2023-06-20",
    status: "Completed",
    items: 2,
    amount: "129.99",
  },
  {
    id: "#ORD-002",
    customer: "Jane Smith",
    date: "2023-06-19",
    status: "Processing",
    items: 1,
    amount: "79.99",
  },
  {
    id: "#ORD-003",
    customer: "Robert Johnson",
    date: "2023-06-18",
    status: "Pending",
    items: 3,
    amount: "249.99",
  },
  {
    id: "#ORD-004",
    customer: "Emily Davis",
    date: "2023-06-17",
    status: "Completed",
    items: 2,
    amount: "189.99",
  },
  {
    id: "#ORD-005",
    customer: "Michael Brown",
    date: "2023-06-16",
    status: "Processing",
    items: 1,
    amount: "99.99",
  },
  {
    id: "#ORD-006",
    customer: "Sarah Wilson",
    date: "2023-06-15",
    status: "Completed",
    items: 4,
    amount: "299.99",
  },
  {
    id: "#ORD-007",
    customer: "David Taylor",
    date: "2023-06-14",
    status: "Pending",
    items: 2,
    amount: "159.99",
  },
  {
    id: "#ORD-008",
    customer: "Jennifer Miller",
    date: "2023-06-13",
    status: "Completed",
    items: 1,
    amount: "59.99",
  },
]

const allProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    category: "Electronics",
    price: "129.99",
    stock: 38,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Smart Watch",
    category: "Electronics",
    price: "199.99",
    stock: 24,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Leather Backpack",
    category: "Accessories",
    price: "79.99",
    stock: 52,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Running Shoes",
    category: "Footwear",
    price: "89.99",
    stock: 18,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Coffee Maker",
    category: "Home",
    price: "59.99",
    stock: 5,
    status: "Low Stock",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Smartphone",
    category: "Electronics",
    price: "699.99",
    stock: 12,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    name: "Desk Lamp",
    category: "Home",
    price: "39.99",
    stock: 0,
    status: "Out of Stock",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    name: "Winter Jacket",
    category: "Clothing",
    price: "149.99",
    stock: 28,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
]

const customers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    orders: 5,
    spent: "549.95",
    lastOrder: "2023-06-20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    orders: 3,
    spent: "289.97",
    lastOrder: "2023-06-18",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    orders: 7,
    spent: "892.43",
    lastOrder: "2023-06-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    orders: 2,
    spent: "239.98",
    lastOrder: "2023-06-12",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    orders: 4,
    spent: "399.96",
    lastOrder: "2023-06-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    orders: 6,
    spent: "729.94",
    lastOrder: "2023-06-08",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    name: "David Taylor",
    email: "david.taylor@example.com",
    orders: 1,
    spent: "99.99",
    lastOrder: "2023-06-05",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    name: "Jennifer Miller",
    email: "jennifer.miller@example.com",
    orders: 3,
    spent: "329.97",
    lastOrder: "2023-06-02",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Menu component for mobile
function Menu({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

