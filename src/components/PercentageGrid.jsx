import { createMemo } from 'solid-js';

function PercentageGrid(props) {
  const percentages = createMemo(() => {
    const results = [];
    for (let i = 1; i <= 99; i++) {
      const value = Math.round((props.baseWidth * i / 100) * 100) / 100;
      results.push({ percent: i, value });
    }
    return results;
  });

  return (
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-medium text-gray-700 dark:text-gray-300">百分比计算结果</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {percentages().map(item => (
          <div class="percent-card bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-all hover:shadow-md hover:-translate-y-0.5">
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">{item.percent}%</div>
            <div class="flex items-center justify-between mt-1">
              <div class="text-lg font-semibold text-gray-800 dark:text-gray-200">{item.value}</div>
              <button 
                class="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors opacity-50 hover:opacity-100"
                onClick={() => props.onCopy(item.value)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PercentageGrid;
