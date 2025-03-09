import { lazy } from 'solid-js';

// 懒加载组件包装函数，添加加载指示器
export function lazyLoad(componentImport, fallback = null) {
  const LazyComponent = lazy(componentImport);
  
  return (props) => (
    <LazyComponent {...props} />
  );
} 