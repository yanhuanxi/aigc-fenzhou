import { useState } from 'react';
import { ImagePlus } from 'lucide-react';

interface UploadAreaProps {
  onImageUpload: (image: string | null) => void;
}

export default function UploadArea({ onImageUpload }: UploadAreaProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setUploadedImage(result);
        onImageUpload(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setUploadedImage(result);
        onImageUpload(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    onImageUpload(null);
  };

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">
          1
        </div>
        <span className="text-white font-medium">上传参考主图</span>
        <span className="text-gray-500 text-sm">(可选)</span>
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? 'border-purple-500 bg-purple-900/20'
            : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/30'
        } ${uploadedImage ? 'p-0' : ''}`}
      >
        {uploadedImage ? (
          <div className="relative">
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-full h-48 object-contain rounded-lg"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-700/50 flex items-center justify-center">
              <ImagePlus className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-400 text-sm mb-2">点击或拖拽上传图片</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="upload-input"
            />
            <label
              htmlFor="upload-input"
              className="text-purple-400 text-sm hover:text-purple-300 cursor-pointer transition-colors"
            >
              选择文件
            </label>
          </>
        )}
      </div>
    </div>
  );
}