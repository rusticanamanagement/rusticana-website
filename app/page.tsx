'use client';

import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const supabase = createClient(
  'https://lbpeeqwgxmzyplndivmj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicGVlcXdneG16eXBsbmRpdm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMTg0MzcsImV4cCI6MjA3OTU5NDQzN30.Rgu0c2ykFT3zckYpeMNWRQrFXmXr434IRMulUVxF9r0'
);

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('categories').select('*').then(({ data }) => setCategories(data ?? []));
  }, []);

  return (
    <div className="min-h-screen bg-red-50">
      {/* Red header */}
      <nav className="bg-red-600 text-white py-3 px-8 flex justify-between items-center sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Rusticana" width={60} height={60} className="rounded-full border-4 border-white" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-wider" style={{ fontFamily: "'Bona Nova SC', serif", letterSpacing: '0.1em' }}>
            RUSTICANA PIZZA
          </h1>
        </div>
        <div className="space-x-8 text-lg">
          <Link href="/deals" className="hover:underline">Deals</Link>
          <Link href="/rewards" className="hover:underline">Rewards</Link>
          <Link href="/locations" className="hover:underline">Locations</Link>
        </div>
      </nav>

      {/* Small white space */}
      <div className="h-4 bg-white"></div>

      {/* Green ORDER NOW bar */}
      <div className="bg-green-600 text-white text-center py-4 sticky top-16 z-40 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-center items-center gap-8">
          <span className="text-3xl md:text-4xl font-bold">ORDER NOW</span>
          <div className="flex gap-6">
            <Link href="/delivery" className="bg-white text-green-600 px-10 py-4 rounded-full text-2xl font-bold hover:bg-gray-100">
              Delivery
            </Link>
            <Link href="/carryout" className="bg-white text-green-600 px-10 py-4 rounded-full text-2xl font-bold hover:bg-gray-100">
              Carryout
            </Link>
          </div>
        </div>
      </div>

      {/* Rest of page unchanged */}
      <section className="bg-red-600 text-white text-center py-32">
        <h2 className="text-6xl md:text-8xl font-bold mb-8">Start your order</h2>
        <div className="flex justify-center gap-12">
          <Link href="/delivery" className="bg-white text-red-600 px-12 py-6 rounded-full text-3xl font-bold hover:bg-gray-100 shadow-xl">
            Delivery
          </Link>
          <Link href="/carryout" className="bg-white text-red-600 px-12 py-6 rounded-full text-3xl font-bold hover:bg-gray-100 shadow-xl">
            Carryout
          </Link>
        </div>
      </section>

      {/* Deals + Menu + Footer */}
      {/* ... same as before — unchanged ... */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-12 text-red-600">Limited Time Offers</h2>
          {/* deals content */}
        </div>
      </section>

      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-12 text-red-600">Browse Menu</h2>
          {/* menu content */}
        </div>
      </section>

      <footer className="bg-red-600 text-white py-10 text-center">
        <p className="text-xl">© 2025 Rusticana Pizza • All rights reserved</p>
      </footer>
    </div>
  );
}
