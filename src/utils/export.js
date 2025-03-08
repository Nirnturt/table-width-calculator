// 将数据转换为指定的JSON格式
export const convertToExportFormat = (percentValues) => {
  const result = {};
  
  percentValues.forEach(item => {
    result[`${item.percent}%`] = {
      "$type": "number",
      "$value": item.value,
      "$extensions": {
        "figma": {
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {},
          "hiddenFromPublishing": false
        }
      }
    };
  });
  
  return result;
};

// 创建并下载JSON文件
export const downloadJson = (data, filename) => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  downloadBlob(blob, filename);
};

// 创建并下载Blob
const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  // 清理
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};

// 创建并下载ZIP文件
export const downloadZip = async (files, zipFilename) => {
  // 动态导入JSZip库
  const JSZip = (await import('jszip')).default;
  
  const zip = new JSZip();
  
  // 添加所有文件到zip
  files.forEach(file => {
    zip.file(file.filename, file.content);
  });
  
  // 生成zip并下载
  const content = await zip.generateAsync({ type: 'blob' });
  downloadBlob(content, zipFilename);
};

// 计算指定范围内的百分比值
export const calculatePercentagesInRange = (baseWidth, minPercent, maxPercent) => {
  const results = [];
  for (let i = minPercent; i <= maxPercent; i++) {
    const value = Math.round((baseWidth * i / 100) * 100) / 100;
    results.push({ percent: i, value });
  }
  return results;
};
