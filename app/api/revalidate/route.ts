import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

// This is a webhook handler that Sanity can call when content changes
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Verify the webhook secret if you've set one up
    const secret = request.headers.get("x-webhook-secret")
    const expectedSecret = process.env.SANITY_WEBHOOK_SECRET

    if (secret !== expectedSecret) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
    }

    // Extract the document type and slug from the body
    const { _type, slug } = body

    // Revalidate the appropriate paths based on the document type
    if (_type === "post") {
      revalidatePath("/blog")
      revalidatePath(`/blog/${slug.current}`)
      revalidatePath("/")
    } else if (_type === "researchPaper") {
      revalidatePath("/research")
      revalidatePath(`/research/${slug.current}`)
      revalidatePath("/")
    } else if (_type === "caseStudy") {
      revalidatePath("/case-studies")
      revalidatePath(`/case-studies/${slug.current}`)
    } else if (_type === "product") {
      revalidatePath("/products")
      revalidatePath(`/products/${slug.current}`)
      revalidatePath("/")
    } else {
      // Fallback to revalidating the homepage
      revalidatePath("/")
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err: any) {
    console.error("Error revalidating:", err)
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
