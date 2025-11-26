'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useHydrate } from 'nextjs-hydration-workaround'; // We'll add this package below

useHydrate(); // Suppresses hydration warnings

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      setError('Supabase config missing — check Vercel env vars');
      setLoading(false);
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    supabase
      .from('menu_items')
      .select('*')
      .eq('available', true)
      .order('category')
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setItems(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-amber-900 mb-4">Rusticána</h1>
          <p className="text-2xl text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-amber-900 mb-4">Rusticána</h1>
          <p className="text-xl text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-20">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h1 className="text-7xl font-bold text-amber-900 mb-16">Rusticána</h1>
        <div className="grid md:grid-cols-3 gap-12">
          {items.length === 0 ? (
            <p className="text-xl text-gray-600 col-span-full">No menu items available.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl shadow-2xl p-12 hover:scale-105 transition">
                <h3 className="text-3xl font-bold text-gray-800">{item.name}</h3>
                <p className="text-xl text-gray-600 mt-4">{item.category}</p>
                <p className="text-5xl font-bold text-amber-600 mt-8">${item.price}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}