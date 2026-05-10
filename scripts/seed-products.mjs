/**
 * Seed / upsert products into Sanity.
 *
 * Each product is identified by its slug — running this script repeatedly is
 * safe and will update the existing document rather than creating duplicates.
 *
 * Required env (in .env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET           (defaults to "production")
 *   SANITY_API_TOKEN                     (write token — create at https://www.sanity.io/manage)
 *
 * Run:
 *   node scripts/seed-products.mjs
 */

import { createClient } from "@sanity/client"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID")
  process.exit(1)
}
if (!token) {
  console.error(
    "Missing SANITY_API_TOKEN. Create a write token at https://www.sanity.io/manage and add it to .env.local",
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03",
  token,
  useCdn: false,
})

const PRODUCTS = [
  {
    slug: "cortexsdr",
    title: "cortexSDR",
    status: "internal",
    featured: true,
    order: 10,
    summary:
      "C++17 toolchain for compressing neural models into sparse .sdr archives and running sparse / on-demand inference from them. Supports ONNX, GGUF, TensorFlow, PyTorch, and HDF5, with BLAS- and SIMD-tuned kernels.",
    description:
      "cortexSDR turns trained models into compact, sparse archives and runs inference directly from those archives. The toolchain ships a C++17 core library, a static and shared SDK, and three CLIs — compression, text/inference, and benchmarks. It's what we use ourselves to study how compression and sparsity affect inference cost on real hardware.",
    cta: { label: "Ask about access", href: "/contact" },
    features: [
      {
        title: "Multi-format ingest",
        description: "ONNX, GGUF, TensorFlow, PyTorch, and HDF5 model files.",
      },
      {
        title: "Configurable sparsity",
        description:
          "Per-archive sparsity targets (default 2%) with deterministic compress / decompress round-trips.",
      },
      {
        title: "Optimized kernels",
        description:
          "BLAS, SIMD, sparse, attention, and flash kernels selected at build time.",
      },
      {
        title: "Streaming compression",
        description:
          "Streaming compression path for large models that don't fit comfortably in memory.",
      },
      {
        title: "CLI workflow",
        description:
          "cortexsdr_ai_compression_cli, cortexsdr_text_cli, and cortexsdr_bench cover the daily compress / run / measure loop.",
      },
      {
        title: "Firmware target",
        description:
          "Optional firmware build mode for running compressed models on resource-constrained devices.",
      },
    ],
  },
]

async function upsertProduct(product) {
  const id = `product-${product.slug}`
  const doc = {
    _id: id,
    _type: "product",
    title: product.title,
    slug: { _type: "slug", current: product.slug },
    status: product.status,
    featured: product.featured ?? false,
    order: product.order ?? 100,
    summary: product.summary,
    description: product.description,
    ...(product.cta ? { cta: product.cta } : {}),
    ...(product.features
      ? {
          features: product.features.map((f, i) => ({
            _key: `feature-${i}`,
            _type: "feature",
            title: f.title,
            description: f.description,
          })),
        }
      : {}),
  }

  await client.createOrReplace(doc)
  console.log(`✓ upserted ${product.title} (${id})`)
}

async function main() {
  console.log(`Seeding ${PRODUCTS.length} product(s) into ${dataset}…`)
  for (const p of PRODUCTS) {
    try {
      await upsertProduct(p)
    } catch (err) {
      console.error(`✗ failed to upsert ${p.title}`, err)
      process.exitCode = 1
    }
  }
}

main()
