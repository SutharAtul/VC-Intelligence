import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppShell } from '@/components/AppShell';
import { ScoreBadge } from '@/components/ScoreBadge';
import { SignalBadge } from '@/components/SignalBadge';
import { mockCompanies } from '@/data/mockCompanies';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ArrowLeft, Globe, MapPin, Calendar, Users, IndianRupee,
  Bookmark, BookmarkCheck, Sparkles, Loader2, ExternalLink,
  Plus, Trash2, Send
} from 'lucide-react';
import { EnrichmentData } from '@/types';

export default function CompanyProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const company = mockCompanies.find(c => c.id === id);

  const {
    savedCompanyIds, toggleSavedCompany,
    notes, addNote, deleteNote,
    lists, addToList,
    enrichmentCache, setEnrichment,
  } = useAppStore();

  const [noteText, setNoteText] = useState('');
  const [enriching, setEnriching] = useState(false);
  const [selectedList, setSelectedList] = useState('');

  if (!company) {
    return (
      <AppShell title="Company Not Found">
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-muted-foreground">Company not found.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate('/companies')}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Companies
          </Button>
        </div>
      </AppShell>
    );
  }

  const isSaved = savedCompanyIds.includes(company.id);
  const companyNotes = notes.filter(n => n.companyId === company.id);
  const enrichment = enrichmentCache[company.id];

  const handleEnrich = async () => {
  try {
    setEnriching(true);

    const response = await fetch("http://localhost:5000/api/enrich", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        website: company.website
      })
    });

    const data = await response.json();

    if (!data.success) {
      alert("Enrichment failed");
      return;
    }

    const backendData = data.data;

    // Map backend structure → your frontend EnrichmentData type
    const formattedEnrichment: EnrichmentData = {
      summary: backendData.summary,
      whatTheyDo: backendData.what_the_company_does,
      keywords: backendData.keywords,
      derivedSignals: backendData.derived_signals,
      sources: [
        { url: company.website, scrapedAt: new Date().toISOString() }
      ],
      enrichedAt: new Date().toISOString()
    };

    setEnrichment(company.id, formattedEnrichment);

  } catch (error) {
    console.error(error);
    alert("Server error");
  } finally {
    setEnriching(false);
  }
};

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    addNote(company.id, noteText.trim());
    setNoteText('');
  };

  const handleAddToList = () => {
    if (!selectedList) return;
    addToList(selectedList, company.id);
    setSelectedList('');
  };

  return (
    <AppShell>
      {/* Back button */}
      <button
        onClick={() => navigate('/companies')}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Companies
      </button>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-xl font-bold text-secondary-foreground">
            {company.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">{company.name}</h1>
              <ScoreBadge score={company.score} size="md" />
            </div>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">{company.description}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" />{company.domain}</span>
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{company.location}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />Founded {company.founded}</span>
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{company.employees}</span>
              <span className="flex items-center gap-1"><IndianRupee className="h-3.5 w-3.5" />{company.totalFunding}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => toggleSavedCompany(company.id)}>
            {isSaved ? <BookmarkCheck className="h-4 w-4 mr-1.5 text-primary" /> : <Bookmark className="h-4 w-4 mr-1.5" />}
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          <Button size="sm" onClick={handleEnrich} disabled={enriching} className="gap-1.5">
            {enriching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {enriching ? 'Enriching...' : enrichment ? 'Re-enrich' : 'Enrich'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {company.tags.map(t => (
              <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
            ))}
          </div>

          {/* Enrichment results */}
          {enrichment && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-4 animate-fade-in">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Enrichment Results</h3>
                <span className="text-[10px] font-mono text-muted-foreground ml-auto">
                  {new Date(enrichment.enrichedAt).toLocaleString()}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Summary</h4>
                <p className="text-sm text-foreground">{enrichment.summary}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">What They Do</h4>
                <ul className="space-y-1">
                  {enrichment.whatTheyDo.map((item, i) => (
                    <li key={i} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>{item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Keywords</h4>
                <div className="flex flex-wrap gap-1">
                  {enrichment.keywords.map(k => (
                    <Badge key={k} variant="outline" className="text-[10px]">{k}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Derived Signals</h4>
                <ul className="space-y-1">
                  {enrichment.derivedSignals.map((s, i) => (
                    <li key={i} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-score-high mt-1">→</span>{s}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Sources</h4>
                <div className="space-y-1">
                  {enrichment.sources.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      <span className="text-primary">{s.url}</span>
                      <span className="text-muted-foreground font-mono">{new Date(s.scrapedAt).toLocaleTimeString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Signals */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-card">
            <h3 className="text-sm font-semibold text-foreground mb-3">Signals Timeline</h3>
            <div>
              {company.signals.length > 0
                ? company.signals.map(s => <SignalBadge key={s.id} signal={s} />)
                : <p className="text-sm text-muted-foreground">No signals yet.</p>
              }
            </div>
          </div>

          {/* Investors */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-card">
            <h3 className="text-sm font-semibold text-foreground mb-3">Investors</h3>
            <div className="flex flex-wrap gap-2">
              {company.investors.map(inv => (
                <Badge key={inv} variant="secondary" className="text-xs">{inv}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - Actions */}
        <div className="space-y-6">
          {/* Add to List */}
          <div className="rounded-lg border border-border bg-card p-4 shadow-card">
            <h3 className="text-sm font-semibold text-foreground mb-3">Add to List</h3>
            {lists.length > 0 ? (
              <div className="flex gap-2">
                <Select value={selectedList} onValueChange={setSelectedList}>
                  <SelectTrigger className="flex-1 h-9">
                    <SelectValue placeholder="Select a list" />
                  </SelectTrigger>
                  <SelectContent>
                    {lists.map(l => (
                      <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button size="sm" onClick={handleAddToList} disabled={!selectedList} className="h-9">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No lists yet. Create one from the Lists page.</p>
            )}
          </div>

          {/* Notes */}
          <div className="rounded-lg border border-border bg-card p-4 shadow-card">
            <h3 className="text-sm font-semibold text-foreground mb-3">Notes</h3>
            <div className="space-y-2 mb-3">
              {companyNotes.length > 0
                ? companyNotes.map(n => (
                    <div key={n.id} className="flex items-start justify-between gap-2 rounded-md bg-muted p-2.5">
                      <div>
                        <p className="text-xs text-foreground">{n.content}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                      </div>
                      <button onClick={() => deleteNote(n.id)} className="text-muted-foreground hover:text-destructive transition-colors shrink-0">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))
                : <p className="text-xs text-muted-foreground">No notes yet.</p>
              }
            </div>
            <div className="flex gap-2">
              <Textarea
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder="Add a note..."
                className="text-xs min-h-[60px] resize-none"
              />
            </div>
            <Button size="sm" onClick={handleAddNote} disabled={!noteText.trim()} className="mt-2 w-full gap-1.5">
              <Send className="h-3.5 w-3.5" /> Add Note
            </Button>
          </div>

          {/* Quick Info */}
          <div className="rounded-lg border border-border bg-card p-4 shadow-card">
            <h3 className="text-sm font-semibold text-foreground mb-3">Details</h3>
            <dl className="space-y-2 text-xs">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Last Round</dt>
                <dd className="font-medium text-foreground">{company.lastRound}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Last Round Date</dt>
                <dd className="font-medium text-foreground font-mono">{company.lastRoundDate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Employees</dt>
                <dd className="font-medium text-foreground">{company.employees}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Location</dt>
                <dd className="font-medium text-foreground">{company.location}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Website</dt>
                <dd>
                  <a href={company.website} target="_blank" rel="noopener" className="text-primary hover:underline flex items-center gap-1">
                    {company.domain} <ExternalLink className="h-3 w-3" />
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
