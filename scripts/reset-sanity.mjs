/**
 * Destructive: wipe all blog posts, research papers, and products from Sanity,
 * then re-seed cortexSDR.
 *
 * By default this runs in DRY-RUN mode and prints what it would delete.
 * Pass --confirm to actually delete.
 *
 * Required env (in .env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET           (defaults to "production")
 *   SANITY_API_TOKEN                     (write token)
 *
 * Run:
 *   node scripts/reset-sanity.mjs              # dry run, prints plan
 *   node scripts/reset-sanity.mjs --confirm    # actually delete + reseed
 */

import { createClient } from "@sanity/client"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const CONFIRM = process.argv.includes("--confirm")

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

const TYPES_TO_WIPE = ["post", "researchPaper", "product"]

async function listType(type) {
  const ids = await client.fetch(`*[_type == $type]._id`, { type })
  return ids
}

async function deleteIds(ids) {
  if (ids.length === 0) return
  // Sanity transactions are atomic; chunk to avoid huge payloads.
  const chunkSize = 50
  for (let i = 0; i < ids.length; i += chunkSize) {
    const chunk = ids.slice(i, i + chunkSize)
    const tx = client.transaction()
    for (const id of chunk) tx.delete(id)
    await tx.commit({ visibility: "async" })
    console.log(`  deleted ${chunk.length} (${i + chunk.length}/${ids.length})`)
  }
}

const CORTEXSDR = {
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
}

async function seedCortexSDR() {
  const id = `product-${CORTEXSDR.slug}`
  const doc = {
    _id: id,
    _type: "product",
    title: CORTEXSDR.title,
    slug: { _type: "slug", current: CORTEXSDR.slug },
    status: CORTEXSDR.status,
    featured: CORTEXSDR.featured,
    order: CORTEXSDR.order,
    summary: CORTEXSDR.summary,
    description: CORTEXSDR.description,
    cta: CORTEXSDR.cta,
    features: CORTEXSDR.features.map((f, i) => ({
      _key: `feature-${i}`,
      _type: "feature",
      title: f.title,
      description: f.description,
    })),
  }
  await client.createOrReplace(doc)
  console.log(`✓ seeded ${CORTEXSDR.title} (${id})`)
}

async function main() {
  console.log(`\nTarget: dataset="${dataset}" project="${projectId}"`)
  console.log(`Mode:   ${CONFIRM ? "CONFIRM (destructive)" : "dry-run"}\n`)

  let totalToDelete = 0
  const plan = {}

  for (const type of TYPES_TO_WIPE) {
    const ids = await listType(type)
    plan[type] = ids
    totalToDelete += ids.length
    console.log(`  ${type.padEnd(15)} ${ids.length} document(s)`)
  }

  console.log(`\nTotal to delete: ${totalToDelete}`)
  console.log(`Then seed: cortexSDR product`)

  if (!CONFIRM) {
    console.log(
      `\nDry run only. Re-run with --confirm to actually delete and reseed.`,
    )
    return
  }

  console.log(`\nDeleting…`)
  for (const type of TYPES_TO_WIPE) {
    if (plan[type].length === 0) continue
    console.log(` deleting ${type}:`)
    await deleteIds(plan[type])
  }

  console.log(`\nSeeding cortexSDR…`)
  await seedCortexSDR()

  console.log(`\nDone.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
