import { Sparkles } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export default function GenerateButton({ onClick, isLoading }: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 disabled:from-gray-600 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100"
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          生成中...
        </span>
      ) : (
        <>
          <Sparkles className="w-5 h-5" />
          生成专属分镜提示词
        </>
      )}
    </button>
  );
}