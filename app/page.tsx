import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase env vars');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function Home() {
  let items = [];

  try {
    const { data } = await supabase
      .from('menu_items')
      .select('*')
      .eq('available', true)
      .order('category');
    
    items = data || [];
  } catch (error) {
    console.error('Supabase fetch error:', error);
    // Fallback: empty menu during build if DB issue
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-20">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h1 className="text-7xl font-bold text-amber-900 mb-16">Rusticána</h1>
        {items.length === 0 ? (
          <p className="text-xl text-gray-600">Menu loading...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-12">
            {items.map((item: any) => (
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