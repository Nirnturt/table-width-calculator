import { createSignal } from 'solid-js';
import { t } from '../i18n';

function PresetWidths(props) {
  const commonWidths = [900, 1000, 1100, 1200, 1600, 1700];
  const [hoveredWidth, setHoveredWidth] = createSignal(null);
  
  // 当前选中的宽度
  const isActiveWidth = (width) => {
    return props.currentWidth == width;
  };
  
  return (
    <div class={`card p-5 mb-6 transition-all duration-300 ${props.isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} ${props.isInitializing ? 'hidden' : ''}`} style="transition-delay: 0.05s;">
      <div class="flex flex-col gap-5">
        {/* 常用宽度 */}
        <div>
          <h2 class="text-base font-medium text-content dark:text-content-dark mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            {t('presets.commonWidths')}
          </h2>
          <div class="flex flex-wrap gap-2">
            {commonWidths.map((width) => (
              <button 
                class={`px-3 py-1.5 rounded text-sm transition-all duration-200
                       ${isActiveWidth(width) 
                         ? 'bg-primary text-white shadow-sm' 
                         : 'bg-element dark:bg-element-dark text-content dark:text-content-dark hover:bg-element/80 dark:hover:bg-element-dark/80'
                       }`}
                onClick={() => props.onSelectWidth(width)}
                onMouseEnter={() => setHoveredWidth(width)}
                onMouseLeave={() => setHoveredWidth(null)}
              >
                {width}px
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PresetWidths;
  