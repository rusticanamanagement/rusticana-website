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
    <div className="min-h-screen bg-white">
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

      {/* White space */}
      <div className="h-12 bg-white"></div>

      {/* Green ORDER NOW bar — same width as hero */}
      <div className="bg-green-600 text-white text-center py-5">
        <div className="max-w-7xl mx-auto flex justify-center items-center gap-10">
          <span className="text-4xl font-bold">ORDER NOW</span>
          <div className="flex gap-8">
            <Link href="/delivery" className="bg-white text-green-600 px-12 py-5 rounded-full text-3xl font-bold hover:bg-gray-100 shadow-xl">
              Delivery
            </Link>
            <Link href="/carryout" className="bg-white text-green-600 px-12 py-5 rounded-full text-3xl font-bold hover:bg-gray-100 shadow-xl">
              Carryout
            </Link>
          </div>
        </div>
      </div>

      {/* WIDER & SLIMMER hero box — exact Domino's 2025 ratio */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative h-96 md:h-[540px]">
            <Image
              src="/pizzaoven.jpg"
              alt="Rusticana Pizza"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-6xl md:text-8xl font-bold mb-6 drop-shadow-2xl">FRESH FROM THE OVEN</h2>
                <p className="text-3xl md:text-5xl drop-shadow-lg">Hand-crafted daily with love</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of page */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-6xl font-bold text-red-600 mb-12">Limited Time Offers</h2>
        </div>
      </section>

      <footer className="bg-red-600 text-white py-12 text-center">
        <p className="text-2xl">© 2025 Rusticana Pizza • All rights reserved</p>
      </footer>
    </div>
  );
}
