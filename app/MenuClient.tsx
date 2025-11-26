'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rusticana.supabase.co',  // Fallback for safety
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''  // Fallback
);

export default function MenuClient() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .eq('available', true)
          .order('category');
        
        if (error) throw error;
        setItems(data || []);
      } catch (err: any) {
        console.error('Supabase error:', err);
        setError('Failed to load menu — check console for details');
      } finally {
        setLoading(false);
      }
    }
    
    fetchMenu();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <p className="text-4xl text-amber-900">Loading Rusticána menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <p className="text-2xl text-red-600 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-20">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h1 className="text-7xl font-bold text-amber-900 mb-16">Rusticána</h1>
        <div className="grid md:grid-cols-3 gap-12">
          {items.length === 0 ? (
            <p className="text-xl text-gray-600 col-span-full">No items available — check Supabase.</p>
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