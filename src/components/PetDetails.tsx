import { useState, useEffect } from 'react';
import { ArrowLeft, Share2, MapPin, Smile, Coffee, Baby, Syringe, Scissors, Heart } from 'lucide-react';

export default function PetDetails({ onNavigate, petId, showToast }: { onNavigate: (v: any, params?: any) => void, petId?: string | null, showToast: (m: string) => void }) {
  const [isFav, setIsFav] = useState(false);
  const [pet, setPet] = useState<any>(null);

  useEffect(() => {
    if (petId) {
      fetch(`/api/pets/${petId}`)
        .then(res => res.json())
        .then(data => setPet(data))
        .catch(err => console.error(err));
    }
  }, [petId]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => { });
    showToast('链接已复制到剪贴板');
  };

  const toggleFav = () => {
    setIsFav(!isFav);
    showToast(!isFav ? '已添加到收藏' : '已取消收藏');
  };

  const handleApply = async () => {
    if (!petId) return;
    try {
      const res = await fetch(`/api/pets/${petId}/apply`, { method: 'POST' });
      if (res.ok) {
        showToast('申请提交成功！');
        onNavigate('profile', { tab: 'applied' });
      } else {
        showToast('申请失败，请重试');
      }
    } catch (err) {
      console.error(err);
      showToast('网络错误');
    }
  };

  if (!pet) return <div className="min-h-screen bg-background-light flex items-center justify-center p-4">加载中...</div>;

  return (
    <div className="relative flex min-h-screen w-full max-w-md mx-auto flex-col bg-background-light pb-24">
      {/* Top App Bar */}
      <div className="flex items-center bg-background-light/80 backdrop-blur-md sticky top-0 z-10 p-4 justify-between">
        <button onClick={() => onNavigate('home')} className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-slate-900 cursor-pointer">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">宠物详情</h2>
        <div className="flex w-10 items-center justify-end">
          <button onClick={handleShare} className="flex items-center justify-center rounded-full size-10 bg-primary/10 text-slate-900 active:bg-primary/20 transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="px-0 sm:px-4 py-0 sm:py-3">
        <div
          className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden sm:rounded-xl min-h-[400px] shadow-lg"
          style={{ backgroundImage: `url("${pet.image}")` }}
        >
        </div>
      </div>

      {/* Main Info */}
      <div className="flex p-6">
        <div className="flex w-full flex-col gap-4 items-start">
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold leading-tight tracking-tight">{pet.name}</h1>
                <span className={pet.gender === '雄性' ? "text-blue-500 font-bold text-2xl" : "text-pink-500 font-bold text-2xl"}>{pet.gender === '雄性' ? '♂' : '♀'}</span>
              </div>
              <p className="text-primary font-semibold text-lg">{pet.breed}</p>
            </div>
            <div className="bg-primary/10 px-3 py-1 rounded-full">
              <p className="text-primary text-sm font-bold">{pet.age}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <MapPin size={16} />
            <p>旧金山, CA (距离{pet.distance})</p>
          </div>
        </div>
      </div>

      {/* Personality Tags */}
      <div className="flex gap-3 px-6 flex-wrap">
        <div className="flex h-9 items-center justify-center gap-x-2 rounded-lg bg-primary/10 px-4 border border-primary/20">
          <Smile className="text-primary" size={16} />
          <p className="text-sm font-medium">友好</p>
        </div>
        <div className="flex h-9 items-center justify-center gap-x-2 rounded-lg bg-primary/10 px-4 border border-primary/20">
          <Coffee className="text-primary" size={16} />
          <p className="text-sm font-medium">文静</p>
        </div>
        <div className="flex h-9 items-center justify-center gap-x-2 rounded-lg bg-primary/10 px-4 border border-primary/20">
          <Baby className="text-primary" size={16} />
          <p className="text-sm font-medium">对孩子友善</p>
        </div>
      </div>

      {/* Heartfelt Description */}
      <div className="px-6 pt-8">
        <h3 className="text-xl font-bold leading-tight mb-3">关于 {pet.name}</h3>
        <p className="text-slate-600 leading-relaxed">{pet.desc}</p>
      </div>

      {/* Health Section */}
      <div className="px-6 pt-8 pb-4">
        <h3 className="text-xl font-bold leading-tight mb-4">健康状况</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100">
            <div className="bg-green-500/20 text-green-600 p-2 rounded-lg">
              <Syringe size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500">已接种疫苗</p>
              <p className="text-sm font-bold text-slate-900">最新状态</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100">
            <div className="bg-green-500/20 text-green-600 p-2 rounded-lg">
              <Scissors size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500">已绝育</p>
              <p className="text-sm font-bold text-slate-900">是</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-background-light/95 backdrop-blur-md border-t border-slate-200 z-20">
        <div className="flex gap-4">
          <button onClick={toggleFav} className={`flex items-center justify-center rounded-xl size-14 border-2 transition-colors ${isFav ? 'border-rose-200 bg-rose-50 text-rose-500' : 'border-primary text-primary bg-white'}`}>
            <Heart size={24} className={isFav ? 'fill-current' : ''} />
          </button>
          <button onClick={handleApply} disabled={pet.applied} className={`flex-1 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-transform ${pet.applied ? 'bg-slate-400' : 'bg-primary active:scale-[0.98]'}`}>
            {pet.applied ? '已申请' : `领养 ${pet.name}`}
          </button>
        </div>
      </div>
    </div>
  );
}
