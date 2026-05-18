import { useState } from 'react';
import { Film, Eye, EyeOff } from 'lucide-react';

interface HeaderProps {
  onApiKeyChange: (key: string) => void;
  apiKey: string;
}

export default function Header({ onApiKeyChange, apiKey }: HeaderProps) {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center">
            <Film className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
              AIGC—Seedance 2.0
            </h1>
            <h2 className="text-xl font-semibold text-white">分镜智能体2.0版</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 bg-purple-600/30 text-purple-300 text-sm rounded-full border border-purple-500/30">
            Gemini 2.5 Flash
          </span>
          <span className="px-3 py-1.5 bg-purple-600/30 text-purple-300 text-sm rounded-full border border-purple-500/30">
            Vision Enabled
          </span>
        </div>
      </div>
      <p className="mt-3 text-gray-400 text-sm">
        上传参考图与剧情，一键生成专业级多宫格/视频分镜提示词
      </p>
      <div className="mt-4 flex items-center gap-3">
        <span className="text-gray-400 text-sm">密钥</span>
        <div className="relative flex items-center">
          <div className="absolute left-3 text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <input
            type={showApiKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="请输入您的 Gemini API Key"
            className="w-80 pl-10 pr-12 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-200 text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
          <button
            onClick={() => setShowApiKey(!showApiKey)}
            className="absolute right-3 text-gray-500 hover:text-gray-300 transition-colors"
          >
            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}