'use client';

import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const supabase = createClient(
  'https://lbpeeqwgxmzyplndivmj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicGVlcXdneG16eXBsbmRpdm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMTg0MzcsImV4cCI6MjA3OTU5NDQzN30.Rgu0c2ykFT3zckYpeMNWRQrFXmXr434IRMulUVxF9r0'
);

export default function Menu() {
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('pizzas');
  const [items, setItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [customPizza, setCustomPizza] = useState({ size: '', toppings: [], price: 0 });

  useEffect(() => {
    supabase.from('categories').select('*').then(({ data }) => setCategories(data ?? []));
    supabase.from('menu_items').select('*').then(({ data }) => setItems(data ?? []));
  }, []);

  const toppings = [
    { name: 'Pepperoni', price: 1.5 },
    { name: 'Mushrooms', price: 1.0 },
    { name: 'Extra Cheese', price: 2.0 },
    { name: 'Sausage', price: 1.5 },
  ];

  const sizes = [
    { name: 'Small', price: 8.99 },
    { name: 'Medium', price: 11.99 },
    { name: 'Large', price: 14.99 },
  ];

  const toggleTopping = (topping) => {
    setCustomPizza(prev => ({
      ...prev,
      toppings: prev.toppings.includes(topping) ? prev.toppings.filter(t => t !== topping) : [...prev.toppings, topping]
    }));
  };

  const updateSize = (size) => {
    setCustomPizza(prev => ({ ...prev, size, price: size.price + prev.toppings.reduce((sum, t) => sum + t.price, 0) }));
  };

  const categoryItems = items.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-red-50">
      {/* Hero — like Domino's menu hero */}
      <section className="bg-red-600 text-white text-center py-20">
        <h1 className="text-6xl md:text-8xl font-bold mb-6">Menu</h1>
        <p className="text-3xl mb-8">Build Your Own or Choose From Favorites</p>
        <Link href="/order" className="bg-white text-red-600 px-12 py-6 rounded-full text-3xl font-bold hover:bg-gray-100">
          Order Online
        </Link>
      </section>

      {/* Category Tabs — like Domino's menu tabs */}
      <div className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center space-x-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`text-2xl font-bold py-4 px-6 rounded-full transition ${
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

      {/* Product Cards — like Domino's menu grid */}
      <section className="py-12 bg-red-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {categoryItems.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="h-64 bg-gray-300 border-b" />
                <div className="p-6">
                  <h3 className="text-3xl font-bold mb-2">{item.name}</h3>
                  <p className="text-xl text-gray-600 mb-4">{item.category}</p>
                  <p className="text-5xl font-bold text-red-600 mb-6">€{item.price}</p>
                  <button onClick={() => setSelectedItem(item)} className="w-full bg-red-600 text-white py-4 rounded-full text-xl font-bold hover:bg-red-700">
                    Customize
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Build Your Own Modal — like Domino's customization */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
            <h2 className="text-4xl font-bold mb-6 text-center">Build {selectedItem.name}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4">Size</h3>
                <div className="grid grid-cols-3 gap-4">
                  {sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => updateSize(size)}
                      className={`p-4 rounded-full border-2 ${
                        customPizza.size === size ? 'border-red-600 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      {size.name}<br/>€{size.price}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Toppings</h3>
                <div className="space-y-3">
                  {toppings.map((topping) => (
                    <button
                      key={topping.name}
                      onClick={() => toggleTopping(topping.name)}
                      className={`w-full p-4 rounded-full border-2 ${
                        customPizza.toppings.includes(topping.name) ? 'border-red-600 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      {topping.name} +€{topping.price}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-5xl font-bold text-center text-red-600 mb-6">Total: €{customPizza.price.toFixed(2)}</p>
              <button className="w-full bg-red-600 text-white py-6 rounded-full text-2xl font-bold hover:bg-red-700">
                Add to Cart
              </button>
              <button onClick={() => setSelectedItem(null)} className="w-full text-gray-600 py-4 text-xl">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-red-600 text-white py-12 text-center">
        <p className="text-2xl">© 2025 Rusticana Pizza • All rights reserved</p>
      </footer>
    </div>
  );
}
