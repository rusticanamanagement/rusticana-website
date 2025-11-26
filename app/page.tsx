import MenuClient from './MenuClient';

export const dynamic = 'force-dynamic';   // ← THIS LINE KILLS PRERENDERING
export const revalidate = 0;              // ← AND THIS ONE TOO

export default function Home() {
  return <MenuClient />;
}
