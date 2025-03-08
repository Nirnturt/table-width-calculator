// 从localStorage加载保存的列
export const loadSavedColumns = () => {
    try {
      const savedData = localStorage.getItem('savedColumns');
      return savedData ? JSON.parse(savedData) : [];
    } catch (error) {
      console.error('Error loading saved columns:', error);
      return [];
    }
  };
  
  // 将列保存到localStorage
  export const saveColumnsToStorage = (columns) => {
    try {
      localStorage.setItem('savedColumns', JSON.stringify(columns));
    } catch (error) {
      console.error('Error saving columns:', error);
    }
  };
  