import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect to the site homepage
  redirect('/')
  
  // This code is unreachable but needed for TypeScript
  return null
}
