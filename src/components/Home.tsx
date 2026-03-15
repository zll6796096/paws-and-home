import React, { useState, useEffect } from 'react';
import { Bell, MapPin, PawPrint, Heart } from 'lucide-react';
import BottomNav from './BottomNav';

export default function Home({ onNavigate, showToast }: { onNavigate: (v: any, params?: any) => void, showToast: (m: string) => void }) {
  const [favs, setFavs] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<'cats' | 'dogs'>('cats');
  const [pets, setPets] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/pets')
      .then(res => res.json())
      .then(data => setPets(data || []))
      .catch(err => console.error('Error fetching pets:', err));
  }, []);

  const toggleFav = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const isFav = !favs[id];
    setFavs(prev => ({ ...prev, [id]: isFav }));
    showToast(isFav ? '已添加到收藏' : '已取消收藏');
  };

  const displayedPets = pets.filter(p => p.category === activeCategory && !p.applied);

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background-light pb-24">
      <header className="flex items-center p-4 justify-between sticky top-0 z-20 bg-background-light/90 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg flex items-center justify-center">
            <PawPrint className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Paws & Home</h1>
            <div className="flex items-center text-xs text-slate-500">
              <MapPin size={12} className="mr-1" />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>
        <button onClick={() => showToast('暂无新通知')} className="flex items-center justify-center p-2 rounded-full bg-slate-200 active:bg-slate-300 transition-colors">
          <Bell size={20} />
        </button>
      </header>

      <main className="flex-1">
        <div className="flex gap-3 px-4 py-3 overflow-x-auto no-scrollbar justify-center">
          <button
            onClick={() => setActiveCategory('cats')}
            className={`flex h-10 items-center justify-center gap-2 rounded-xl px-4 transition-colors ${activeCategory === 'cats' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-white text-slate-700 border border-slate-100'}`}
          >
            <PawPrint size={18} className={activeCategory === 'cats' ? '' : 'text-primary'} />
            <span className="text-sm font-semibold">猫咪</span>
          </button>
          <button
            onClick={() => setActiveCategory('dogs')}
            className={`flex h-10 items-center justify-center gap-2 rounded-xl px-4 transition-colors ${activeCategory === 'dogs' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-white text-slate-700 border border-slate-100'}`}
          >
            <PawPrint size={18} className={activeCategory === 'dogs' ? '' : 'text-primary'} />
            <span className="text-sm font-medium">狗狗</span>
          </button>
        </div>

        <section className="mt-2 px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight">新到宠物</h2>
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-bold">今日新增24只</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {displayedPets.map((pet) => (
              <div key={pet.id} onClick={() => onNavigate('details', { petId: pet.id })} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 cursor-pointer">
                <div className="relative h-40">
                  <img src={pet.image} className="w-full h-full object-cover" alt={pet.name} />
                  <button onClick={(e) => toggleFav(e, pet.id)} className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm">
                    <Heart size={16} className={favs[pet.id] ? "text-rose-500 fill-rose-500" : "text-slate-400"} />
                  </button>
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-900">{pet.name}</h4>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${pet.tagColor}`}>{pet.tag}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{pet.age} • {pet.gender}</p>
                  <div className="flex items-center text-[10px] text-slate-400">
                    <MapPin size={12} className="mr-1" />
                    <span>距离{pet.distance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <BottomNav currentView="home" onNavigate={onNavigate} showToast={showToast} />
    </div>
  );
}
