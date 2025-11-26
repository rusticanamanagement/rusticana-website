'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabase = createClient(
  'https://lbpeeqwgxmzyplndivmj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicGVlcXdneG16eXBsbmRpdm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMTg0MzcsImV4cCI6MjA3OTU5NDQzN30.Rgu0c2ykFT3zckYpeMNWRQrFXmXr434IRMulUVxF9r0'
);

interface Topping {
  id: number;
  name: string;
  type: string;
  price: number;
}

interface Pizza {
  size: Topping | null;
  crust: Topping | null;
  sauce: Topping | null;
  toppings: Topping[];
}

export default function Kiosk() {
  const [step, setStep] = useState(1);
  const [pizza, setPizza] = useState<Pizza>({ size: null, crust: null, sauce: null, toppings: [] });
  const [cart, setCart] = useState<any[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);

  // Load toppings from Supabase
  useEffect(() => {
    supabase
      .from('toppings')
      .select('*')
      .then(({ data }) => {
        if (data) setToppings(data as Topping[]);
      });
  }, []);

  const updatePizza = (key: keyof Pizza, value: any) => {
    setPizza(prev => ({ ...prev, [key]: value }));
  };

  const toggleTopping = (topping: Topping) => {
    setPizza(prev => ({
      ...prev,
      toppings: prev.toppings.includes(topping)
        ? prev.toppings.filter(t => t.id !== topping.id)
        : [...prev.toppings, topping]
    }));
  };

  const addToCart = () => {
    if (!pizza.size) return;
    const totalPrice = (pizza.size.price || 0) + pizza.toppings.reduce((sum, t) => sum + t.price, 0);
    setCart(prev => [...prev, { ...pizza, totalPrice }]);
    setPizza({ size: null, crust: null, sauce: null, toppings: [] });
    setStep(1);
  };

  const totalPrice = pizza.size ? (pizza.size.price || 0) + pizza.toppings.reduce((sum, t) => sum + t.price, 0) : 0;

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <header className="bg-amber-900 text-white p-8 text-center">
        <h1 className="text-7xl font-bold">RUSTICANA</h1>
        <p className="text-3xl mt-4">Build Your Perfect Pizza</p>
      </header>

      <div className="bg-white p-4 flex justify-around">
        {[1,2,3,4].map(s => (
          <div key={s} className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${step === s ? 'bg-amber-900 text-white' : 'bg-gray-300'}`}>
            {s}
          </div>
        ))}
      </div>

      {/* Step 1: Size & Crust */}
      {step === 1 && (
        <div className="flex-1 p-8 grid grid-cols-2 gap-8 max-w-5xl mx-auto">
          <h2 className="col-span-2 text-5xl font-bold text-center mb-8">Choose Size & Crust</h2>
          {toppings.filter(t => t.type === 'size').map(t => (
            <button key={t.id} onClick={() => updatePizza('size', t)}
              className={`p-12 rounded-3xl border-8 text-4xl font-bold ${pizza.size?.id === t.id ? 'border-amber-900 bg-amber-100' : 'border-gray-300 bg-white'}`}>
              {t.name}<br/>€{t.price}
            </button>
          ))}
          {toppings.filter(t => t.type === 'crust').map(t => (
            <button key={t.id} onClick={() => updatePizza('crust', t)}
              className={`p-12 rounded-3xl border-8 text-4xl font-bold ${pizza.crust?.id === t.id ? 'border-amber-900 bg-amber-100' : 'border-gray-300 bg-white'}`}>
              {t.name}
            </button>
          ))}
          <button onClick={() => setStep(2)} disabled={!pizza.size || !pizza.crust}
            className="col-span-2 bg-amber-900 text-white text-5xl py-12 rounded-3xl font-bold disabled:opacity-50">
            Next → Sauce
          </button>
        </div>
      )}

      {/* Step 2: Sauce */}
      {step === 2 && (
        <div className="flex-1 p-8 grid grid-cols-2 gap-8 max-w-5xl mx-auto">
          <h2 className="col-span-2 text-5xl font-bold text-center mb-8">Choose Sauce</h2>
          {toppings.filter(t => t.type === 'sauce').map(t => (
            <button key={t.id} onClick={() => updatePizza('sauce', t)}
              className={`p-12 rounded-3xl border-8 text-4xl font-bold ${pizza.sauce?.id === t.id ? 'border-amber-900 bg-amber-100' : 'border-gray-300 bg-white'}`}>
              {t.name}
            </button>
          ))}
          <button onClick={() => setStep(3)} disabled={!pizza.sauce}
            className="col-span-2 bg-amber-900 text-white text-5xl py-12 rounded-3xl font-bold disabled:opacity-50">
            Next → Toppings
          </button>
        </div>
      )}

      {/* Step 3: Toppings */}
      {step === 3 && (
        <div className="flex-1 p-8 grid grid-cols-3 gap-8 max-w-6xl mx-auto overflow-y-auto">
          <h2 className="col-span-3 text-5xl font-bold text-center mb-8">Add Toppings</h2>
          {toppings.filter(t => t.type === 'topping').map(t => (
            <button key={t.id} onClick={() => toggleTopping(t)}
              className={`p-12 rounded-3xl border-8 text-4xl font-bold ${pizza.toppings.some(top => top.id === t.id) ? 'border-amber-900 bg-amber-100' : 'border-gray-300 bg-white'}`}>
              {t.name}<br/>+€{t.price}
            </button>
          ))}
          <button onClick={() => setStep(4)}
            className="col-span-3 bg-amber-900 text-white text-5xl py-12 rounded-3xl font-bold">
            Review Order → €{totalPrice.toFixed(2)}
          </button>
        </div>
      )}

      {/* Step 4: Review & Add */}
      {step === 4 && (
        <div className="flex-1 p-8 max-w-4xl mx-auto">
          <h2 className="text-6xl font-bold text-center mb-12">Your Pizza</h2>
          <div className="bg-white rounded-3xl p-12 text-4xl space-y-6">
            <p><strong>Size:</strong> {pizza.size?.name}</p>
            <p><strong>Crust:</strong> {pizza.crust?.name}</p>
            <p><strong>Sauce:</strong> {pizza.sauce?.name}</p>
            <p><strong>Toppings:</strong> {pizza.toppings.map(t => t.name).join(', ') || 'None'}</p>
            <p className="text-7xl font-bold text-amber-900 text-center mt-12">
              €{totalPrice.toFixed(2)}
            </p>
          </div>
          <button onClick={addToCart}
            className="w-full bg-green-600 text-white text-6xl py-16 rounded-3xl font-bold mt-12">
            Add to Cart
          </button>
        </div>
      )}

      {/* Floating Cart */}
      {cart.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-amber-900 text-white rounded-3xl px-16 py-8 shadow-2xl">
          <p className="text-5xl font-bold">Cart: {cart.length} items</p>
        </div>
      )}
    </div>
  );
}
