
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Trophy, Swords, BrainCircuit, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MobileDock() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', href: '/dashboard' },
    { icon: Trophy, label: 'Events', href: '/tournaments' },
    { icon: BrainCircuit, label: 'AI Strategy', href: '/ai-strategist' },
    { icon: Swords, label: 'Leaderboard', href: '/leaderboard' },
    { icon: User, label: 'Profile', href: '/profile' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <div className="glass-morphism rounded-full px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/50 ring-1 ring-white/10">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative p-2 transition-all duration-300 group",
                isActive ? "text-primary" : "text-muted-foreground hover:text-white"
              )}
            >
              <item.icon className={cn("w-6 h-6", isActive && "fill-current")} />
              {isActive && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary))]" />
              )}
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
