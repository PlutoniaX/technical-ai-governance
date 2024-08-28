import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 text-center text-blue-400">AI Governance</h1>
        <div className="flex justify-center">
          <Link href="/TAIG" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Technical AI Governance Explorer
          </Link>
        </div>
      </div>
    </div>
  );
}