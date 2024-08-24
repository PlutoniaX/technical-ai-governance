import Link from 'next/link'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Technical AI Governance Explorer</h1>
      <Link href="/taig-explorer" className="text-xl text-blue-600 hover:text-blue-800">
        Explore TAIG Research Problems
      </Link>
    </main>
  )
}