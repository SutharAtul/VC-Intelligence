import { Badge } from '@/components/ui/badge';

interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md';
}

export function ScoreBadge({ score, size = 'sm' }: ScoreBadgeProps) {
  const cls = score >= 80
    ? 'bg-score-high text-score-high'
    : score >= 60
    ? 'bg-score-medium text-score-medium'
    : 'bg-score-low text-score-low';

  return (
    <span className={`inline-flex items-center justify-center rounded-md font-mono font-semibold ${cls} ${size === 'md' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs'}`}>
      {score}
    </span>
  );
}
