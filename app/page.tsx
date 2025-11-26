'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      console.error('Missing Supabase env vars');
      setLoading(false);
      return;
    }

    const supabase = createClient(url, key);

    // async/await = no more TypeScript catch/finally problems
    (async () => {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .in('available', [true, 'true']);

        if (error) throw error;
        setItems(data || []);
      } catch (err) {
        console.error('Supabase error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-20">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h1 className="text-7xl font-bold text-amber-900 mb-16">Rusticána</h1>

        {loading ? (
          <p className="text-3xl text-amber-900">Loading menu...</p>
        ) : items.length === 0 ? (
          <p className="text-2xl text-gray-600">No items found</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-12">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-3xl shadow-2xl p-12 hover:scale-105 transition">
                <h3 className="text-3xl font-bold text-gray-800">{item.name}</h3>
                <p className="text-xl text-gray-600 mt-4">{item.category}</p>
                <p className="text-5xl font-bold text-amber-600 mt-8">${item.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
