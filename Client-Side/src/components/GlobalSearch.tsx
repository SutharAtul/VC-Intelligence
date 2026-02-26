import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Command } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { mockCompanies } from '@/data/mockCompanies';

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const results = query.length >= 2
    ? mockCompanies.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.sector.toLowerCase().includes(query.toLowerCase()) ||
        c.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6)
    : [];

  const handleSelect = useCallback((id: string) => {
    setQuery('');
    setIsOpen(false);
    navigate(`/companies/${id}`);
  }, [navigate]);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={e => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="Search companies, sectors, tags..."
          className="pl-9 pr-12 h-9 bg-secondary border-border text-sm"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg border border-border bg-popover shadow-elevated overflow-hidden animate-fade-in">
          {results.map(c => (
            <button
              key={c.id}
              onMouseDown={() => handleSelect(c.id)}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm hover:bg-accent transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-xs font-semibold text-secondary-foreground">
                {c.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-popover-foreground truncate">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.sector} · {c.stage}</p>
              </div>
              <span className={`text-xs font-mono font-medium ${c.score >= 80 ? 'text-score-high' : c.score >= 60 ? 'text-score-medium' : 'text-score-low'}`}>
                {c.score}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
