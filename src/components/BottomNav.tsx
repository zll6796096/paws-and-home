import { Home, Heart, MessageSquare, User } from 'lucide-react';

export default function BottomNav({ currentView, onNavigate, showToast }: { currentView: string, onNavigate: (v: any, params?: any) => void, showToast: (m: string) => void }) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-slate-200 pb-safe">
      <nav className="flex justify-around items-center h-16 px-4 max-w-md mx-auto">
        <button onClick={() => onNavigate('home')} className={`flex flex-col items-center gap-1 ${currentView === 'home' ? 'text-primary' : 'text-slate-400'}`}>
          <Home size={24} className={currentView === 'home' ? 'fill-current' : ''} />
          <span className="text-[10px] font-bold">首页</span>
        </button>
        <button onClick={() => onNavigate('profile', { tab: 'favorites' })} className={`flex flex-col items-center gap-1 ${currentView === 'profile-fav' ? 'text-primary' : 'text-slate-400'}`}>
          <Heart size={24} className={currentView === 'profile-fav' ? 'fill-current' : ''} />
          <span className="text-[10px] font-medium">收藏</span>
        </button>
        <button onClick={() => showToast('消息功能即将推出')} className="flex flex-col items-center gap-1 text-slate-400 active:text-primary transition-colors">
          <MessageSquare size={24} />
          <span className="text-[10px] font-medium">消息</span>
        </button>
        <button onClick={() => onNavigate('profile')} className={`flex flex-col items-center gap-1 ${currentView === 'profile' ? 'text-primary' : 'text-slate-400'}`}>
          <User size={24} className={currentView === 'profile' ? 'fill-current' : ''} />
          <span className="text-[10px] font-medium">个人中心</span>
        </button>
      </nav>
    </footer>
  );
}
