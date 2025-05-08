// Fix product schema issues - run with: node scripts/fix-product-schema.js
import { createClient } from '@sanity/client'
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

// Initialize the Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
  token: process.env.SANITY_API_TOKEN, // Need a token with write access
  useCdn: false,
})

async function fixProductData() {
  console.log('Fetching products...')
  const products = await client.fetch('*[_type == "product"]')
  console.log(`Found ${products.length} products to process`)
  
  for (const product of products) {
    console.log(`Processing product: ${product.title}`)
    let shouldUpdate = false
    const updates = {}
    
    // Fix features array - ensure all items are objects with _key
    if (product.features) {
      if (!Array.isArray(product.features)) {
        // If features is not an array, convert it to a proper array
        updates.features = []
        shouldUpdate = true
      } else {
        // Fix existing array items
        const fixedFeatures = product.features.map(item => {
          // If item is not an object or missing properties, create a proper object
          if (typeof item !== 'object' || item === null) {
            shouldUpdate = true
            return {
              _key: uuidv4(),
              title: String(item) || 'Feature',
              description: ''
            }
          }
          
          // If item is an object but missing _key
          if (!item._key) {
            shouldUpdate = true
            return { ...item, _key: uuidv4() }
          }
          
          return item
        })
        
        if (shouldUpdate) {
          updates.features = fixedFeatures
        }
      }
    }
    
    // Fix use cases array
    if (product.useCases && Array.isArray(product.useCases)) {
      const fixedUseCases = product.useCases.map(item => {
        if (!item._key) {
          shouldUpdate = true
          return { ...item, _key: uuidv4() }
        }
        return item
      })
      
      if (shouldUpdate) {
        updates.useCases = fixedUseCases
      }
    }
    
    // Fix documentation array
    if (product.documentation && Array.isArray(product.documentation)) {
      const fixedDocs = product.documentation.map(item => {
        if (!item._key) {
          shouldUpdate = true
          return { ...item, _key: uuidv4() }
        }
        return item
      })
      
      if (shouldUpdate) {
        updates.documentation = fixedDocs
      }
    }
    
    // Fix technical specs array
    if (product.technicalSpecs && Array.isArray(product.technicalSpecs)) {
      const fixedSpecs = product.technicalSpecs.map(item => {
        if (!item._key) {
          shouldUpdate = true
          return { ...item, _key: uuidv4() }
        }
        return item
      })
      
      if (shouldUpdate) {
        updates.technicalSpecs = fixedSpecs
      }
    }
    
    // Update the product if needed
    if (shouldUpdate) {
      console.log(`Updating product: ${product.title}`)
      try {
        await client.patch(product._id).set(updates).commit()
        console.log(`Successfully updated product: ${product.title}`)
      } catch (error) {
        console.error(`Error updating product ${product.title}:`, error.message)
      }
    } else {
      console.log(`No updates needed for product: ${product.title}`)
    }
  }
  
  console.log('Finished fixing products')
}

fixProductData().catch(console.error)
