import { createSignal, createEffect } from 'solid-js';
import { convertToExportFormat, downloadJson, downloadZip, calculatePercentagesInRange } from '../utils/export';

function ExportModal(props) {
  const [exportType, setExportType] = createSignal('all'); // 'all' or 'saved'
  const [rangeMin, setRangeMin] = createSignal(1);
  const [rangeMax, setRangeMax] = createSignal(100);
  const [isDraggingMin, setIsDraggingMin] = createSignal(false);
  const [isDraggingMax, setIsDraggingMax] = createSignal(false);
  const [filePrefix, setFilePrefix] = createSignal(''); // 添加文件前缀状态
  const [hasMultipleFiles, setHasMultipleFiles] = createSignal(false); // 是否有多个文件

  // 当拖动结束时，确保释放拖动状态
  const handleMouseUp = () => {
    setIsDraggingMin(false);
    setIsDraggingMax(false);
  };

  // 监听全局鼠标移动和抬起事件
  createEffect(() => {
    if (props.isOpen) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      
      // 检查是否有多个文件需要导出
      checkMultipleFiles();
      
      return () => {
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  });

  // 处理拖动事件
  const handleMouseMove = (e) => {
    if (!isDraggingMin() && !isDraggingMax()) return;
    
    const slider = document.getElementById('percentageSlider');
    if (!slider) return;
    
    const rect = slider.getBoundingClientRect();
    const sliderWidth = rect.width;
    const offsetX = e.clientX - rect.left;
    
    // 先将拖动位置映射到0-1之间的比例
    const ratio = Math.max(0, Math.min(1, offsetX / sliderWidth));
    
    // 然后将比例映射到1-100的范围值
    let value = Math.round(ratio * 99) + 1;
    
    if (isDraggingMin()) {
      // 确保最小值不能大于或等于最大值
      value = Math.min(value, rangeMax() - 1);
      setRangeMin(value);
    } else if (isDraggingMax()) {
      // 确保最大值不能小于或等于最小值
      value = Math.max(value, rangeMin() + 1);
      setRangeMax(value);
    }
  };

  // 处理最小值输入变化
  const handleMinInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      // 最小值范围为1-99，且不能大于等于最大值
      const newMin = Math.max(1, Math.min(value, rangeMax() - 1));
      setRangeMin(newMin);
    }
  };

  // 处理最大值输入变化
  const handleMaxInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      // 最大值范围为2-100，且不能小于等于最小值
      const newMax = Math.max(rangeMin() + 1, Math.min(value, 100));
      setRangeMax(newMax);
    }
  };

  // 计算滑块位置 (将1-100转换为CSS百分比)
  const getSliderPosition = (value) => {
    // 映射滑块值(1-100)到刻度位置(0-100%)
    return `${((value - 1) / 99) * 100}%`;
  };

  // 计算刻度位置 (0-100)
  const getTickPosition = (value) => {
    // 所有刻度保持均匀分布
    return `${value}%`;
  };

  // 检查是否有多个文件需要导出
  const checkMultipleFiles = () => {
    let columnsToExport = [];
    
    if (exportType() === 'all') {
      const currentWidth = parseFloat(props.currentWidth);
      const currentExists = props.savedColumns.some(col => col.baseWidth === currentWidth);
      
      columnsToExport = currentExists 
        ? props.savedColumns 
        : [{ baseWidth: currentWidth }, ...props.savedColumns];
    } else {
      columnsToExport = props.savedColumns;
    }
    
    setHasMultipleFiles(columnsToExport.length > 1);
  };
  
  // 当导出类型改变时，重新检查是否有多个文件
  createEffect(() => {
    checkMultipleFiles();
  });

  // 导出数据
  const handleExport = () => {
    // 确定要导出的列
    let columnsToExport = [];
    
    if (exportType() === 'all') {
      // 导出当前显示的所有列
      const currentWidth = parseFloat(props.currentWidth);
      const currentExists = props.savedColumns.some(col => col.baseWidth === currentWidth);
      
      columnsToExport = currentExists 
        ? props.savedColumns 
        : [{ baseWidth: currentWidth }, ...props.savedColumns];
    } else {
      // 仅导出已暂存的列
      columnsToExport = props.savedColumns;
    }

    // 如果没有要导出的列，显示提示
    if (columnsToExport.length === 0) {
      props.onNotification('没有可导出的数据', 'error');
      return;
    }

    // 准备导出文件
    if (columnsToExport.length === 1) {
      // 单个宽度，直接导出JSON
      const baseWidth = columnsToExport[0].baseWidth;
      const percentages = calculatePercentagesInRange(baseWidth, rangeMin(), rangeMax());
      const exportData = convertToExportFormat(percentages);
      
      // 生成文件名
      const fileName = `width-${baseWidth}px.json`;
      
      downloadJson(exportData, fileName);
      props.onNotification('导出成功');
    } else {
      // 多个宽度，打包为ZIP
      const prefix = filePrefix().trim();
      
      const files = columnsToExport.map(column => {
        const baseWidth = column.baseWidth;
        const percentages = calculatePercentagesInRange(baseWidth, rangeMin(), rangeMax());
        const exportData = convertToExportFormat(percentages);
        
        // 生成文件名，使用前缀（如果有）
        const fileName = prefix 
          ? `${prefix}.${baseWidth}.tokens.json` 
          : `width-${baseWidth}px.json`;
        
        return {
          filename: fileName,
          content: JSON.stringify(exportData, null, 2)
        };
      });
      
      // 生成ZIP文件名
      const zipFileName = prefix ? `${prefix}.tokens.zip` : 'table-widths.zip';
      
      downloadZip(files, zipFileName)
        .then(() => props.onNotification('导出成功'))
        .catch(err => {
          console.error('导出失败:', err);
          props.onNotification('导出失败，请重试', 'error');
        });
    }
    
    // 关闭弹窗
    props.onClose();
  };

  // 生成刻度标记
  const generateTicks = () => {
    const ticks = [];
    // 生成十一个刻度点（0%, 10%, 20%, ..., 100%）
    for (let i = 0; i <= 10; i++) {
      const percent = i * 10;
      
      // Special case for 0% and 100%
      if (percent === 0) {
        // 0% tick mark at the left edge
        ticks.push(
          <div class="absolute left-0" style={{ transform: 'translateX(0)' }}>
            <div class="h-3 w-0.5 bg-gray-300 dark:bg-gray-600 mb-1"></div>
            <span class="text-xs text-gray-500 dark:text-gray-400 text-left">{percent}%</span>
          </div>
        );
      } else if (percent === 100) {
        // 100% tick mark at the right edge
        ticks.push(
          <div class="absolute right-0" style={{ transform: 'translateX(0)' }}>
            <div class="h-3 w-0.5 bg-gray-300 dark:bg-gray-600 mb-1"></div>
            <span class="text-xs text-gray-500 dark:text-gray-400 text-right">{percent}%</span>
          </div>
        );
      } else {
        // Middle tick marks
        ticks.push(
          <div class="absolute" style={{ left: getTickPosition(percent), transform: 'translateX(-50%)' }}>
            <div class="h-3 w-0.5 bg-gray-300 dark:bg-gray-600 mb-1"></div>
            <span class="text-xs text-gray-500 dark:text-gray-400 text-center">{percent}%</span>
          </div>
        );
      }
    }
    return ticks;
  };

  return (
    <div 
      class={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 backdrop-blur-sm ${props.isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ background: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div class={`bg-white dark:bg-canvas-dark rounded-lg shadow-xl w-[95%] md:max-w-3xl max-h-[90vh] overflow-y-auto overflow-x-hidden transform transition-all duration-300 ${props.isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}`}>
        <div class="p-4 md:p-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-800 dark:text-content-dark flex items-center gap-2">
              {/* <span class="bg-green-500 text-white p-1.5 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </span> */}
              导出数据
            </h2>
            <button
              onClick={props.onClose}
              class="text-content-subtle hover:text-content dark:text-content-dark-subtle dark:hover:text-content-dark transition-colors duration-200 transform hover:scale-110 active:scale-95"
              aria-label="关闭"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="mb-8 animate-fade-in" style="animation-delay: 0.1s;">
            <label class="block text-base font-bold text-gray-700 dark:text-content-dark mb-3 flex items-center">
              导出格式
            </label>
            
            <div class="flex space-x-6">
              <label class="inline-flex items-center transition-all duration-200 hover:text-primary dark:hover:text-primary-dark cursor-pointer">
                <input 
                  type="radio" 
                  class="form-radio h-5 w-5 text-primary dark:text-primary-dark transition-all duration-200" 
                  checked={exportType() === 'all'}
                  onChange={() => setExportType('all')}
                />
                <span class="ml-2 text-gray-700 dark:text-content-dark">所有数据</span>
              </label>
              <label class="inline-flex items-center transition-all duration-200 hover:text-primary dark:hover:text-primary-dark cursor-pointer">
                <input 
                  type="radio" 
                  class="form-radio h-5 w-5 text-primary dark:text-primary-dark transition-all duration-200" 
                  checked={exportType() === 'saved'}
                  onChange={() => setExportType('saved')}
                />
                <span class="ml-2 text-gray-700 dark:text-content-dark">仅暂存数据</span>
              </label>
            </div>
          </div>

          <div class="mb-8 animate-fade-in" style="animation-delay: 0.2s;">
            <label class="block text-base font-bold text-gray-700 dark:text-content-dark mb-3 flex items-center">
              范围设置
            </label>
            
            <div class="border border-gray-300 dark:border-divider-dark rounded-lg px-4 py-4 mb-4">
              {/* 移动端数值输入框 - 直接显示在顶部，无间隙 */}
              <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div class="w-full md:w-1/2">
                  <label class="block text-sm text-gray-600 dark:text-content-dark-subtle mb-2">最小百分比值</label>
                  <input 
                    type="number"
                    class="w-full px-3 py-1.5 border border-divider dark:border-divider-dark rounded-md bg-white dark:bg-element-dark text-gray-900 dark:text-content-dark focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary-dark/30 focus:border-primary dark:focus:border-primary-dark outline-none"
                    min="1"
                    max="99"
                    value={rangeMin()}
                    onInput={handleMinInputChange}
                  />
                </div>
                <div class="w-full md:w-1/2">
                  <label class="block text-sm text-gray-600 dark:text-content-dark-subtle mb-2">最大百分比值</label>
                  <input 
                    type="number"
                    class="w-full px-3 py-1.5 border border-divider dark:border-divider-dark rounded-md bg-white dark:bg-element-dark text-gray-900 dark:text-content-dark focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary-dark/30 focus:border-primary dark:focus:border-primary-dark outline-none"
                    min="2"
                    max="100"
                    value={rangeMax()}
                    onInput={handleMaxInputChange}
                  />
                </div>
              </div>
              
              {/* 移动端显示当前选择的范围提示 */}
              <div class="md:hidden mt-4 text-sm text-center text-gray-600 dark:text-content-dark-subtle">
                当前选择范围: {rangeMin()}% - {rangeMax()}%
              </div>
              
              {/* 仅在非移动设备上显示滑块UI */}
              <div class="hidden md:block relative pt-8 mt-4" id="percentageSlider">
                {/* 滑块轨道和刻度容器 - 响应式宽度 */}
                <div class="max-w-[640px] w-full mx-auto">
                  {/* 滑块轨道 - 注意轨道宽度要与刻度宽度完全一致 */}
                  <div class="h-2 bg-gray-200 dark:bg-element-dark rounded-full relative w-full">
                    {/* 滑块选中区域 */}
                    <div 
                      class="absolute h-2 bg-primary dark:bg-primary-dark rounded-full" 
                      style={{ 
                        left: getSliderPosition(rangeMin()),
                        right: `calc(100% - ${getSliderPosition(rangeMax())})`
                      }}
                    ></div>
                    
                    {/* 最小值滑块 */}
                    <div 
                      class="absolute w-6 h-6 bg-white dark:bg-element-dark rounded-full shadow border-2 border-primary dark:border-primary-dark cursor-pointer transform -translate-x-1/2 -translate-y-1/2 top-1/2 transition-transform"
                      style={{ 
                        left: getSliderPosition(rangeMin()),
                        zIndex: isDraggingMin() ? 20 : 10,
                        transform: isDraggingMin() ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%)'
                      }}
                      onMouseDown={() => setIsDraggingMin(true)}
                    >
                      {/* 气泡提示，确保与滑块居中对齐 */}
                      <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-white px-2 py-1 rounded text-xs whitespace-nowrap min-w-[40px] text-center">
                        {rangeMin()}%
                      </div>
                    </div>
                    
                    {/* 最大值滑块 */}
                    <div 
                      class="absolute w-6 h-6 bg-white dark:bg-element-dark rounded-full shadow border-2 border-primary dark:border-primary-dark cursor-pointer transform -translate-x-1/2 -translate-y-1/2 top-1/2 transition-transform"
                      style={{ 
                        left: getSliderPosition(rangeMax()),
                        zIndex: isDraggingMax() ? 20 : 10,
                        transform: isDraggingMax() ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%)'
                      }}
                      onMouseDown={() => setIsDraggingMax(true)}
                    >
                      {/* 气泡提示，确保与滑块居中对齐 */}
                      <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-white px-2 py-1 rounded text-xs whitespace-nowrap min-w-[40px] text-center">
                        {rangeMax()}%
                      </div>
                    </div>
                  </div>
                  
                  {/* 刻度标记 - 宽度需与滑块轨道完全一致 */}
                  <div class="h-10 mt-3 relative w-full">
                    {/* 刻度线和标签 */}
                    {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(percent => {
                      return (
                        <div 
                          class="absolute top-0" 
                          style={{ 
                            left: getTickPosition(percent), 
                            transform: 'translateX(-50%)'
                          }}
                        >
                          {/* 刻度线 - 更细、颜色更浅 */}
                          <div class="h-2 w-[1px] bg-gray-200 dark:bg-divider-dark mb-1 mx-auto"></div>
                          {/* 刻度标签 - 更小、颜色更浅、居中对齐 */}
                          <span class="text-[10px] text-gray-400 dark:text-content-dark-subtle block text-center whitespace-nowrap">
                            {percent}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
            
          {/* 文件前缀输入框 - 仅当有多个文件时显示 */}
          {hasMultipleFiles() && (
            <div class="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-4 mb-4 animate-fade-in" style="animation-delay: 0.3s;">
              <label class="block text-base font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-primary dark:text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                文件配置
              </label>
              <div class="flex items-center">
                <div class="w-full">
                  <label class="block text-sm text-gray-600 dark:text-gray-400 mb-2">文件前缀</label>
                  <input 
                    type="text"
                    class="w-full px-3 py-1.5 border border-divider dark:border-divider-dark rounded-md bg-white dark:bg-element-dark text-gray-900 dark:text-content-dark focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary-dark/30 focus:border-primary dark:focus:border-primary-dark outline-none transition-all duration-200"
                    placeholder="可选的文件前缀"
                    value={filePrefix()}
                    onInput={(e) => setFilePrefix(e.target.value)}
                  />
                </div>
              </div>
              <div class="mt-2 text-xs text-gray-500 dark:text-content-dark-subtle">
                文件将以 "{filePrefix() ? filePrefix() + '_' : ''}数值.json" 格式命名
              </div>
            </div>
          )}

          <div class="flex flex-col-reverse md:flex-row md:justify-end space-y-3 space-y-reverse md:space-y-0 md:space-x-4 animate-fade-in" style="animation-delay: 0.4s;">
            <button 
              class="w-full md:w-auto px-5 py-2 bg-gray-200 dark:bg-element-dark text-gray-800 dark:text-content-dark rounded-md hover:bg-gray-300 dark:hover:bg-panel-dark transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-sm"
              onClick={props.onClose}
            >
              取消
            </button>
            <button 
              class="w-full md:w-auto mb-3 md:mb-0 px-5 py-2 bg-primary hover:bg-primary-dark text-white dark:bg-primary-dark dark:hover:bg-primary dark:text-white rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-sm"
              onClick={handleExport}
            >
              导出数据
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExportModal;
