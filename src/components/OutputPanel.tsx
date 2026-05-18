import { useState } from 'react';
import { ChevronRight, Film, Copy, Check } from 'lucide-react';

interface OutputPanelProps {
  content: string;
  isGenerating: boolean;
}

export default function OutputPanel({ content, isGenerating }: OutputPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (content) {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700 h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-700/30 rounded-lg px-2 py-1 -mx-2 transition-colors"
        >
          <ChevronRight
            className={`w-4 h-4 text-purple-400 transition-transform duration-200 ${
              isExpanded ? 'rotate-90' : ''
            }`}
          />
          <span className="text-white font-medium">智能体输出</span>
        </button>
        {content && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1.5 text-gray-400 hover:text-gray-200 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span className="text-sm">已复制</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="text-sm">复制</span>
              </>
            )}
          </button>
        )}
      </div>
      
      <div className={`flex-1 p-4 overflow-auto ${isExpanded ? 'block' : 'hidden'}`}>
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="w-16 h-16 mb-4 rounded-full bg-gray-700/50 flex items-center justify-center">
              <Film className="w-8 h-8 animate-pulse" />
            </div>
            <p className="text-sm">正在生成分镜提示词...</p>
          </div>
        ) : content ? (
          <pre className="whitespace-pre-wrap text-gray-300 text-sm font-mono leading-relaxed">
            {content}
          </pre>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="w-20 h-20 mb-4 rounded-xl bg-gray-700/30 flex items-center justify-center">
              <Film className="w-10 h-10 text-gray-600" />
            </div>
            <p className="text-sm font-medium mb-1">等待导演下达指令...</p>
            <p className="text-xs">请在左侧上传参考图并填写剧情</p>
          </div>
        )}
      </div>
    </div>
  );
}