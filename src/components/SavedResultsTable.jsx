import { createMemo, Show } from 'solid-js';

function SavedResultsTable(props) {
  const hasSavedColumns = createMemo(() => props.savedColumns.length > 0);

  return (
    <Show when={hasSavedColumns()}>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mt-8">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-700 dark:text-gray-300">暂存结果</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-800">
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider table-sticky left-0 bg-gray-100 dark:bg-gray-800 z-10">百分比</th>
                {props.savedColumns.map((column, index) => (
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider group">
                    <div class="flex items-center gap-2">
                      <span>宽度 {column.baseWidth}px</span>
                      <button 
                        class="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                        onClick={() => props.onDelete(column.baseWidth)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 99 }, (_, i) => i + 1).map(percent => (
                <tr class={percent % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}>
                  <td class={`px-4 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 table-sticky left-0 z-10 ${percent % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`}>
                    {percent}%
                  </td>
                  
                  {props.savedColumns.map(column => {
                    const value = Math.round((column.baseWidth * percent / 100) * 100) / 100;
                    return (
                      <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        <div class="flex items-center gap-2">
                          <span>{value}</span>
                          <button 
                            class="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors opacity-50 hover:opacity-100"
                            onClick={() => props.onCopy(value)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Show>
  );
}

export default SavedResultsTable;
