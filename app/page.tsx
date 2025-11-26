'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export default function Home() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const supabase = createClient(
      'https://lbpeeqwgxmzyplndivmj.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicGVlcXdneG16eXBsbmRpdm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMTg0MzcsImV4cCI6MjA3OTU5NDQzN30.Rgu0c2ykFT3zckYpeMNWRQrFXmXr434IRMulUVxF9r0'
    );

    supabase
      .from('menu_items')
      .select('*')
      .then(({ data }) => setItems(data || []));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-20">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h1 className="text-7xl font-bold text-amber-900 mb-16">Rusticána</h1>
        <div className="grid md:grid-cols-3 gap-12">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-3xl shadow-2xl p-12 hover:scale-105 transition">
              <h3 className="text-3xl font-bold text-gray-800">{item.name}</h3>
              <p className="text-xl text-gray-600 mt-4">{item.category}</p>
              <p className="text-5xl font-bold text-amber-600 mt-8">${item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
