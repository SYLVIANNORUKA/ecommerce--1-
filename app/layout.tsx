import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { ShoppingBag, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth/auth-provider"
import { Toaster } from "@/components/ui/toaster"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "E-Commerce Store",
  description: "A modern e-commerce store built with Next.js and Tailwind CSS",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <header className="sticky top-0 z-50 w-full border-b bg-background">
                <div className="container flex h-16 items-center">
                  <Link href="/" className="flex items-center gap-2 font-bold">
                    <ShoppingBag className="h-5 w-5" />
                    <span>E-Store</span>
                  </Link>
                  <nav className="ml-auto flex items-center gap-4 sm:gap-6">
                    <Link href="/products" className="text-sm font-medium">
                      Products
                    </Link>
                    <Link href="/categories" className="text-sm font-medium">
                      Categories
                    </Link>
                    <Link href="/about" className="text-sm font-medium">
                      About
                    </Link>
                    <Link href="/contact" className="text-sm font-medium">
                      Contact
                    </Link>
                  </nav>
                  <div className="ml-auto flex items-center gap-2">
                    <Link href="/checkout">
                      <Button variant="outline" size="icon" className="relative">
                        <ShoppingBag className="h-5 w-5" />
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                          3
                        </span>
                        <span className="sr-only">Cart</span>
                      </Button>
                    </Link>
                    <Link href="/account">
                      <Button variant="outline" size="icon">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Account</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </header>
              <main className="flex-1">{children}</main>
              <footer className="border-t bg-muted/40">
                <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-start md:justify-between md:py-12">
                  <div className="flex flex-col gap-2">
                    <Link href="/" className="flex items-center gap-2 font-bold">
                      <ShoppingBag className="h-5 w-5" />
                      <span>E-Store</span>
                    </Link>
                    <p className="text-sm text-muted-foreground">Quality products for your everyday needs.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-12 sm:grid-cols-4">
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Products</h3>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link href="/products" className="text-muted-foreground hover:text-foreground">
                            All Products
                          </Link>
                        </li>
                        <li>
                          <Link href="/categories/electronics" className="text-muted-foreground hover:text-foreground">
                            Electronics
                          </Link>
                        </li>
                        <li>
                          <Link href="/categories/clothing" className="text-muted-foreground hover:text-foreground">
                            Clothing
                          </Link>
                        </li>
                        <li>
                          <Link href="/categories/home" className="text-muted-foreground hover:text-foreground">
                            Home & Kitchen
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Company</h3>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link href="/about" className="text-muted-foreground hover:text-foreground">
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                            Careers
                          </Link>
                        </li>
                        <li>
                          <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                            Contact Us
                          </Link>
                        </li>
                        <li>
                          <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                            Blog
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Customer Service</h3>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link href="/help" className="text-muted-foreground hover:text-foreground">
                            Help Center
                          </Link>
                        </li>
                        <li>
                          <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                            Shipping & Delivery
                          </Link>
                        </li>
                        <li>
                          <Link href="/returns" className="text-muted-foreground hover:text-foreground">
                            Returns & Exchanges
                          </Link>
                        </li>
                        <li>
                          <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                            FAQ
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Legal</h3>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                            Privacy Policy
                          </Link>
                        </li>
                        <li>
                          <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                            Terms of Service
                          </Link>
                        </li>
                        <li>
                          <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                            Cookie Policy
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="border-t py-6">
                  <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-center text-sm text-muted-foreground md:text-left">
                      © {new Date().getFullYear()} E-Store. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        <span className="sr-only">Facebook</span>
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
                          className="h-5 w-5"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                      </Link>
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        <span className="sr-only">Twitter</span>
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
                          className="h-5 w-5"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                      </Link>
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        <span className="sr-only">Instagram</span>
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
                          className="h-5 w-5"
                        >
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'