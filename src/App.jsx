import { createSignal, onMount } from 'solid-js';
import CombinedResultsTable from './components/CombinedResultsTable';
import PresetWidths from './components/PresetWidths';
import Notification from './components/Notification';
import ExportModal from './components/ExportModal';
import { loadSavedColumns, saveColumnsToStorage } from './utils/storage';
import { getTheme, setTheme, toggleTheme } from './utils/theme';

function App() {
  const [baseWidth, setBaseWidth] = createSignal(1000);
  const [notification, setNotification] = createSignal({ message: '', type: 'success', visible: false });
  const [savedColumns, setSavedColumns] = createSignal([]);
  const [activeTab, setActiveTab] = createSignal('all'); // 'all', 'current', 'saved'
  const [theme, setThemeState] = createSignal(getTheme());
  const [exportModalOpen, setExportModalOpen] = createSignal(false);
  const [isLoaded, setIsLoaded] = createSignal(false); // 用于页面加载动画
  const [isInitializing, setIsInitializing] = createSignal(true); // 用于控制初始渲染

  // 初始化函数
  onMount(() => {
    // 设置初始主题
    setTheme(theme());
    
    // 从localStorage加载保存的列
    const loadedColumns = loadSavedColumns();
    if (loadedColumns && loadedColumns.length > 0) {
      setSavedColumns(loadedColumns);
    }
    
    // 先设置初始化完成
    setTimeout(() => setIsInitializing(false), 50);
    // 然后触发页面加载动画
    setTimeout(() => setIsLoaded(true), 100);
  });

  // 保存当前列
  const saveCurrentColumn = () => {
    const width = parseFloat(baseWidth());
    
    if (!width || isNaN(width) || width <= 0) {
      showNotification('请输入有效的基准宽度', 'error');
      return;
    }
    
    // 检查是否已存在相同的基准宽度
    const existingColumn = savedColumns().find(column => column.baseWidth === width);
    
    if (existingColumn) {
      showNotification('已存在相同的基准宽度，请使用不同的值', 'error');
      return;
    }
    
    // 保存列数据
    const newColumns = [...savedColumns(), { baseWidth: width }];
    setSavedColumns(newColumns);
    saveColumnsToStorage(newColumns);
    
    showNotification('已暂存当前结果');
    
    // 切换到"当前"标签页
    setActiveTab('current');
  };

  // 重置所有暂存列
  const resetSavedColumns = () => {
    if (confirm('确定要重置所有暂存列吗？')) {
      setSavedColumns([]);
      saveColumnsToStorage([]);
      showNotification('已重置所有暂存列');
    }
  };

  // 删除列 - 通过宽度值删除而不是索引
  const deleteColumn = (baseWidth) => {
    console.log(`删除宽度为 ${baseWidth} 的列`);
    
    // 通过宽度值而不是索引来删除列
    const currentColumns = savedColumns();
    console.log('当前列:', currentColumns.map(col => col.baseWidth));
    
    // 使用过滤器根据宽度值删除
    const newColumns = currentColumns.filter(col => col.baseWidth !== baseWidth);
    console.log('删除后的列:', newColumns.map(col => col.baseWidth));
    
    setSavedColumns(newColumns);
    saveColumnsToStorage(newColumns);
    showNotification(`已删除宽度为 ${baseWidth}px 的列`);
  };

  // 复制到剪贴板
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        showNotification('复制成功！');
      })
      .catch(err => {
        showNotification('复制失败，请重试', 'error');
        console.error('无法复制内容: ', err);
      });
  };

  // 显示通知
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type, visible: true });
    
    setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // 切换主题
  const handleThemeToggle = () => {
    const newTheme = toggleTheme();
    setThemeState(newTheme);
  };

  // 打开导出模态框
  const openExportModal = () => {
    setExportModalOpen(true);
  };

  // 关闭导出模态框
  const closeExportModal = () => {
    setExportModalOpen(false);
  };

  return (
    <div class="bg-canvas dark:bg-canvas-dark min-h-screen transition-colors duration-200">
      <Notification 
        message={notification().message} 
        type={notification().type} 
        visible={notification().visible} 
      />

      <ExportModal 
        isOpen={exportModalOpen()} 
        onClose={closeExportModal} 
        onNotification={showNotification}
        currentWidth={baseWidth() && !isNaN(parseFloat(baseWidth())) ? parseFloat(baseWidth()) : null}
        savedColumns={savedColumns()}
      />
      
      <div class="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 md:py-10">
        <div class={`flex justify-between items-center mb-8 transition-all duration-200 ${isLoaded() ? 'opacity-100' : 'opacity-0 translate-y-2'} ${isInitializing() ? 'hidden' : ''}`}>
          <h1 class="text-xl md:text-2xl font-semibold text-content dark:text-content-dark flex items-center gap-2">
            <span class="bg-primary text-white p-1.5 rounded flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </span>
            表格列宽计算器
          </h1>
          
          <div class="flex items-center gap-2">
            <button
              onClick={openExportModal}
              class="btn btn-primary flex items-center gap-1 text-sm"
              title="导出数据"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>导出</span>
            </button>
            
            <button
              onClick={handleThemeToggle}
              class="p-2 rounded-md bg-element dark:bg-element-dark hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="切换主题"
              title="切换主题"
            >
              <span class="block h-5 w-5 flex items-center justify-center text-content dark:text-content-dark">
                {theme() === 'dark' ? '☀️' : '🌙'}
              </span>
            </button>
          </div>
        </div>
        
        <div class={`card p-4 md:p-5 mb-6 md:mb-8 transition-all duration-200 ${isLoaded() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <div class="flex flex-col gap-4">
            <div class="w-full">
              <label for="baseWidth" class="block text-sm font-medium text-content-subtle dark:text-content-dark-subtle mb-1.5">基准宽度 (px)</label>
              <input 
                type="number" 
                id="baseWidth" 
                class="w-full px-3 py-2 border border-divider dark:border-divider-dark bg-white dark:bg-element-dark text-content dark:text-content-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary-dark/30 focus:border-primary dark:focus:border-primary-dark transition-all" 
                value={baseWidth()}
                onInput={(e) => setBaseWidth(e.target.value)}
              />
            </div>
            <div class="flex w-full gap-2">
              <button 
                class="btn btn-primary flex-1"
                onClick={saveCurrentColumn}
              >
                暂存当前结果
              </button>
              <button 
                class="btn btn-secondary flex-1"
                onClick={resetSavedColumns}
              >
                重置暂存列
              </button>
            </div>
          </div>
        </div>

        <PresetWidths 
          currentWidth={baseWidth()} 
          onSelectWidth={(width) => setBaseWidth(width)} 
          isLoaded={isLoaded()} 
          isInitializing={isInitializing()} 
        />

        {/* 标签页切换 */}
        <div class={`card mb-6 overflow-hidden transition-all duration-200 ${isLoaded() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} ${isInitializing() ? 'hidden' : ''}`} style="transition-delay: 0.1s;">
          <div class="tab-container">
            <button 
              class={`tab ${activeTab() === 'all' ? 'tab-active' : 'tab-inactive'}`}
              onClick={() => setActiveTab('all')}
            >
              全部结果
            </button>
            <button 
              class={`tab ${activeTab() === 'current' ? 'tab-active' : 'tab-inactive'}`}
              onClick={() => setActiveTab('current')}
            >
              当前宽度 {baseWidth() && !isNaN(parseFloat(baseWidth())) ? `(${baseWidth()}px)` : ''}
            </button>
          </div>

          <CombinedResultsTable 
            currentWidth={baseWidth() && !isNaN(parseFloat(baseWidth())) ? parseFloat(baseWidth()) : null}
            savedColumns={savedColumns()}
            activeTab={activeTab()}
            onDelete={deleteColumn}
            onCopy={copyToClipboard}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
