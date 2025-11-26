'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient(
      'https://lbpeeqwgxmzyplndivmj.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicGVlcXdneG16eXBsbmRpdm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMTg0MzcsImV4cCI6MjA3OTU5NDQzN30.Rgu0c2ykFT3zckYpeMNWRQrFXmXr434IRMulUVxF9r0'
    );

    supabase
      .from('menu_items')
      .select('*')
      .then(({ data }) => {
        setItems(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-100 py-20 text-black"> {/* Darker text, brighter bg */}
      <div className="max-w-6xl mx-auto text-center px-4">
        <h1 className="text-8xl md:text-9xl font-bold text-amber-900 mb-16 drop-shadow-2xl">Rusticana</h1> {/* Bigger, shadow for pop */}
        
        {loading ? (
          <p className="text-5xl font-bold text-amber-900">Loading menu...</p>
        ) : items.length === 0 ? (
          <p className="text-4xl font-bold text-red-600">No items found – check Supabase</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-12">
            {items.map(item => (
              <button key={item.id} className="bg-white rounded-3xl shadow-2xl p-12 hover:scale-105 transition transform border-4 border-amber-300 hover:border-amber-600"> {/* Thick border, no opacity */}
                <h3 className="text-5xl font-bold text-gray-900 mb-4 drop-shadow-lg">{item.name}</h3> {/* Darker, bigger, shadow */}
                <p className="text-3xl text-gray-800 mb-6">{item.category}</p> {/* Darker gray */}
                <p className="text-7xl font-bold text-amber-700">€{item.price}</p> {/* Brighter amber */}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
