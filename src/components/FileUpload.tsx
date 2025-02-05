import React, { useState } from 'react';
import { Upload, X, CheckCircle2, AlertCircle } from 'lucide-react';

type FileUploadProps = {
  onUploadComplete?: (url: string) => void;
  maxSizeMB?: number;
  allowedTypes?: string[];
};

export default function FileUpload({ 
  onUploadComplete, 
  maxSizeMB = 5,
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    setError(null);

    if (!allowedTypes.includes(file.type)) {
      setError('Tipo de arquivo não permitido');
      return false;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`O arquivo deve ter no máximo ${maxSizeMB}MB`);
      return false;
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    if (validateFile(droppedFile)) {
      setFile(droppedFile);
      handleUpload(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      handleUpload(selectedFile);
    }
  };

  const handleUpload = async (fileToUpload: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simular upload com progresso
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Aqui você implementaria a lógica real de upload para o Supabase Storage
      // const { data, error } = await supabase.storage
      //   .from('uploads')
      //   .upload(`${Date.now()}-${fileToUpload.name}`, fileToUpload);

      setIsSuccess(true);
      if (onUploadComplete) {
        onUploadComplete('https://example.com/uploaded-file.pdf'); // URL exemplo
      }
    } catch (err) {
      setError('Erro ao fazer upload do arquivo');
    } finally {
      setIsUploading(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setError(null);
    setIsUploading(false);
    setUploadProgress(0);
    setIsSuccess(false);
  };

  return (
    <div className="w-full">
      {!file && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-2xl p-8
            ${isDragging 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-300 hover:border-red-500 hover:bg-red-50'
            }
            transition-colors cursor-pointer
          `}
        >
          <input
            type="file"
            onChange={handleFileSelect}
            accept={allowedTypes.join(',')}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="text-center">
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">
              Arraste e solte seu arquivo aqui ou clique para selecionar
            </p>
            <p className="text-sm text-gray-500">
              Tipos permitidos: {allowedTypes.join(', ')}
            </p>
            <p className="text-sm text-gray-500">
              Tamanho máximo: {maxSizeMB}MB
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
          <button 
            onClick={resetUpload}
            className="ml-auto text-red-600 hover:text-red-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {file && !error && (
        <div className="mt-4 bg-gray-50 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700">{file.name}</span>
                {!isSuccess && (
                  <button 
                    onClick={resetUpload}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-600 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Enviando... {uploadProgress}%
                  </p>
                </div>
              )}

              {isSuccess && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Upload concluído com sucesso!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}