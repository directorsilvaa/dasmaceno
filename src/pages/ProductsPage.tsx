import React, { useState } from 'react';
import { Search, ShoppingCart, Filter, Star, ChevronDown, Plus, Minus, X, ArrowRight, Check } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Arroz Integral Premium',
    price: 8.99,
    category: 'Grãos',
    description: 'Arroz integral de alta qualidade, rico em fibras e nutrientes.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Feijão Carioca Especial',
    price: 6.99,
    category: 'Grãos',
    description: 'Feijão carioca selecionado, cozimento rápido e uniforme.',
    image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=500&q=80',
    rating: 4.5,
  },
  {
    id: 3,
    name: 'Leite Integral',
    price: 4.99,
    category: 'Laticínios',
    description: 'Leite integral pasteurizado de alta qualidade.',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Café Premium',
    price: 15.99,
    category: 'Bebidas',
    description: 'Café torrado e moído, sabor intenso e aroma marcante.',
    image: 'https://images.unsplash.com/photo-1587734195342-5fbf0d155c86?w=500&q=80',
    rating: 4.9,
  },
  {
    id: 5,
    name: 'Azeite Extra Virgem',
    price: 24.99,
    category: 'Óleos',
    description: 'Azeite de oliva extra virgem, acidez máxima 0,5%.',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80',
    rating: 4.6,
  },
  {
    id: 6,
    name: 'Maçã Fuji',
    price: 7.99,
    category: 'Frutas',
    description: 'Maçã fuji fresca e suculenta, ideal para consumo in natura.',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&q=80',
    rating: 4.4,
  },
];

const categories = ['Todos', 'Grãos', 'Laticínios', 'Bebidas', 'Óleos', 'Frutas'];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [showAddedToCart, setShowAddedToCart] = useState<number | null>(null);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);
  const [showCheckoutPrompt, setShowCheckoutPrompt] = useState(false);

  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product: Product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { product, quantity: 1 }];
    });
    
    setShowAddedToCart(product.id);
    setLastAddedProduct(product);
    setShowMiniCart(true);
    
    if (cartItemsCount >= 4) {
      setShowCheckoutPrompt(true);
      setTimeout(() => setShowCheckoutPrompt(false), 5000);
    }
    
    setTimeout(() => {
      setShowAddedToCart(null);
      setShowMiniCart(false);
    }, 5000);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Nossos Produtos</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubra nossa seleção de produtos frescos e de alta qualidade. 
            Entregamos em sua casa com todo cuidado que você merece.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-lg">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="relative min-w-[200px]">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white transition-all duration-300"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Mini Cart Notification */}
        {showMiniCart && lastAddedProduct && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 rounded-2xl shadow-2xl z-50 p-4 w-[90%] max-w-md animate-slideDown">
            <div className="flex items-start gap-4">
              <img 
                src={lastAddedProduct.image} 
                alt={lastAddedProduct.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-green-600 flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      Produto adicionado!
                    </p>
                    <h4 className="font-medium">{lastAddedProduct.name}</h4>
                  </div>
                  <button 
                    onClick={() => setShowMiniCart(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setShowMiniCart(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm"
                  >
                    Continuar Comprando
                  </button>
                  <a
                    href="/checkout"
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    <span>Finalizar Pedido</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Prompt */}
        {showCheckoutPrompt && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-bounce">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Já tem 5 itens no carrinho! Que tal finalizar o pedido?</span>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-1 text-white">
                    <Star className="w-5 h-5 fill-current text-yellow-400" />
                    <span className="font-medium">{product.rating}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-full">
                    {product.category}
                  </span>
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-600">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="relative bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    {showAddedToCart === product.id && (
                      <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                        +1
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <div className="max-w-md mx-auto">
              <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-600">
                Tente ajustar sua busca ou filtros para encontrar o que procura.
              </p>
            </div>
          </div>
        )}

        {/* Cart Total Badge */}
        {cartItemsCount > 0 && (
          <a
            href="/checkout"
            className="fixed bottom-6 right-6 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition-colors z-30 flex items-center gap-3"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              <span className="font-bold">{cartItemsCount} {cartItemsCount === 1 ? 'item' : 'itens'}</span>
            </div>
            <div className="border-l border-red-500 pl-3">
              <span className="font-bold">R$ {cartTotal.toFixed(2)}</span>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}