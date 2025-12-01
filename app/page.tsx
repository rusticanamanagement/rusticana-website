'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Red header with REAL Metro Beardy */}
      <nav className="bg-red-600 text-white py-3 px-8 flex justify-between items-center sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Rusticana" width={60} height={60} className="rounded-full border-4 border-white" />
          <h1 
            className="text-5xl md:text-7xl font-bold tracking-widest"
            style={{ 
              fontFamily: "'Metro Beardy', sans-serif",
              letterSpacing: '0.2em',
              textShadow: '4px 4px 8px rgba(0,0,0,0.5)'
            }}
          >
            RUSTICANA PIZZA
          </h1>
        </div>
        <div className="space-x-8 text-lg">
          <Link href="/deals" className="hover:underline">Deals</Link>
          <Link href="/rewards" className="hover:underline">Rewards</Link>
          <Link href="/locations" className="hover:underline">Locations</Link>
        </div>
      </nav>

      {/* Rest of your current page stays the same */}
      {/* ... green bar, hero image, etc. ... */}
    </div>
  );
}
