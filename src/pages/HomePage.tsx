import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-red-600 to-red-700 text-white py-12 md:py-20 relative">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden bg-gradient-to-br from-red-700/80 to-red-900/80 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&q=80')] opacity-10 bg-cover bg-center transform hover:scale-105 transition-transform duration-1000"></div>
          
          <div className="relative space-y-8 md:max-w-2xl">
            <div className="animate-fadeIn space-y-4">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-400 animate-spin-slow" />
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
                  Mercado Damasceno
                </h2>
              </div>
              <p className="text-red-100 text-lg md:text-xl">Qualidade e economia para sua família</p>
            </div>

            <div className="space-y-6 animate-slideUp">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Mais fácil
                <br />
                mais barato
                <br />
                mais rápido
              </h1>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
                <p className="font-medium text-lg">Use o cupom</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  BEMVINDO10
                </p>
                <p className="font-medium">e ganhe R$ 10 de desconto</p>
                <p className="text-sm text-red-100">no seu primeiro pedido pelo site.</p>
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => navigate('/products')}
                  className="group bg-white text-red-600 px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-red-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span className="text-lg">Faça seu pedido agora</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}