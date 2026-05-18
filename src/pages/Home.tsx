import { useState } from 'react';
import Header from '@/components/Header';
import UploadArea from '@/components/UploadArea';
import ConfigPanel from '@/components/ConfigPanel';
import OutputPanel from '@/components/OutputPanel';
import GenerateButton from '@/components/GenerateButton';

interface ConfigData {
  shotCount: string;
  duration: string;
  plotDescription: string;
}

export default function Home() {
  const [apiKey, setApiKey] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [config, setConfig] = useState<ConfigData>({
    shotCount: '9个镜头 (适合 3x3 九宫格)',
    duration: '15秒',
    plotDescription: '例如：赛博朋克城市里的女特工接头。起因：在霓虹小巷等待；发展：神秘人出现交接手提箱；高潮：发现被跟踪，拔出光束手枪；结局：消失在雨夜中。重点突出冷峻质感和霓虹光影对比。',
  });
  const [outputContent, setOutputContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!apiKey) {
      alert('请先输入API Key');
      return;
    }

    setIsGenerating(true);
    setError('');
    setOutputContent('');

    try {
      const apiUrl = import.meta.env.PROD ? '/api/generate' : 'http://localhost:3001/api/generate';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey,
          plotDescription: config.plotDescription,
          shotCount: config.shotCount,
          duration: config.duration,
          imageBase64: uploadedImage,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setOutputContent(data.content);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('网络错误，请稍后重试');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Header onApiKeyChange={setApiKey} apiKey={apiKey} />
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <UploadArea onImageUpload={setUploadedImage} />
            <ConfigPanel 
              config={config} 
              onConfigChange={setConfig} 
            />
            <GenerateButton 
              onClick={handleGenerate} 
              isLoading={isGenerating}
            />
          </div>
          
          <div className="min-h-[500px]">
            <OutputPanel 
              content={outputContent} 
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </div>
    </div>
  );
}