import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  HelpCircle, 
  Building2, 
  BookOpen, 
  Users, 
  FileText,
  Menu,
  X,
  LogOut,
  User
} from "lucide-react";
import { ToastProvider } from "./toast-provider";
import { StudentProfileProvider } from "./student-profile-provider";
import { useAuth } from "./auth-provider";

export function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navigation = [
    { name: "Inicio", href: "/dashboard", icon: Home },
    { name: "Preguntas Frecuentes", href: "/dashboard/preguntas-frecuentes", icon: HelpCircle },
    { name: "Empresas Disponibles", href: "/dashboard/empresas", icon: Building2 },
    { name: "Guía Paso a Paso", href: "/dashboard/guia", icon: BookOpen },
    { name: "Contactos", href: "/dashboard/contactos", icon: Users },
    { name: "Documentos", href: "/dashboard/documentos", icon: FileText },
  ];

  return (
    <>
      <StudentProfileProvider>
        <ToastProvider />
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-secondary shadow-sm sticky top-0 z-50">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl font-bold">U</span>
                  </div>
                  <div>
                    <h1 className="text-white text-lg sm:text-xl leading-tight">Prácticas Profesionales</h1>
                    <p className="text-white/80 text-xs sm:text-sm">UDLAP</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* User menu - Desktop */}
                  <div className="hidden sm:block relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <User size={18} />
                      <span className="text-sm">ID: {user?.studentId}</span>
                    </button>
                    
                    {showUserMenu && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setShowUserMenu(false)}
                        />
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                          <div className="px-4 py-3 border-b border-gray-200">
                            <p className="text-sm font-medium text-gray-900">Estudiante</p>
                            <p className="text-xs text-gray-500">ID: {user?.studentId}</p>
                          </div>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors"
                          >
                            <LogOut size={16} />
                            Cerrar Sesión
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Mobile menu button */}
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg"
                    aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                  >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>
            </div>
          </header>

          <div className="flex">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] sticky top-16">
              <nav className="p-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors group ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-accent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} />
                        <span>{item.name}</span>
                      </div>
                      <kbd className={`text-xs px-1.5 py-0.5 rounded border opacity-0 group-hover:opacity-100 transition-opacity ${
                        isActive 
                          ? "border-white/30 text-white/70" 
                          : "border-gray-300 text-gray-500"
                      }`}>
                        {item.shortcut}
                      </kbd>
                    </Link>
                  );
                })}
              </nav>
            </aside>

            {/* Mobile menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden fixed inset-0 top-16 bg-white z-40">
                <nav className="p-4 space-y-1">
                  {/* User info - Mobile */}
                  <div className="mb-4 p-4 bg-accent rounded-lg border border-primary/20">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <User className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">ID: {user?.studentId}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-700 bg-white hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
                    >
                      <LogOut size={16} />
                      Cerrar Sesión
                    </button>
                  </div>

                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-primary text-white"
                            : "text-gray-700 hover:bg-accent"
                        }`}
                      >
                        <Icon size={20} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            )}

            {/* Main content */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              <Outlet />
            </main>
          </div>
        </div>
      </StudentProfileProvider>
    </>
  );
}