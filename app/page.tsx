'use client';

import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

const supabase = createClient(
  'https://lbpeeqwgxmzyplndivmj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicGVlcXdneG16eXBsbmRpdm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMTg0MzcsImV4cCI6MjA3OTU5NDQzN30.Rgu0c2ykFT3zckYpeMNWRQrFXmXr434IRMulUVxF9r0'
);

export default function Kiosk() {
  const [step, setStep] = useState(1);  // 1: Size/Crust, 2: Sauce, 3: Toppings, 4: Review
  const [pizza, setPizza] = useState({ size: '', crust: '', sauce: '', toppings: [], price: 0 });
  const [cart, setCart] = useState([]);

  // Load toppings from Supabase
  const [toppings, setToppings] = useState([]);

  // Fetch toppings on load
  supabase.from('toppings').select('*').then(({ data }) => setToppings(data || []));

  const addToCart = () => {
    setCart([...cart, pizza]);
    setPizza({ size: '', crust: '', sauce: '', toppings: [], price: 0 });
    setStep(1);
  };

  const updatePizza = (key, value) => {
    setPizza({ ...pizza, [key]: value });
  };

  const toggleTopping = (topping) => {
    const newToppings = pizza.toppings.includes(topping) 
      ? pizza.toppings.filter(t => t !== topping) 
      : [...pizza.toppings, topping];
    setPizza({ ...pizza, toppings: newToppings });
  };

  // Calculate price
  const totalPrice = pizza.size ? parseFloat(pizza.size.price || 0) + pizza.toppings.reduce((sum, t) => sum + (t.price || 0), 0) : 0;

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      {/* Header */}
      <header className="bg-red-600 text-white p-6 text-center">
        <h1 className="text-6xl font-bold">Rusticana Kiosk</h1>
        <p className="text-2xl mt-2">Build Your Pizza</p>
      </header>

      {/* Steps Progress */}
      <div className="bg-white p-4 flex justify-around border-b">
        {[1,2,3,4].map(s => (
          <div key={s} className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${step === s ? 'bg-red-600 text-white' : 'bg-gray-200'}`}>
            {s}
          </div>
        ))}
      </div>

      {/* Step 1: Size & Crust */}
      {step === 1 && (
        <div className="flex-1 p-6 grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          <h2 className="col-span-2 text-4xl font-bold text-center mb-8">Choose Size & Crust</h2>
          {toppings.filter(t => t.type === 'size').map(t => (
            <button key={t.id} onClick={() => updatePizza('size', t)} className={`p-8 rounded-2xl border-4 ${pizza.size === t ? 'border-red-600 bg-red-50' : 'border-gray-300'}`}>
              <h3 className="text-3xl font-bold">{t.name}</h3>
              <p className="text-4xl">€{t.price}</p>
            </button>
          ))}
          {toppings.filter(t => t.type === 'crust').map(t => (
            <button key={t.id} onClick={() => updatePizza('crust', t)} className={`p-8 rounded-2xl border-4 ${pizza.crust === t ? 'border-red-600 bg-red-50' : 'border-gray-300'}`}>
              <h3 className="text-3xl font-bold">{t.name}</h3>
            </button>
          ))}
          <button onClick={() => setStep(2)} className="col-span-2 bg-red-600 text-white text-3xl py-8 rounded-2xl font-bold">Next: Sauce</button>
        </div>
      )}

      {/* Step 2: Sauce */}
      {step === 2 && (
        <div className="flex-1 p-6 grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          <h2 className="col-span-2 text-4xl font-bold text-center mb-8">Choose Sauce</h2>
          {toppings.filter(t => t.type === 'sauce').map(t => (
            <button key={t.id} onClick={() => updatePizza('sauce', t)} className={`p-8 rounded-2xl border-4 ${pizza.sauce === t ? 'border-red-600 bg-red-50' : 'border-gray-300'}`}>
              <h3 className="text-3xl font-bold">{t.name}</h3>
            </button>
          ))}
          <button onClick={() => setStep(3)} className="col-span-2 bg-red-600 text-white text-3xl py-8 rounded-2xl font-bold">Next: Toppings</button>
        </div>
      )}

      {/* Step 3: Toppings */}
      {step === 3 && (
        <div className="flex-1 p-6 grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          <h2 className="col-span-2 text-4xl font-bold text-center mb-8">Add Toppings</h2>
          {toppings.filter(t => t.type === 'topping').map(t => (
            <button key={t.id} onClick={() => toggleTopping(t)} className={`p-8 rounded-2xl border-4 ${pizza.toppings.includes(t) ? 'border-red-600 bg-red-50' : 'border-gray-300'}`}>
              <h3 className="text-3xl font-bold">{t.name}</h3>
              <p className="text-4xl">€{t.price}</p>
            </button>
          ))}
          <button onClick={() => setStep(4)} className="col-span-2 bg-red-600 text-white text-3xl py-8 rounded-2xl font-bold">Review Order</button>
        </div>
      )}

      {/* Step 4: Review */}
      {step === 4 && (
        <div className="flex-1 p-6 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Your Pizza</h2>
          <div className="bg-white rounded-2xl p-8 mb-8">
            <p className="text-3xl font-bold mb-4">Size: {pizza.size.name}</p>
            <p className="text-3xl font-bold mb-4">Crust: {pizza.crust.name}</p>
            <p className="text-3xl font-bold mb-4">Sauce: {pizza.sauce.name}</p>
            <p className="text-3xl font-bold mb-4">Toppings: {pizza.toppings.map(t => t.name).join(', ') || 'None'}</p>
            <p className="text-6xl font-bold text-red-600 text-center mt-8">Total: €{totalPrice.toFixed(2)}</p>
          </div>
          <button onClick={addToCart} className="w-full bg-red-600 text-white text-3xl py-8 rounded-2xl font-bold">Add to Cart (€{totalPrice.toFixed(2)})</button>
          <button onClick={() => setStep(1)} className="w-full bg-gray-500 text-white text-3xl py-8 rounded-2xl font-bold mt-4">Start Over</button>
        </div>
      )}

      {/* Floating Cart */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-600 text-white rounded-2xl px-8 py-6 shadow-2xl">
          <p className="text-2xl font-bold">Cart: {cart.length} items</p>
          <p className="text-3xl">Total: €{cart.reduce((sum, p) => sum + p.price, 0).toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
