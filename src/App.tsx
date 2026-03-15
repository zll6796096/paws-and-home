import { useState } from 'react';
import Home from './components/Home';
import PetDetails from './components/PetDetails';
import Profile from './components/Profile';

export type ViewState = 'home' | 'details' | 'profile';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [navParams, setNavParams] = useState<any>({});
  const [toast, setToast] = useState<{message: string, visible: boolean}>({ message: '', visible: false });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 3000);
  };

  const navigate = (view: ViewState, params?: any) => {
    setCurrentView(view);
    setNavParams(params || {});
  };

  return (
    <div className="min-h-screen bg-background-light text-slate-900 font-sans relative">
      {currentView === 'home' && <Home onNavigate={navigate} showToast={showToast} />}
      {currentView === 'details' && <PetDetails onNavigate={navigate} petId={navParams?.petId} showToast={showToast} />}
      {currentView === 'profile' && <Profile onNavigate={navigate} initialTab={navParams?.tab || 'applied'} showToast={showToast} />}
      
      {/* Global Toast */}
      {toast.visible && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white px-6 py-3 rounded-full shadow-xl text-sm font-medium animate-in fade-in slide-in-from-top-4 whitespace-nowrap">
          {toast.message}
        </div>
      )}
    </div>
  );
}
