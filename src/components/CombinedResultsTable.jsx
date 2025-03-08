import { createMemo, For, Show, createSignal, createEffect, onMount } from 'solid-js';

function CombinedResultsTable(props) {
  const [copiedValue, setCopiedValue] = createSignal(null);
  const [animatedRows, setAnimatedRows] = createSignal({});
  // 预先计算的表格数据
  const [precomputedData, setPrecomputedData] = createSignal({});

  // 预计算所有百分比值
  createEffect(() => {
    const columns = displayColumns();
    const percentages = percentageRange();
    const data = {};
    
    // 预先计算所有可能的值
    columns.forEach(column => {
      data[column.baseWidth] = {};
      percentages.forEach(percent => {
        // 精确计算百分比值
        data[column.baseWidth][percent] = Math.round((column.baseWidth * percent / 100) * 100) / 100;
      });
    });
    
    setPrecomputedData(data);
  });

  // 在组件挂载时预初始化所有行为已动画状态
  onMount(() => {
    const rows = {};
    for (let i = 0; i < 99; i++) {
      rows[i] = true;
    }
    setAnimatedRows(rows);
  });

  // 处理复制操作并显示视觉反馈
  const handleCopy = (value) => {
    props.onCopy(value);
    setCopiedValue(value);
    setTimeout(() => setCopiedValue(null), 1500);
  };

  // 为每一行添加入场动画 - 性能优化版本
  const getRowAnimation = (index) => {
    if (animatedRows()[index]) return '';
    
    // 标记此行已添加动画 - 降低延迟
    setTimeout(() => {
      setAnimatedRows(prev => ({...prev, [index]: true}));
    }, index * 5); // 从20ms减少到5ms
    
    return 'opacity-0 translate-y-1'; // 减小位移幅度提高性能
  };

  // 计算当前宽度的百分比值
  const currentPercentages = createMemo(() => {
    // 如果currentWidth为null或NaN，返回空数组
    if (props.currentWidth === null || isNaN(props.currentWidth)) {
      return [];
    }
    
    const results = [];
    for (let i = 1; i <= 99; i++) {
      const value = Math.round((props.currentWidth * i / 100) * 100) / 100;
      results.push({ percent: i, value });
    }
    return results;
  });

  // 决定显示哪些列
  const displayColumns = createMemo(() => {
    // 如果是当前标签页且currentWidth为null，显示空数组
    if (props.activeTab === 'current' && (props.currentWidth === null || isNaN(props.currentWidth))) {
      return [];
    }
    
    if (props.activeTab === 'current') {
      return [{ baseWidth: parseFloat(props.currentWidth) }];
    } else { // 'all'
      // 如果currentWidth为null，只显示保存的列
      if (props.currentWidth === null || isNaN(props.currentWidth)) {
        return props.savedColumns;
      }
      
      // 检查当前宽度是否已经在保存列中
      const currentWidth = parseFloat(props.currentWidth);
      const currentExists = props.savedColumns.some(col => col.baseWidth === currentWidth);
      return currentExists 
        ? props.savedColumns 
        : [{ baseWidth: currentWidth, isCurrent: true }, ...props.savedColumns];
    }
  });

  // 检查是否有暂存列
  const hasSavedColumns = createMemo(() => props.savedColumns.length > 0);

  // 计算要显示的百分比范围
  const percentageRange = createMemo(() => {
    // 默认显示所有百分比
    return Array.from({ length: 99 }, (_, i) => i + 1);
  });

  // 获取预计算的值
  const getValueForCell = (baseWidth, percent) => {
    if (precomputedData()[baseWidth] && precomputedData()[baseWidth][percent] !== undefined) {
      return precomputedData()[baseWidth][percent];
    }
    // 如果没有预计算值，则重新计算
    return Math.round((baseWidth * percent / 100) * 100) / 100;
  };

  // 计算单元格样式
  const getCellClass = (percent, isCurrent = false) => {
    let baseClass = "px-4 py-2 whitespace-nowrap text-sm transition-all duration-200";
    
    // 基础背景色
    if (percent % 2 === 0) {
      baseClass += " bg-gray-50 dark:bg-gray-800";
    } else {
      baseClass += " bg-white dark:bg-gray-900";
    }
    
    // 当前列高亮
    if (isCurrent) {
      baseClass += " bg-blue-50 dark:bg-blue-900";
    }
    
    // 特殊百分比高亮
    if (percent === 25 || percent === 50 || percent === 75 || percent === 100) {
      baseClass += " font-medium";
    }

    // 文字颜色
    baseClass += " text-gray-700 dark:text-gray-300";
    
    return baseClass;
  };

  // 获取百分比分组 - 修改为新的分组方式
  const getPercentageGroups = () => {
    const commonGroup = currentPercentages().filter(item => item.percent >= 1 && item.percent <= 30);
    const otherGroup = currentPercentages().filter(item => item.percent > 30);
    
    return {
      commonGroup,
      otherGroup
    };
  };

  // 根据百分比获取卡片颜色 - 统一卡片样式
  const getCardColor = (percent) => {
    if (percent === 25 || percent === 50 || percent === 75 || percent === 100) {
      return "bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800";
    } else {
      return "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700";
    }
  };

  // 处理删除按钮点击 - 传递宽度值而不是索引
  const handleDelete = (width, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    props.onDelete(width);
  };

  // 重置动画状态，用于标签页切换
  const resetAnimations = () => {
    setAnimatedRows({});
  };

  // 检查当前列或保存列是否可用
  const hasDisplayableData = createMemo(() => {
    if (props.currentWidth !== null && !isNaN(props.currentWidth)) {
      return true;
    }
    return props.savedColumns.length > 0;
  });

  return (
    <Show 
      when={props.activeTab === 'current'} 
      fallback={
        <Show 
          when={hasDisplayableData()}
          fallback={
            <div class="p-8 text-center text-gray-500 dark:text-gray-400 animate-fade-in">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z" />
              </svg>
              <p>请在上方输入有效的基准宽度以查看计算结果</p>
            </div>
          }
        >
          <div class="table-container">
            <table class="min-w-full">
              <thead>
                <tr>
                  <th class="table-sticky left-0 bg-panel dark:bg-panel-dark">
                    百分比
                  </th>
                  <For each={displayColumns()}>
                    {(column, columnIndex) => (
                      <th class={column.isCurrent ? 'text-primary dark:text-primary-dark' : ''}>
                        <div class="flex items-center gap-2">
                          <span class="transition-transform duration-200 group-hover:scale-105">宽度 {column.baseWidth}px</span>
                          <Show when={!column.isCurrent && props.activeTab !== 'current'}>
                            <button 
                              class="text-content-subtle hover:text-danger transition-colors duration-200 opacity-0 group-hover:opacity-100"
                              onClick={(e) => handleDelete(column.baseWidth, e)}
                              title="删除此列"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                              </svg>
                            </button>
                          </Show>
                        </div>
                      </th>
                    )}
                  </For>
                </tr>
              </thead>
              <tbody>
                <For each={percentageRange()}>
                  {(percent, index) => (
                    <tr>
                      <td class="table-sticky left-0 bg-white dark:bg-canvas-dark font-medium">
                        {percent}%
                      </td>
                      
                      <For each={displayColumns()}>
                        {(column) => {
                          const value = getValueForCell(column.baseWidth, percent);
                          return (
                            <td class={column.isCurrent ? 'bg-primary-subtle/30 dark:bg-primary-dark/10' : ''}>
                              <div class="flex items-center gap-2 group">
                                <span class={`${copiedValue() === value ? 'text-primary dark:text-primary-dark font-medium' : 'text-content dark:text-content-dark'}`}>
                                  {value}
                                </span>
                                <button 
                                  class={`hover:text-primary dark:hover:text-primary-dark
                                        transition-colors duration-200 opacity-50 group-hover:opacity-100
                                        ${copiedValue() === value ? 'text-success dark:text-success-dark opacity-100' : 'text-content-subtle dark:text-content-dark-subtle'}`}
                                  onClick={() => handleCopy(value)}
                                  title="复制此值"
                                >
                                  {copiedValue() === value ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                    </svg>
                                  ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                    </svg>
                                  )}
                                </button>
                              </div>
                            </td>
                          );
                        }}
                      </For>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </Show>
      }
    >
      {/* 卡片视图 - 只在当前宽度标签页显示 */}
      <Show 
        when={props.currentWidth !== null && !isNaN(props.currentWidth)}
        fallback={
          <div class="p-8 text-center text-content-subtle dark:text-content-dark-subtle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto mb-3 text-content-subtle dark:text-content-dark-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z" />
            </svg>
            <p>请在上方输入有效的基准宽度以查看计算结果</p>
          </div>
        }
      >
        <div class="p-5">
          <div class="mb-6">
            <h3 class="text-base font-medium text-content dark:text-content-dark mb-3">常用百分比 (1% - 30%)</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              <For each={getPercentageGroups().commonGroup}>
                {(item) => (
                  <div 
                    class="card card-hover p-3 cursor-pointer"
                    onClick={() => handleCopy(item.value)}
                    title={`点击复制: ${item.value}`}
                  >
                    <div class="flex justify-between items-center mb-1.5">
                      <span class="font-medium text-content dark:text-content-dark text-sm">{item.percent}%</span>
                      <div class={`transition-all duration-200 
                                  ${copiedValue() === item.value 
                                    ? 'text-success opacity-100' 
                                    : 'text-primary opacity-0 group-hover:opacity-70'}`}
                      >
                        {copiedValue() === item.value ? (
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div class={`text-lg font-medium dark:text-content-dark
                               ${copiedValue() === item.value ? 'text-primary dark:text-primary-dark' : ''}`}>
                      {item.value}
                    </div>
                    <div class="text-xs text-content-subtle dark:text-content-dark-subtle mt-1">基于 {props.currentWidth}px</div>
                  </div>
                )}
              </For>
            </div>
          </div>

          <div>
            <h3 class="text-base font-medium text-content dark:text-content-dark mb-3">其他百分比 (31% - 99%)</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              <For each={getPercentageGroups().otherGroup}>
                {(item) => (
                  <div 
                    class="card card-hover p-3 cursor-pointer"
                    onClick={() => handleCopy(item.value)}
                    title={`点击复制: ${item.value}`}
                  >
                    <div class="flex justify-between items-center mb-1.5">
                      <span class="font-medium text-content dark:text-content-dark text-sm">{item.percent}%</span>
                      <div class={`transition-all duration-200 
                                  ${copiedValue() === item.value 
                                    ? 'text-success opacity-100' 
                                    : 'text-primary opacity-0 group-hover:opacity-70'}`}
                      >
                        {copiedValue() === item.value ? (
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div class={`text-lg font-medium dark:text-content-dark
                               ${copiedValue() === item.value ? 'text-primary dark:text-primary-dark' : ''}`}>
                      {item.value}
                    </div>
                    <div class="text-xs text-content-subtle dark:text-content-dark-subtle mt-1">基于 {props.currentWidth}px</div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </Show>
    </Show>
  );
}

export default CombinedResultsTable;
