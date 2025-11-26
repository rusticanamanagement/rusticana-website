'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabase = createClient(
  'https://lbpeeqwgxmzyplndivmj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicGVlcXdneG16eXBsbmRpdm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMTg0MzcsImV4cCI6MjA3OTU5NDQzN30.Rgu0c2ykFT3zckYpeMNWRQrFXmXr434IRMulUVxF9r0'
);

export default function Kiosk() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('menu_items').select('*').then(({ data }) => setItems(data || []));
  }, []);

  return (
    <div className="min-h-screen bg-orange-600 text-black flex flex-col">
      {/* Header */}
      <header className="bg-amber-900 text-white p-10 text-center">
        <h1 className="text-9xl font-black">RUSTICANA</h1>
        <p className="text-5xl mt-4">Tap your order</p>
      </header>

      {/* Menu Grid — SUPER HIGH CONTRAST */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {items.map(item => (
            <button
              key={item.id}
              className="bg-white border-8 border-black rounded-3xl shadow-2xl transform transition hover:scale-105 active:scale-95"
            >
              {/* Placeholder image — replace with your photos later */}
              <div className="bg-gray-300 border-b-8 border-black h-64 rounded-t-3xl" />
              
              <div className="p-10 text-center">
                <h3 className="text-6xl font-black text-black leading-tight">
                  {item.name}
                </h3>
                <p className="text-4xl font-bold text-gray-800 mt-4">
                  {item.category}
                </p>
                <p className="text-8xl font-black text-orange-600 mt-8">
                  €{item.price}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
