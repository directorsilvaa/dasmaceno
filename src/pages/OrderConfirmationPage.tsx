import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Home, ClipboardList, Upload } from 'lucide-react';
import FileUpload from '../components/FileUpload';

export default function OrderConfirmationPage() {
  const navigate = useNavigate();
  const [showUpload, setShowUpload] = useState(false);

  const handleUploadComplete = (url: string) => {
    console.log('Arquivo enviado:', url);
    // Aqui você pode implementar a lógica para salvar a URL do arquivo no banco de dados
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            {/* Success Animation */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Pedido confirmado!
            </h1>
            
            <div className="bg-green-50 border border-green-100 rounded-xl p-6 mb-8">
              <p className="text-green-800 text-lg mb-2">
                Seu pedido foi aprovado e já está sendo preparado
              </p>
              <p className="text-green-600">
                Em breve você receberá atualizações sobre o status da entrega
              </p>
            </div>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Número do pedido:</span>
                <span className="font-bold text-gray-800">#123456</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Previsão de entrega:</span>
                <span className="font-bold text-gray-800">30-45 minutos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Forma de pagamento:</span>
                <span className="font-bold text-gray-800">Cartão de crédito</span>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="mb-8">
              <button
                onClick={() => setShowUpload(!showUpload)}
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                <Upload className="w-5 h-5" />
                <span>Anexar comprovante</span>
              </button>

              {showUpload && (
                <div className="mt-4">
                  <FileUpload 
                    onUploadComplete={handleUploadComplete}
                    maxSizeMB={5}
                    allowedTypes={['image/jpeg', 'image/png', 'image/gif', 'application/pdf']}
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Voltar ao início</span>
              </button>
              <button
                onClick={() => navigate('/orders')}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
              >
                <ClipboardList className="w-5 h-5" />
                <span>Acompanhar pedido</span>
              </button>
            </div>
          </div>

          {/* Delivery Progress */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Status do pedido</h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Pedido confirmado</p>
                  <p className="text-sm text-gray-600">Seu pedido foi recebido e aprovado</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Em preparação</p>
                  <p className="text-sm text-gray-600">Seu pedido está sendo preparado</p>
                </div>
              </div>

              <div className="flex items-center gap-4 opacity-50">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Saiu para entrega</p>
                  <p className="text-sm text-gray-600">Seu pedido está a caminho</p>
                </div>
              </div>

              <div className="flex items-center gap-4 opacity-50">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Entregue</p>
                  <p className="text-sm text-gray-600">Pedido entregue com sucesso</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}