import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Settings, Edit2, Calendar, Clock, ClipboardList, Heart, PawPrint, X, Globe, Bell, LogOut, Camera } from 'lucide-react';
import BottomNav from './BottomNav';

export default function Profile({ onNavigate, initialTab, showToast }: { onNavigate: (v: any, params?: any) => void, initialTab: string, showToast: (m: string) => void }) {
  const [activeTab, setActiveTab] = useState(initialTab || 'applied');
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  const [userName, setUserName] = useState('Alex Johnson');
  const [userAvatar, setUserAvatar] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuBdGJF7VSSDIfeGujI_8s4AUr-j7lggg-pxhe-GT5cgg0TtTu4Tg-B0xl7jc-q3xGTnOQHxvkXa2d4WnVYrpamomkJBSuBtfBLxW_EANfQeLPjeSqwvvIwvceK_BFcDCsTXqtEZkUc0QrCAPzJ7vBqo03zQzOXiZMMhGsRloRS6FdDHPZ_FEteIoY7jaGMbDZ6lqfXFiMocwF-P2jz3otOwib8YR25iYeTWu_jRblHS22wxsk3lIpKGImANy97XrEu3gDE8W716yKA');
  
  const [editName, setEditName] = useState(userName);
  const [editAvatar, setEditAvatar] = useState(userAvatar);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pets, setPets] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/pets')
      .then(res => res.json())
      .then(data => setPets(data || []))
      .catch(err => console.error('Error fetching pets:', err));
  }, []);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setEditAvatar(imageUrl);
    }
  };

  const handleSaveProfile = () => {
    if (editName.trim()) {
      setUserName(editName);
      setUserAvatar(editAvatar);
      setIsEditOpen(false);
      showToast('个人资料已更新');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-background-light min-h-screen flex flex-col shadow-xl pb-24 relative">
      {/* Header */}
      <header className="flex items-center justify-between p-4 sticky top-0 bg-background-light/80 backdrop-blur-md z-10">
        <button onClick={() => onNavigate('home')} className="p-2 hover:bg-primary/10 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">我的主页</h1>
        <button onClick={() => { showToast('已退出登录'); onNavigate('home'); }} className="p-2 hover:bg-rose-100 text-rose-500 rounded-full transition-colors">
          <LogOut size={24} />
        </button>
      </header>

      {/* Profile Hero */}
      <div className="px-4 py-6 flex flex-col items-center border-b border-primary/10">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-primary p-1">
            <img 
              src={userAvatar} 
              alt={userName} 
              className="w-full h-full rounded-full object-cover" 
            />
          </div>
          <button onClick={() => { setEditName(userName); setEditAvatar(userAvatar); setIsEditOpen(true); }} className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-2 border-background-light active:scale-95 transition-transform">
            <Edit2 size={12} />
          </button>
        </div>
        <h2 className="mt-4 text-xl font-bold">{userName}</h2>
        <div className="flex items-center gap-2 mt-1 text-slate-500 text-sm">
          <Calendar size={14} />
          <span>2023年加入</span>
        </div>
        <div className="mt-3 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
          3次成功领养
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-primary/10 bg-background-light sticky top-[60px] z-10">
        <button onClick={() => setActiveTab('favorites')} className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'favorites' ? 'border-b-2 border-primary text-primary' : 'text-slate-400 hover:text-primary'}`}>我的收藏</button>
        <button onClick={() => setActiveTab('applied')} className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'applied' ? 'border-b-2 border-primary text-primary' : 'text-slate-400 hover:text-primary'}`}>已申请</button>
        <button onClick={() => setActiveTab('mypets')} className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'mypets' ? 'border-b-2 border-primary text-primary' : 'text-slate-400 hover:text-primary'}`}>我的宠物</button>
      </div>

      {/* Tab Content */}
      <div className="p-4 flex-1">
        {activeTab === 'applied' && (
          <>
            <h3 className="text-md font-bold mb-4 flex items-center gap-2">
              <ClipboardList size={20} className="text-primary" /> 申请状态
            </h3>
            <div className="space-y-4">
              {pets.filter(p => p.applied).map(pet => (
                <div key={pet.id} onClick={() => onNavigate('details', { petId: pet.id })} className="bg-white p-4 rounded-xl border border-primary/5 flex gap-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                  <img 
                    src={pet.image} 
                    alt={pet.name} 
                    className="w-20 h-20 rounded-lg object-cover" 
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold">{pet.name}</h4>
                      <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider ${pet.applicationStatus === '已批准' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {pet.applicationStatus || '审核中'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{pet.breed} • {pet.gender} • {pet.age}</p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock size={12} /> 最近申请
                    </div>
                  </div>
                </div>
              ))}
              {pets.filter(p => p.applied).length === 0 && (
                <div className="text-center py-10 text-slate-400 text-sm">暂无申请记录</div>
              )}
            </div>
          </>
        )}

        {activeTab === 'favorites' && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Heart size={48} className="mb-4 opacity-20" />
            <p className="text-sm">暂无收藏的宠物</p>
            <button onClick={() => onNavigate('home')} className="mt-4 px-6 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold">
              去看看
            </button>
          </div>
        )}

        {activeTab === 'mypets' && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <PawPrint size={48} className="mb-4 opacity-20" />
            <p className="text-sm">暂无我的宠物</p>
          </div>
        )}
      </div>

      <BottomNav currentView={activeTab === 'favorites' ? 'profile-fav' : 'profile'} onNavigate={onNavigate} showToast={showToast} />

      {/* Edit Profile Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-in slide-in-from-bottom-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">编辑个人资料</h3>
              <button onClick={() => setIsEditOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-500">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 mb-2">
                  <img src={editAvatar} alt="Preview" className="w-full h-full rounded-full object-cover border-2 border-slate-200" />
                  <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 bg-slate-800 text-white p-2 rounded-full border-2 border-white shadow-sm">
                    <Camera size={14} />
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
                </div>
                <p className="text-xs text-slate-500">点击更换头像</p>
              </div>
              
              <label className="flex flex-col w-full">
                <p className="text-sm font-medium text-slate-700 mb-2">姓名</p>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </label>
              <button onClick={handleSaveProfile} className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 mt-4 active:scale-95 transition-transform">
                保存更改
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
