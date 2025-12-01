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

  const deals = [
    { title: '50% off all pizzas', desc: '11/28 - 12/7, online only', button: 'Add Deal' },
    { title: 'Mix & Match: Any 2 for €6.99', desc: 'Pizzas, sides, desserts', button: 'Add Deal' },
    { title: 'Carryout Special: €7.99 pizza', desc: '1-topping + wings', button: 'Add Deal' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Red header with logo + font */}
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

      {/* Green ORDER NOW bar */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-green-600 text-white text-center py-6 rounded-3xl shadow-2xl">
          <div className="flex justify-center items-center gap-12">
            <span className="text-4xl md:text-5xl font-bold">ORDER NOW</span>
            <div className="flex gap-10">
              <Link href="/delivery" className="bg-white text-green-600 px-14 py-6 rounded-full text-3xl md:text-4xl font-bold hover:bg-gray-100 shadow-xl">
                Delivery
              </Link>
              <Link href="/carryout" className="bg-white text-green-600 px-14 py-6 rounded-full text-3xl md:text-4xl font-bold hover:bg-gray-100 shadow-xl">
                Carryout
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Wide hero picture box */}
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

      {/* Deals section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-6xl font-bold text-red-600 text-center mb-12">Limited Time Offers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {deals.map((deal, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition">
                <h3 className="text-3xl font-bold mb-4">{deal.title}</h3>
                <p className="text-lg mb-6">{deal.desc}</p>
                <button className="w-full bg-red-600 text-white py-4 rounded-full text-xl font-bold hover:bg-red-700">
                  {deal.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu browse */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-6xl font-bold text-red-600 text-center mb-12">Browse Menu</h2>
          <ul className="grid md:grid-cols-2 gap-6 text-3xl text-left">
            {categories.length === 0 ? (
              <li className="text-gray-600">Loading categories...</li>
            ) : (
              categories.map((cat: any) => (
                <li key={cat.id}>
                  <Link href={`/menu/${cat.slug}`} className="text-red-600 hover:underline font-semibold block p-6 border-b">
                    {cat.name}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-600 text-white py-12 text-center">
        <p className="text-2xl">© 2025 Rusticana Pizza • All rights reserved</p>
      </footer>
    </div>
  );
}
