import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '@/components/AppShell';
import { useAppStore } from '@/store/useAppStore';
import { mockCompanies } from '@/data/mockCompanies';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose
} from '@/components/ui/dialog';
import { Plus, Trash2, Download, List, ExternalLink } from 'lucide-react';

export default function ListsPage() {
  const navigate = useNavigate();
  const { lists, createList, deleteList, removeFromList } = useAppStore();
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreate = () => {
    if (!newName.trim()) return;
    createList(newName.trim(), newDesc.trim());
    setNewName('');
    setNewDesc('');
  };

  const exportList = (listId: string, format: 'csv' | 'json') => {
    const list = lists.find(l => l.id === listId);
    if (!list) return;
    const companies = list.companyIds.map(id => mockCompanies.find(c => c.id === id)).filter(Boolean);

    let content: string;
    let mime: string;
    let ext: string;

    if (format === 'json') {
      content = JSON.stringify(companies, null, 2);
      mime = 'application/json';
      ext = 'json';
    } else {
      const headers = ['Name', 'Domain', 'Sector', 'Stage', 'Score', 'Funding'];
      const rows = companies.map(c => [c!.name, c!.domain, c!.sector, c!.stage, c!.score, c!.totalFunding].join(','));
      content = [headers.join(','), ...rows].join('\n');
      mime = 'text/csv';
      ext = 'csv';
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${list.name}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell title="Lists">
      <div className="space-y-6">
        {/* Create list */}
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New List</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create New List</DialogTitle></DialogHeader>
            <div className="space-y-3 py-2">
              <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="List name" />
              <Textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Description (optional)" className="min-h-[60px] resize-none" />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleCreate} disabled={!newName.trim()}>Create</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Lists */}
        {lists.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center shadow-card">
            <List className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No lists yet. Create one to start organizing companies.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {lists.map(list => {
              const companies = list.companyIds.map(id => mockCompanies.find(c => c.id === id)).filter(Boolean);
              return (
                <div key={list.id} className="rounded-lg border border-border bg-card p-5 shadow-card">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{list.name}</h3>
                      {list.description && <p className="text-xs text-muted-foreground mt-0.5">{list.description}</p>}
                      <p className="text-xs text-muted-foreground mt-1">{companies.length} companies · Updated {new Date(list.updatedAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => exportList(list.id, 'csv')} className="h-8 gap-1 text-xs">
                        <Download className="h-3.5 w-3.5" /> CSV
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => exportList(list.id, 'json')} className="h-8 gap-1 text-xs">
                        <Download className="h-3.5 w-3.5" /> JSON
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteList(list.id)} className="h-8 text-destructive hover:text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  {companies.length > 0 ? (
                    <div className="space-y-1">
                      {companies.map(c => (
                        <div key={c!.id} className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-accent/50 transition-colors">
                          <button onClick={() => navigate(`/companies/${c!.id}`)} className="flex items-center gap-2 text-left">
                            <span className="text-sm font-medium text-foreground">{c!.name}</span>
                            <Badge variant="secondary" className="text-[10px]">{c!.sector}</Badge>
                          </button>
                          <button onClick={() => removeFromList(list.id, c!.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">No companies in this list yet.</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
