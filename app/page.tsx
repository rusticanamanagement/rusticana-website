'use client';

import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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
    <div className="min-h-screen bg-red-50">
      {/* Slim red header — only 16 units tall (64px) */}
      <nav className="bg-red-600 text-white py-4 px-6 flex justify-between items-center sticky top-0 z-50 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold">Rusticana</h1>
        <div className="space-x-6 text-base md:text-lg">
          <Link href="/deals" className="hover:underline">Deals</Link>
          <Link href="/rewards" className="hover:underline">Rewards</Link>
          <Link href="/locations" className="hover:underline">Locations</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-red-600 text-white text-center py-20">
        <h1 className="text-6xl md:text-8xl font-bold mb-8">Start your order</h1>
        <div className="flex justify-center gap-10 mb-8">
          <Link href="/delivery" className="bg-white text-red-600 px-10 py-5 rounded-full text-3xl font-bold hover:bg-gray-100">
            Delivery
          </Link>
          <Link href="/carryout" className="bg-white text-red-600 px-10 py-5 rounded-full text-3xl font-bold hover:bg-gray-100">
            Carryout
          </Link>
        </div>
        <p className="text-3xl">Order Online</p>
      </section>

      {/* Deals, Menu, Footer — unchanged */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-12 text-red-600">Limited Time Offers</h2>
          {deals.map((deal, i) => (
            <div key={i} className="border-b py-8 last:border-0">
              <h3 className="text-4xl font-bold mb-2">{deal.title}</h3>
              <p className="text-xl mb-6">{deal.desc}</p>
              <button className="bg-red-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-red-700">
                {deal.button}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-12 text-red-600">Browse Menu</h2>
          <ul className="space-y-6 text-3xl text-left">
            {categories.length === 0 ? (
              <li className="text-gray-600">Loading categories...</li>
            ) : (
              categories.map((cat: any) => (
                <li key={cat.id}>
                  <Link href={`/menu/${cat.slug}`} className="text-red-600 hover:underline font-semibold">
                    {cat.name}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>

      <footer className="bg-red-600 text-white py-10 text-center">
        <p className="text-xl">© 2025 Rusticana • All rights reserved</p>
      </footer>
    </div>
  );
}
