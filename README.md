# Table Width Calculator | 表格宽度计算器

[English](#english) | [中文](#中文)


<a id="english"></a>
## 🌐 English

### Overview

Table Width Calculator is a modern web application designed to help designers and developers quickly calculate and visualize percentage-based widths. It's particularly useful for responsive design, allowing you to see how different percentage values translate to pixel widths based on a reference container width.

### Features

- **Instant Width Calculation**: Automatically calculates percentage-based widths from 1% to 99%
- **Preset Common Widths**: Quick access to commonly used reference widths (900px, 1000px, 1100px, etc.)
- **Save Results**: Store calculation results for later reference and comparison
- **Export Functionality**: Export results as JSON files with customizable ranges
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing in any environment
- **Responsive Design**: Fully optimized for both desktop and mobile devices
- **Copy to Clipboard**: One-click copy for any calculated value

### Technology Stack

- **Framework**: [SolidJS](https://www.solidjs.com/) - A declarative, efficient and flexible JavaScript library for building user interfaces
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development
- **Build Tool**: [Vite](https://vitejs.dev/) - Next generation frontend tooling
- **State Management**: SolidJS fine-grained reactivity system
- **Storage**: Browser's localStorage for saving user preferences and data

### Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/table-width-calculator.git
   cd table-width-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

### How to Use

1. Enter your reference width in the "Base Width" input field (e.g., 1000px)
2. The table will instantly show calculated widths for percentages from 1% to 99%
3. Click on any value to copy it to clipboard
4. Use the "Save Current Results" button to store calculations for comparison
5. Toggle between showing all results or just the current width using the tabs
6. Click the export button to download the results as JSON files
7. Switch between light and dark mode using the theme toggle button

### License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<a id="中文"></a>
## 🇨🇳 中文

### 概述

表格宽度计算器是一个现代化的网页应用，专为设计师和开发者设计，用于快速计算和可视化基于百分比的宽度。它对响应式设计特别有用，让您能够直观地看到不同百分比值基于参考容器宽度转换为像素宽度的效果。

### 功能特点

- **即时宽度计算**：自动计算从1%到99%的基于百分比的宽度
- **预设常用宽度**：快速访问常用的参考宽度（900px、1000px、1100px等）
- **保存结果**：存储计算结果以供日后参考和比较
- **导出功能**：将结果导出为JSON文件，支持自定义百分比范围
- **深色/浅色模式**：在深色和浅色主题之间切换，适应不同环境的舒适查看体验
- **响应式设计**：针对桌面端和移动端设备进行全面优化
- **复制到剪贴板**：一键复制任何计算值

### 技术栈

- **框架**：[SolidJS](https://www.solidjs.com/) - 一个声明式、高效灵活的JavaScript库，用于构建用户界面
- **样式**：[Tailwind CSS](https://tailwindcss.com/) - 一个实用为先的CSS框架，用于快速UI开发
- **构建工具**：[Vite](https://vitejs.dev/) - 下一代前端工具链
- **状态管理**：SolidJS细粒度响应式系统
- **存储**：浏览器的localStorage，用于保存用户偏好和数据

### 安装和设置

1. **克隆仓库**
   ```bash
   git clone https://github.com/Nirnturt/table-width-calculator.git
   cd table-width-calculator
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或
   yarn install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   # 或
   yarn dev
   ```

4. **构建生产版本**
   ```bash
   npm run build
   # 或
   yarn build
   ```

### 使用方法

1. 在"基准宽度"输入框中输入您的参考宽度（例如1000px）
2. 表格将立即显示从1%到99%的百分比计算宽度
3. 点击任何值可将其复制到剪贴板
4. 使用"暂存当前结果"按钮保存计算结果以便比较
5. 使用标签切换显示所有结果或仅显示当前宽度
6. 点击导出按钮将结果下载为JSON文件
7. 使用主题切换按钮在浅色和深色模式之间切换

### 许可证

本项目采用MIT许可证 - 详情请参阅LICENSE文件。
