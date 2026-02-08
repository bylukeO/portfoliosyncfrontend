import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
];

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="square" strokeLinejoin="miter" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" strokeLinejoin="miter" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" strokeLinejoin="miter" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" strokeLinejoin="miter" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="square" strokeLinejoin="miter" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function SyncIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="square" strokeLinejoin="miter" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L6.75 2.906M12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" strokeLinejoin="miter" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>
  );
}

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#1a1a2e] border-b-2 border-[#2a2a4a] flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border border-[#f72585] bg-[#0a0a0f] flex items-center justify-center">
            <span className="text-[#f72585]">
              <SyncIcon />
            </span>
          </div>
          <span className="font-bold text-[#e8e8e8] tracking-wide">
            Portfolio<span className="text-[#f72585]">Sync</span>
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-[#e8e8e8] p-2 hover:bg-[#2a2a4a] rounded-md transition-colors"
        >
          <MenuIcon />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1a2e] border-r-3 border-[#2a2a4a] flex flex-col transition-transform duration-300 transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:relative md:translate-x-0`
        }
      >
        {/* Mobile Close Button */}
        <div className="md:hidden absolute top-4 right-4 z-50">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-[#a0a0a0] hover:text-[#f72585]"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]" />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#f72585] via-[#4cc9f0] to-[#f72585]" />

        {/* Logo area */}
        <div className="p-6 relative mt-8 md:mt-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-[#f72585] bg-[#0a0a0f] flex items-center justify-center shadow-[0_0_10px_rgba(247,37,133,0.4)]">
              <span className="text-[#f72585]">
                <SyncIcon />
              </span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#e8e8e8] tracking-wide">
                Portfolio<span className="text-[#f72585]">Sync</span>
              </h1>
              <div className="text-[10px] text-[#666666] uppercase tracking-widest">
                // system v1.0
              </div>
            </div>
          </div>
        </div>

        {/* User profile section */}
        {user && (
          <div className="mx-4 mb-4 relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-full px-3 py-3 bg-[#0a0a0f] border-2 border-[#2a2a4a] hover:border-[#4cc9f0] transition-all group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.avatarUrl}
                  alt={user.displayName}
                  className="w-8 h-8 border border-[#f72585] bg-[#1a1a2e]"
                />
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-[#e8e8e8] truncate">
                    {user.displayName}
                  </div>
                  <div className="text-[10px] text-[#4cc9f0] font-mono truncate">
                    @{user.githubUsername}
                  </div>
                </div>
                <svg
                  className={`w-4 h-4 text-[#666666] transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* User dropdown menu */}
            {showUserMenu && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#0a0a0f] border-2 border-[#2a2a4a] z-50">
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex items-center gap-3 px-3 py-3 text-sm text-[#ff3366] hover:bg-[rgba(255,51,102,0.1)] transition-all disabled:opacity-50"
                >
                  {isLoggingOut ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent animate-spin" />
                      <span className="uppercase tracking-wide">Signing out...</span>
                    </>
                  ) : (
                    <>
                      <LogoutIcon />
                      <span className="uppercase tracking-wide">Sign Out</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* System status indicator */}
        <div className="mx-4 mb-4 px-3 py-2 bg-[#0a0a0f] border border-[#2a2a4a]">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 bg-[#39ff14] animate-pulse shadow-[0_0_6px_rgba(57,255,20,0.6)]" />
            <span className="text-[#39ff14] font-mono uppercase tracking-wider">System Online</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 relative">
          <div className="text-[10px] text-[#666666] uppercase tracking-widest mb-3 px-3">
            // Navigation
          </div>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 text-sm font-medium transition-all duration-100 border-2 relative
                ${isActive
                  ? 'bg-[rgba(247,37,133,0.1)] text-[#f72585] border-[#f72585] shadow-[0_0_10px_rgba(247,37,133,0.2)]'
                  : 'text-[#a0a0a0] border-transparent hover:text-[#e8e8e8] hover:bg-[#16213e] hover:border-[#2a2a4a]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute -left-3 text-[#f72585] text-xs animate-pulse">▶</span>
                  )}
                  <Icon />
                  <span className="uppercase tracking-wide">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t-2 border-[#2a2a4a] relative">
          <div className="flex items-center justify-between">
            <div className="text-[10px] text-[#666666] font-mono">
              <span className="text-[#f72585]">$</span> portfoliosync --version
            </div>
            <div className="text-[10px] text-[#4cc9f0] font-mono">v1.0.0</div>
          </div>
          <div className="mt-2 text-[10px] text-[#444455]">
            © 2026 // All systems nominal
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto relative pt-16 md:pt-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(#2a2a4a_1px,transparent_1px),linear-gradient(90deg,#2a2a4a_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="relative">
          <Outlet />
        </div>
      </main>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
}
