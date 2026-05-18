import { Wand2 } from 'lucide-react';

interface ConfigData {
  shotCount: string;
  duration: string;
  plotDescription: string;
}

interface ConfigPanelProps {
  config: ConfigData;
  onConfigChange: (config: ConfigData) => void;
}

export default function ConfigPanel({ config, onConfigChange }: ConfigPanelProps) {
  const shotOptions = [
    '4个镜头 (适合 2x2 四宫格)',
    '9个镜头 (适合 3x3 九宫格)',
    '16个镜头 (适合 4x4 十六宫格)',
    '25个镜头 (适合 5x5 二十五宫格)',
  ];

  const durationOptions = [
    '10秒',
    '15秒',
    '20秒',
    '30秒',
    '1分钟',
  ];

  const handlePolish = () => {
    const polishedText = `【剧情润色】\n${config.plotDescription}\n\n【润色要求】\n请将上述剧情描述进行专业润色，使其更具画面感和戏剧性，突出视觉效果和氛围营造。`;
    alert('AI智能润色功能已触发！\n\n' + polishedText);
  };

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">
          2
        </div>
        <span className="text-white font-medium">剧情与镜头配置</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">镜头数量 (网格类型)</label>
          <div className="relative">
            <select
              value={config.shotCount}
              onChange={(e) => onConfigChange({ ...config, shotCount: e.target.value })}
              className="w-full appearance-none bg-gray-700 border border-gray-600 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 cursor-pointer"
            >
              {shotOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-400 text-sm mb-2">视频总时长</label>
          <div className="relative">
            <select
              value={config.duration}
              onChange={(e) => onConfigChange({ ...config, duration: e.target.value })}
              className="w-full appearance-none bg-gray-700 border border-gray-600 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 cursor-pointer"
            >
              {durationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-2 flex items-center justify-between">
        <label className="text-gray-400 text-sm">剧情描述与分镜要求</label>
        <button
          onClick={handlePolish}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600/30 hover:bg-purple-600/40 border border-purple-500/30 rounded-lg text-purple-300 text-sm transition-colors"
        >
          <Wand2 className="w-3.5 h-3.5" />
          AI智能润色
        </button>
      </div>
      
      <textarea
        value={config.plotDescription}
        onChange={(e) => onConfigChange({ ...config, plotDescription: e.target.value })}
        placeholder="请输入剧情描述和分镜要求..."
        className="w-full h-36 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2.5 text-gray-200 text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
      />
    </div>
  );
}