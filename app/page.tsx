'use client';

import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const supabase = createClient(
  'https://lbpeeqwgxmzyplndivmj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicGVlcXdneG16eXBsbmRpdm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMTg0MzcsImV4cCI6MjA3OTU5NDQzN30.Rgu0c2ykFT3zckYpeMNWRQrFXmXr434IRMulUVxF9r0'
);

export default function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    supabase.from('categories').select('*').then(({ data }) => setCategories(data || []));
  }, []);

  // Demo deals (add your real promos)
  const deals = [
    { id: 1, title: '50% off all pizzas', desc: '11/28 - 12/7, online only', link: '/deals/50off', button: 'Add Deal' },
    { id: 2, title: 'Mix & Match: Any 2 for €6.99', desc: 'Pizzas, sides, desserts', link: '/deals/mix', button: 'Add Deal' },
    { id: 3, title: 'Carryout Special: €7.99 pizza', desc: '1-topping + wings', link: '/deals/carryout', button: 'Add Deal' },
  ];

  return (
    <div className="min-h-screen bg-red-50">
      {/* Top Navigation (Domino's-style minimal) */}
      <nav className="bg-red-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Rusticana</h1>
        <div className="space-x-4">
          <Link href="/deals" className="hover:underline">Deals</Link>
          <Link href="/rewards" className="hover:underline">Rewards</Link>
          <Link href="/locations" className="hover:underline">Locations</Link>
        </div>
      </nav>

      {/* Hero: Start Your Order */}
      <section className="bg-red-600 text-white text-center py-20">
        <h1 className="text-6xl md:text-8xl font-bold mb-6">Start your order</h1>
        <div className="flex justify-center gap-8 mb-8">
          <Link href="/delivery" className="bg-white text-red-600 px-8 py-4 rounded-full text-2xl font-bold hover:bg-gray-100">
            Delivery
          </Link>
          <Link href="/carryout" className="bg-white text-red-600 px-8 py-4 rounded-full text-2xl font-bold hover:bg-gray-100">
            Carryout
          </Link>
        </div>
        <p className="text-3xl">Order Online</p>
      </section>

      {/* Promotional Offers (Carousel-style, repeat for emphasis) */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-8 text-red-600">Limited Time Offers</h2>
          {deals.map(deal => (
            <div key={deal.id} className="border-b py-6">
              <h3 className="text-3xl font-bold mb-2">{deal.title}</h3>
              <p className="text-lg mb-4">{deal.desc}</p>
              <Link href={deal.link} className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700">
                {deal.button}
              </Link>
              <p className="text-sm text-gray-500 mt-2">Prices vary by location. Min order €15. Excludes delivery fees.</p>
            </div>
          ))}
          <div className="text-center mt-8">
            <Link href="/deals" className="text-red-600 text-xl font-bold underline">Explore more deals</Link>
          </div>
        </div>
      </section>

      {/* What's New / Rewards */}
      <section className="py-12 bg-red-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div className="text-center">
            <h3 className="text-4xl font-bold mb-4 text-red-600">NEW! Specialty Pizzas</h3>
            <p className="text-xl mb-6">Treat yourself to our latest creations</p>
            <Link href="/menu/specialty" className="bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700">
              Order Now
            </Link>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold mb-4 text-red-600">Earn Free Pizza</h3>
            <p className="text-xl mb-6">Every 2 orders — join rewards today</p>
            <Link href="/rewards" className="bg-white text-red-600 px-8 py-4 rounded-full font-bold border-2 border-red-600 hover:bg-gray-100">
              Join Now
            </Link>
          </div>
        </div>
      </section>

      {/* Browse Menu Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-8 text-red-600">Browse Menu</h2>
          <ul className="grid md:grid-cols-2 gap-4 text-left max-w-4xl mx-auto">
            {categories.map(cat => (
              <li key={cat.id} className="text-2xl">
                <Link href={`/menu/${cat.slug}`} className="text-red-600 hover:underline font-semibold">
                  {cat.name} {cat.slug.includes('new') && <span className="text-green-600">NEW!</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xl mb-4">© 2025 Rusticana. All rights reserved.</p>
          <div className="space-x-4">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/support" className="hover:underline">Support: 800-252-4031</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
