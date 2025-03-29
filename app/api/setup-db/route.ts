import { NextResponse } from "next/server"
import { setupDatabase, insertSampleData } from "@/lib/setup-database"

export async function GET() {
  try {
    // Set up database tables
    const setupSuccess = await setupDatabase()

    if (!setupSuccess) {
      return NextResponse.json({ success: false, message: "Failed to set up database tables" }, { status: 500 })
    }

    // Insert sample data
    const dataSuccess = await insertSampleData()

    if (!dataSuccess) {
      return NextResponse.json({ success: false, message: "Failed to insert sample data" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Database setup completed successfully" })
  } catch (error) {
    console.error("Error in setup-db route:", error)
    return NextResponse.json({ success: false, message: "An error occurred during database setup" }, { status: 500 })
  }
}

