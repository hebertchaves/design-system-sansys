import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NumberPickerProps {
  label: string;
  value: number;
  options: number[];
  onChange: (value: number) => void;
  color?: 'blue' | 'emerald';
}

export function NumberPicker({ 
  label, 
  value, 
  options, 
  onChange,
  color = 'blue'
}: NumberPickerProps) {
  const currentIndex = options.indexOf(value);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < options.length - 1;

  const handlePrevious = () => {
    if (canGoPrev) {
      onChange(options[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onChange(options[currentIndex + 1]);
    }
  };

  const colorClasses = {
    blue: {
      bg: 'bg-blue-600',
      bgHover: 'hover:bg-blue-700',
      bgDisabled: 'bg-blue-300',
      border: 'border-blue-200',
      text: 'text-blue-700',
      bgLight: 'bg-blue-50'
    },
    emerald: {
      bg: 'bg-emerald-600',
      bgHover: 'hover:bg-emerald-700',
      bgDisabled: 'bg-emerald-300',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      bgLight: 'bg-emerald-50'
    }
  };

  const colors = colorClasses[color];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-600 font-medium min-w-[80px]">{label}:</span>
      
      <div className={`flex items-center rounded-lg border ${colors.border} ${colors.bgLight} overflow-hidden h-9`}>
        {/* Botão Anterior */}
        <button
          onClick={handlePrevious}
          disabled={!canGoPrev}
          className={`h-full px-2 transition-colors ${
            canGoPrev 
              ? `${colors.bg} ${colors.bgHover} text-white` 
              : `${colors.bgDisabled} text-white cursor-not-allowed`
          }`}
          aria-label="Valor anterior"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Valor Atual */}
        <div className={`px-4 ${colors.text} font-bold text-sm min-w-[50px] text-center h-full flex items-center justify-center`}>
          {value}
        </div>

        {/* Botão Próximo */}
        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className={`h-full px-2 transition-colors ${
            canGoNext 
              ? `${colors.bg} ${colors.bgHover} text-white` 
              : `${colors.bgDisabled} text-white cursor-not-allowed`
          }`}
          aria-label="Próximo valor"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}