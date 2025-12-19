
import React from 'react';
import { AppState, DailyEntry, Screen } from '../types';
import { Card, Button, TextArea } from '../components/UI';
import { getPromptForDate, MOODS } from '../constants';
import { Lock, ArrowLeft, ShieldCheck, Zap, BookOpen, MessageSquare } from 'lucide-react';

interface Props {
  state: AppState;
  onUpdateEntry: (date: string, data: Partial<DailyEntry>) => void;
  onNavigate: (screen: Screen) => void;
}

export default function Journal({ state, onUpdateEntry, onNavigate }: Props) {
  const dateStr = state.currentDate;
  const entry = state.entries[dateStr] || { date: dateStr, todos: [], isLocked: false, rating: 5 };
  const dailyPrompt = getPromptForDate(dateStr);

  const handleLockDay = () => {
    if (!entry.rating) return alert("Seal your day with a Discipline Rating first.");
    onUpdateEntry(dateStr, { isLocked: true });
  };

  if (entry.isLocked) {
    return (
      <div className="flex flex-col h-[80vh] items-center justify-center p-6 text-center animate-fade-in">
        <div className="bg-emerald-500/10 p-12 rounded-[40px] border-2 border-emerald-500 shadow-2xl mb-8 transform rotate-3">
          <ShieldCheck className="w-24 h-24 text-emerald-500" />
        </div>
        <h2 className="text-4xl font-black text-white mb-2 tracking-tight uppercase">Day Sealed</h2>
        <div className="inline-block bg-gold-500 text-dark-bg px-6 py-2 rounded-full text-lg font-black mb-10 shadow-xl">DISCIPLINE: {entry.rating}/10</div>
        <Button variant="primary" className="w-full max-w-xs h-16 font-black uppercase tracking-widest rounded-2xl shadow-2xl" onClick={() => onNavigate('home')}>Return to Hub</Button>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in pb-40">
      <header className="flex justify-between items-center sticky top-0 bg-dark-bg/95 backdrop-blur-xl z-40 py-5 -mx-4 px-6 border-b border-dark-border">
        <button onClick={() => onNavigate('home')} className="p-2 -ml-2 text-dark-muted hover:text-white transition-all"><ArrowLeft size={24} /></button>
        <h2 className="text-xs font-black text-white uppercase tracking-[0.4em]">Tactical Journal</h2>
        <button onClick={handleLockDay} className="text-gold-500 p-2.5 bg-gold-500/10 rounded-2xl hover:bg-gold-500/20 transition-all border border-gold-500/20"><Lock size={20} /></button>
      </header>

      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-1 px-1"><Zap size={14} className="text-red-400" /><h3 className="text-[10px] text-dark-muted uppercase font-black tracking-[0.2em]">Discipline & Vibe</h3></div>
        <Card className="bg-zinc-950 border-gold-500/10 p-6 shadow-2xl relative">
          <label className="text-[10px] text-gold-500 font-black uppercase mb-8 block text-center tracking-[0.3em]">The Discipline Scale (1-10)</label>
          <div className="grid grid-cols-5 gap-3">
            {[1,2,3,4,5,6,7,8,9,10].map(num => (
              <button key={num} onClick={() => onUpdateEntry(dateStr, { rating: num })} className={`h-12 rounded-2xl text-sm font-black transition-all border ${entry.rating === num ? 'bg-gold-500 text-dark-bg border-gold-500 scale-110 shadow-lg' : 'bg-dark-bg border-dark-border text-dark-muted hover:border-gold-500/30'}`}>{num}</button>
            ))}
          </div>
        </Card>
        <div className="flex justify-between items-center px-4 bg-dark-card p-6 rounded-3xl border border-dark-border">
          {MOODS.map(m => (
            <button key={m.value} onClick={() => onUpdateEntry(dateStr, { mood: m.value })} className={`text-4xl transition-all ${entry.mood === m.value ? 'scale-150 opacity-100 shadow-xl' : 'opacity-20 grayscale'}`}>{m.label}</button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-1 px-1"><BookOpen size={14} className="text-blue-400" /><h3 className="text-[10px] text-dark-muted uppercase font-black tracking-[0.2em]">Awareness Log</h3></div>
        <Card className="bg-dark-card border-dark-border p-6">
            <div className="flex items-center gap-2 mb-4"><MessageSquare size={14} className="text-blue-400" /><p className="text-sm font-black text-white italic leading-relaxed">"{dailyPrompt}"</p></div>
            <TextArea placeholder="Write your truth here..." value={entry.promptAnswer || ''} onChange={e => onUpdateEntry(dateStr, { promptAnswer: e.target.value })} className="bg-zinc-900/50 border-dark-border rounded-2xl min-h-[140px]" />
        </Card>
      </section>

      <div className="fixed bottom-24 left-6 right-6 max-w-md mx-auto flex gap-4 z-40">
        <Button variant="secondary" className="flex-1 shadow-2xl h-16 font-black uppercase tracking-widest rounded-2xl" onClick={() => onNavigate('home')}>Exit Flow</Button>
        <Button className="flex-1 bg-gold-500 text-dark-bg font-black shadow-2xl h-16 uppercase tracking-widest rounded-2xl" onClick={handleLockDay}><Lock size={20} className="mr-1" /> Seal Pulse</Button>
      </div>
    </div>
  );
}
