import { Signal } from '@/types';
import { IndianRupee, Users, Rocket, Newspaper, User, Handshake } from 'lucide-react';

const signalIcons: Record<Signal['type'], typeof IndianRupee> = {
  funding: IndianRupee,
  hiring: Users,
  product: Rocket,
  press: Newspaper,
  founder: User,
  partnership: Handshake,
};

const signalColors: Record<Signal['type'], string> = {
  funding: 'text-score-high bg-score-high',
  hiring: 'text-primary bg-primary/15',
  product: 'text-score-medium bg-score-medium',
  press: 'text-muted-foreground bg-muted',
  founder: 'text-score-medium bg-score-medium',
  partnership: 'text-primary bg-primary/15',
};

export function SignalBadge({ signal }: { signal: Signal }) {
  const Icon = signalIcons[signal.type];
  const colors = signalColors[signal.type];

  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${colors}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{signal.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{signal.description}</p>
      </div>
      <span className="text-xs text-muted-foreground font-mono shrink-0">{signal.date}</span>
    </div>
  );
}
