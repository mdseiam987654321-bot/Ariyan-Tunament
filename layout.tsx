
import MobileDock from '@/app/components/MobileDock';
import { Bell, Wallet } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="sticky top-0 z-40 w-full glass-morphism border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="font-headline text-xl font-bold tracking-tighter">
            ARIYAN <span className="text-primary italic">ELITE</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/rewards" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Wallet className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold">1,250</span>
            </Link>
            <button className="p-2 rounded-full hover:bg-white/5 text-muted-foreground relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-6">
        {children}
      </main>

      <MobileDock />
    </div>
  );
}
