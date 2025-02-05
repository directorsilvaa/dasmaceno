import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Percent, ClipboardList, UserCircle2, ShoppingCart, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navigation() {
  const { user, login, logout, error } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      setShowLoginModal(false);
      setEmail('');
      setPassword('');
    } catch (err) {
      // Error is handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setShowLoginModal(false);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="md:hidden flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
              <Home className="w-5 h-5" />
              <span className="font-medium">Início</span>
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 hover:bg-red-500 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4 space-y-2 bg-white/10 rounded-lg p-4 backdrop-blur-sm`}>
            <Link to="/products" className="flex items-center gap-2 py-2 hover:bg-white/20 rounded-lg px-3 transition-colors">
              <Percent className="w-5 h-5" />
              <span>Promoções</span>
            </Link>
            <Link to="/products" className="flex items-center gap-2 py-2 hover:bg-white/20 rounded-lg px-3 transition-colors">
              <ClipboardList className="w-5 h-5" />
              <span>Pedidos</span>
            </Link>
            {user ? (
              <>
                <div className="flex items-center gap-2 py-2 px-3">
                  <UserCircle2 className="w-5 h-5" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 py-2 hover:bg-white/20 rounded-lg px-3 transition-colors w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sair</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2 py-2 hover:bg-white/20 rounded-lg px-3 transition-colors w-full"
              >
                <LogIn className="w-5 h-5" />
                <span>Entrar/Cadastrar</span>
              </button>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 bg-white text-red-600 px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
              <Home className="w-5 h-5" />
              <span className="font-medium">Início</span>
            </Link>
            <div className="flex items-center gap-8">
              <Link to="/products" className="flex items-center gap-2 hover:bg-white/10 px-4 py-2 rounded-full transition-colors">
                <Percent className="w-5 h-5" />
                <span>Promoções</span>
              </Link>
              <Link to="/products" className="flex items-center gap-2 hover:bg-white/10 px-4 py-2 rounded-full transition-colors">
                <ClipboardList className="w-5 h-5" />
                <span>Pedidos</span>
              </Link>
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10">
                    <UserCircle2 className="w-5 h-5" />
                    <span>{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 hover:bg-white/10 px-4 py-2 rounded-full transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sair</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center gap-2 hover:bg-white/10 px-4 py-2 rounded-full transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Entrar/Cadastrar</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Entre na sua conta</h2>
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span>Entrar</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Conta de teste: teste@email.com / 123456
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}