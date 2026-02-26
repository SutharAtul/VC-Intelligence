import { useNavigate } from 'react-router-dom';
import { AppShell } from '@/components/AppShell';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Bookmark, Trash2, Search, Play } from 'lucide-react';

export default function SavedSearchesPage() {
  const navigate = useNavigate();
  const { savedSearches, deleteSavedSearch } = useAppStore();

  const handleRerun = (search: typeof savedSearches[0]) => {
    const params = new URLSearchParams();
    if (search.query) params.set('q', search.query);
    if (search.filters.sector) params.set('sector', search.filters.sector);
    if (search.filters.stage) params.set('stage', search.filters.stage);
    navigate(`/companies?${params.toString()}`);
  };

  return (
    <AppShell title="Saved Searches">
      <div className="space-y-4">
        {savedSearches.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center shadow-card">
            <Bookmark className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No saved searches yet. Save a search from the Companies page.</p>
          </div>
        ) : (
          savedSearches.map(search => (
            <div key={search.id} className="rounded-lg border border-border bg-card p-4 shadow-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{search.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {search.query && <span className="text-xs text-muted-foreground">Query: "{search.query}"</span>}
                    {search.filters.sector && <span className="text-xs text-muted-foreground">Sector: {search.filters.sector}</span>}
                    {search.filters.stage && <span className="text-xs text-muted-foreground">Stage: {search.filters.stage}</span>}
                    <span className="text-[10px] font-mono text-muted-foreground">{new Date(search.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" onClick={() => handleRerun(search)} className="h-8 gap-1 text-xs">
                  <Play className="h-3.5 w-3.5" /> Re-run
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deleteSavedSearch(search.id)} className="h-8 text-destructive hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </AppShell>
  );
}
