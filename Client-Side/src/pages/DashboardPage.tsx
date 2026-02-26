import { useNavigate } from 'react-router-dom';
import { AppShell } from '@/components/AppShell';
import { ScoreBadge } from '@/components/ScoreBadge';
import { mockCompanies } from '@/data/mockCompanies';
import { useAppStore } from '@/store/useAppStore';
import { Badge } from '@/components/ui/badge';
import { Building2, TrendingUp, List, Bookmark, ArrowRight, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { lists, savedSearches, savedCompanyIds } = useAppStore();

  const topCompanies = [...mockCompanies].sort((a, b) => b.score - a.score).slice(0, 5);
  const recentSignals = mockCompanies
    .flatMap(c => c.signals.map(s => ({ ...s, companyName: c.name, companyId: c.id })))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  return (
    <AppShell title="Dashboard">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Companies', value: mockCompanies.length, icon: Building2, color: 'text-primary' },
            { label: 'High Score (80+)', value: mockCompanies.filter(c => c.score >= 80).length, icon: TrendingUp, color: 'text-score-high' },
            { label: 'Lists', value: lists.length, icon: List, color: 'text-score-medium' },
            { label: 'Saved', value: savedCompanyIds.length, icon: Bookmark, color: 'text-primary' },
          ].map(stat => (
            <div key={stat.label} className="rounded-lg border border-border bg-card p-4 shadow-card">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top companies */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> Top Scored Companies
              </h2>
              <button onClick={() => navigate('/companies')} className="text-xs text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <div className="space-y-1">
              {topCompanies.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => navigate(`/companies/${c.id}`)}
                  className="flex items-center w-full gap-3 rounded-md px-3 py-2.5 hover:bg-accent/50 transition-colors text-left"
                >
                  <span className="text-xs font-mono text-muted-foreground w-4">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground">{c.name}</span>
                    <p className="text-xs text-muted-foreground">{c.sector} · {c.stage}</p>
                  </div>
                  <ScoreBadge score={c.score} />
                </button>
              ))}
            </div>
          </div>

          {/* Recent signals */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-card">
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" /> Recent Signals
            </h2>
            <div className="space-y-1">
              {recentSignals.map(s => (
                <button
                  key={s.id}
                  onClick={() => navigate(`/companies/${s.companyId}`)}
                  className="flex items-center w-full gap-3 rounded-md px-3 py-2.5 hover:bg-accent/50 transition-colors text-left"
                >
                  <Badge variant="outline" className="text-[10px] shrink-0 w-16 justify-center">{s.type}</Badge>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground">{s.title}</span>
                    <p className="text-xs text-muted-foreground">{s.companyName}</p>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground shrink-0">{s.date}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
