import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppShell } from '@/components/AppShell';
import { ScoreBadge } from '@/components/ScoreBadge';
import { mockCompanies, sectors, stages } from '@/data/mockCompanies';
import { useAppStore } from '@/store/useAppStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, Save } from 'lucide-react';
import { SearchFilters } from '@/types';

type SortKey = 'name' | 'score' | 'stage' | 'sector' | 'founded';
type SortDir = 'asc' | 'desc';

const PAGE_SIZE = 10;

export default function CompaniesPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [sectorFilter, setSectorFilter] = useState(searchParams.get('sector') || 'all');
  const [stageFilter, setStageFilter] = useState(searchParams.get('stage') || 'all');
  const [sortKey, setSortKey] = useState<SortKey>('score');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(1);

  const { savedCompanyIds, toggleSavedCompany, saveSearch } = useAppStore();

  const filtered = useMemo(() => {
    let result = mockCompanies;
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (sectorFilter !== 'all') result = result.filter(c => c.sector === sectorFilter);
    if (stageFilter !== 'all') result = result.filter(c => c.stage === stageFilter);

    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortKey === 'score') cmp = a.score - b.score;
      else if (sortKey === 'founded') cmp = a.founded - b.founded;
      else if (sortKey === 'sector') cmp = a.sector.localeCompare(b.sector);
      else if (sortKey === 'stage') cmp = a.stage.localeCompare(b.stage);
      return sortDir === 'desc' ? -cmp : cmp;
    });

    return result;
  }, [query, sectorFilter, stageFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const handleSaveSearch = () => {
    if (!query && sectorFilter === 'all' && stageFilter === 'all') return;
    const filters: SearchFilters = {};
    if (sectorFilter !== 'all') filters.sector = sectorFilter;
    if (stageFilter !== 'all') filters.stage = stageFilter;
    saveSearch({ name: query || `${sectorFilter} - ${stageFilter}`, query, filters });
  };

  const SortHeader = ({ label, field }: { label: string; field: SortKey }) => (
    <button onClick={() => handleSort(field)} className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
      {label}
      <ArrowUpDown className={`h-3 w-3 ${sortKey === field ? 'text-primary' : ''}`} />
    </button>
  );

  return (
    <AppShell title="Companies">
      <div className="space-y-4">
        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={e => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search companies..."
              className="pl-9 h-9 bg-card border-border"
            />
          </div>
          <Select value={sectorFilter} onValueChange={v => { setSectorFilter(v); setPage(1); }}>
            <SelectTrigger className="w-[160px] h-9 bg-card">
              <SelectValue placeholder="All Sectors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              {sectors.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={stageFilter} onValueChange={v => { setStageFilter(v); setPage(1); }}>
            <SelectTrigger className="w-[140px] h-9 bg-card">
              <SelectValue placeholder="All Stages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              {stages.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleSaveSearch} className="h-9 gap-1.5">
            <Save className="h-3.5 w-3.5" /> Save Search
          </Button>
          <span className="text-xs text-muted-foreground ml-auto">
            {filtered.length} companies
          </span>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-border bg-card shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left w-8"></th>
                  <th className="px-4 py-3 text-left"><SortHeader label="Company" field="name" /></th>
                  <th className="px-4 py-3 text-left"><SortHeader label="Sector" field="sector" /></th>
                  <th className="px-4 py-3 text-left"><SortHeader label="Stage" field="stage" /></th>
                  <th className="px-4 py-3 text-left"><SortHeader label="Founded" field="founded" /></th>
                  <th className="px-4 py-3 text-left">Funding</th>
                  <th className="px-4 py-3 text-center"><SortHeader label="Score" field="score" /></th>
                  <th className="px-4 py-3 text-left">Tags</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map(c => (
                  <tr
                    key={c.id}
                    onClick={() => navigate(`/companies/${c.id}`)}
                    className="border-b border-border last:border-0 hover:bg-accent/50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3">
                      <button
                        onClick={e => { e.stopPropagation(); toggleSavedCompany(c.id); }}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {savedCompanyIds.includes(c.id)
                          ? <BookmarkCheck className="h-4 w-4 text-primary" />
                          : <Bookmark className="h-4 w-4" />
                        }
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <span className="font-medium text-foreground">{c.name}</span>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[280px]">{c.description}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{c.sector}</td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="text-xs font-medium">{c.stage}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{c.founded}</td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{c.totalFunding}</td>
                    <td className="px-4 py-3 text-center"><ScoreBadge score={c.score} /></td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {c.tags.slice(0, 2).map(t => (
                          <Badge key={t} variant="outline" className="text-[10px] font-normal">{t}</Badge>
                        ))}
                        {c.tags.length > 2 && (
                          <span className="text-[10px] text-muted-foreground">+{c.tags.length - 2}</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
              <span className="text-xs text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
