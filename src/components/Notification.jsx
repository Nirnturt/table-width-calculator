import { createEffect, createSignal } from 'solid-js';

function Notification(props) {
  const [isVisible, setIsVisible] = createSignal(false);
  
  // 添加延迟动画效果
  createEffect(() => {
    if (props.visible) {
      setIsVisible(true);
    } else {
      // 延迟移除DOM元素，让动画有时间完成
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  });

  return (
    <div 
      class={`fixed top-4 right-4 px-4 py-3 rounded-md shadow-lg transform transition-all duration-300 z-50 ${
        !isVisible() && !props.visible ? 'hidden' : 'flex'
      } items-center gap-2 ${
        props.type === 'success' 
          ? 'bg-green-500 dark:bg-green-600 text-white' 
          : 'bg-red-500 dark:bg-red-600 text-white'
      } ${props.visible 
        ? 'opacity-100 translate-y-0 scale-100' 
        : 'opacity-0 -translate-y-5 scale-95 pointer-events-none'}`}
    >
      <div class="mr-1 flex-shrink-0">
        {props.type === 'success' ? (
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        )}
      </div>
      <span class="flex-grow">{props.message}</span>
    </div>
  );
}

export default Notification;
  