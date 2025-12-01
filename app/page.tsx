'use client';

import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const supabase = createClient(
  'https://lbpeeqwgxmzyplndivmj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicGVlcXdneG16eXBsbmRpdm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMTg0MzcsImV4cCI6MjA3OTU5NDQzN30.Rgu0c2ykFT3zckYpeMNWRQrFXmXr434IRMulUVxF9r0'
);

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

export default function Menu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('pizzas');
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [customPizza, setCustomPizza] = useState<{ size: string; toppings: string[]; price: number }>({
    size: '',
    toppings: [],
    price: 0,
  });

  useEffect(() => {
    supabase.from('categories').select('*').then(({ data }) => setCategories(data ?? []));
    supabase.from('menu_items').select('*').then(({ data }) => setItems(data ?? []));
  }, []);

  const sizes = [
    { name: 'Small', price: 8.99 },
    { name: 'Medium', price: 11.99 },
    { name: 'Large', price: 14.99 },
  ];

  const toppings = [
    { name: 'Pepperoni', price: 1.5 },
    { name: 'Mushrooms', price: 1.0 },
    { name: 'Extra Cheese', price: 2.0 },
    { name: 'Sausage', price: 1.5 },
  ];

  const toggleTopping = (topping: string) => {
    setCustomPizza(prev => ({
      ...prev,
      toppings: prev.toppings.includes(topping)
        ? prev.toppings.filter(t => t !== topping)
        : [...prev.toppings, topping],
      price: prev.price + (prev.toppings.includes(topping) ? -toppings.find(t => t.name === topping)!.price : toppings.find(t => t.name === topping)!.price),
    }));
  };

  const updateSize = (size: { name: string; price: number }) => {
    setCustomPizza(prev => ({ ...prev, size: size.name, price: size.price + prev.toppings.reduce((sum, t) => sum + toppings.find(top => top.name === t)!.price, 0) }));
  };

  const categoryItems = items.filter(item => item.category.toLowerCase() === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-red-600 text-white text-center py-20">
        <h1 className="text-6xl md:text-8xl font-bold mb-6">Menu</h1>
        <p className="text-3xl mb-8">Build Your Own or Choose From Favorites</p>
        <Link href="/order" className="bg-white text-red-600 px-12 py-6 rounded-full text-3xl font-bold hover:bg-gray-100">
          Order Online
        </Link>
      </section>

      {/* Category Tabs */}
      <div className="bg-white py-4 sticky top-16 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center space-x-8 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`text-2xl font-bold py-4 px-8 rounded-full transition whitespace-nowrap ${
                  activeCategory === cat.slug
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {categoryItems.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition">
                <div className="h-64 bg-gray-200 border-b-4 border-red-600" />
                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-3">{item.name}</h3>
                  <p className="text-5xl font-bold text-red-600 mb-6">€{item.price.toFixed(2)}</p>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="w-full bg-red-600 text-white py-5 rounded-full text-2xl font-bold hover:bg-red-700"
                  >
                    Customize & Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customize Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-10 max-w-2xl w-full max-h-screen overflow-y-auto">
            <h2 className="text-5xl font-bold text-center mb-8">Customize {selectedItem.name}</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-4">Size</h3>
                <div className="grid grid-cols-3 gap-4">
                  {sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => updateSize(size)}
                      className={`p-6 rounded-2xl border-4 text-2xl font-bold ${
                        customPizza.size === size.name ? 'border-red-600 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      {size.name}<br/>€{size.price}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold mb-4">Toppings</h3>
                <div className="grid grid-cols-2 gap-4">
                  {toppings.map((topping) => (
                    <button
                      key={topping.name}
                      onClick={() => toggleTopping(topping.name)}
                      className={`p-6 rounded-2xl border-4 text-2xl font-bold ${
                        customPizza.toppings.includes(topping.name) ? 'border-red-600 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      {topping.name} +€{topping.price}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <p className="text-6xl font-bold text-red-600 mb-8">
                  €{(customPizza.price || 0).toFixed(2)}
                </p>
                <button className="w-full bg-red-600 text-white py-8 rounded-full text-3xl font-bold hover:bg-red-700">
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    setCustomPizza({ size: '', toppings: [], price: 0 });
                  }}
                  className="w-full mt-4 text-gray-600 text-xl"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-red-600 text-white py-12 text-center">
        <p className="text-2xl">© 2025 Rusticana Pizza • All rights reserved</p>
      </footer>
    </div>
  );
}
