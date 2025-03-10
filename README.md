# Table Width Calculator | 表格宽度计算器

<p align="center">
  <a href="#english">English</a> | <a href="#中文">中文</a>
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![SolidJS](https://img.shields.io/badge/SolidJS-2.4.1-blue)](https://www.solidjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.2.1-blue)](https://tailwindcss.com/)

---

<a id="english"></a>
## 🌐 English

A modern, responsive utility for calculating and visualizing table column widths based on percentages. Perfect for UI designers and frontend developers working on responsive layouts.

**[🔗 Live Demo](https://nirn.design/table)** | **[🐞 Report Issues](https://github.com/nirnturt/table-width-calculator/issues)**

![Table Width Calculator Preview](https://github.com/Nirnturt/table-width-calculator/blob/main/src/demo.png)

### ✨ Features

- **Real-time Percentage Calculations**: Instantly convert between percentages and pixel widths
- **Preset Base Widths**: Quick access to commonly used container widths (900px, 1000px, 1100px, etc.)
- **Save & Compare**: Store calculation results for comparison across different base widths
- **Export Options**: Download results as JSON files with customizable percentage ranges
- **Dark Mode Support**: Eye-friendly interface for both day and night work
- **Responsive Design**: Optimized for desktop and mobile devices
- **Copy to Clipboard**: One-click copy for any calculated value
- **Internationalization**: Available in English and Chinese with automatic language detection

### 🔧 Technology Stack

- **Framework**: [SolidJS](https://www.solidjs.com/) - A declarative, efficient and flexible JavaScript library
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for modern designs
- **Build Tool**: [Vite](https://vitejs.dev/) - Next generation frontend tooling
- **State Management**: Fine-grained reactivity with SolidJS signals
- **Storage**: Browser's localStorage for persistent settings and saved columns
- **Internationalization**: Custom i18n implementation with automatic language detection

### 🚀 Getting Started

#### Installation

```bash
# Clone the repository
git clone https://github.com/nirnturt/table-width-calculator.git

# Navigate to project directory
cd table-width-calculator

# Install dependencies
npm install
```

#### Development

```bash
# Start development server
npm run dev
```

#### Building for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### 📖 How to Use

1. Enter a base width (in pixels) in the input field
2. The table will automatically show calculated widths for percentages from 1% to 99%
3. Click on any value to copy it to clipboard
4. Use the "Save Current Result" button to store calculations for comparison
5. Toggle between showing all results or just the current width using the tabs
6. Switch between light and dark modes using the theme toggle
7. Change language using the language switcher

### 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check the [issues page](https://github.com/nirnturt/table-width-calculator/issues).

### 📝 License

This project is [MIT](./LICENSE) licensed.

### 👨‍💻 About

The Table Width Calculator was developed to solve the common challenge faced by UI designers and frontend developers when working with responsive table layouts. When implementing tables with percentage-based widths, it's often difficult to visualize how these percentages translate to actual pixel dimensions at various container widths.

This tool addresses this problem by providing an intuitive interface for calculating and visualizing percentage-based column widths. It's particularly useful for:

- **UI/UX Designers**: Quickly determine appropriate column proportions for table designs
- **Frontend Developers**: Implement responsive tables with precise width calculations
- **Design Teams**: Compare different width configurations side by side
- **Responsive Design Work**: Test how percentage widths appear at different viewport sizes

The project is open source and maintained by the community, with an emphasis on user experience, performance, and accessibility.

---

<a id="中文"></a>
## 🇨🇳 中文

一个现代化、响应式的工具，用于基于百分比计算和可视化表格列宽。为处理响应式布局的UI设计师和前端开发者提供完美解决方案。

**[🔗 在线演示](https://nirn.design/table)** | **[🐞 报告问题](https://github.com/nirnturt/table-width-calculator/issues)**

![表格宽度计算器预览](https://github.com/Nirnturt/table-width-calculator/blob/main/src/demo.png)

### ✨ 特点

- **实时百分比计算**：即时在百分比和像素宽度之间转换
- **预设基准宽度**：快速访问常用容器宽度（900px、1000px、1100px等）
- **保存与比较**：存储计算结果，以便在不同基准宽度间进行比较
- **导出选项**：以JSON格式下载结果，支持自定义百分比范围
- **深色模式支持**：提供适合日夜工作的护眼界面
- **响应式设计**：针对桌面和移动设备进行了优化
- **复制到剪贴板**：一键复制任何计算值
- **国际化支持**：提供中英文界面，自动检测浏览器语言

### 🔧 技术栈

- **框架**：[SolidJS](https://www.solidjs.com/) - 一个声明式、高效且灵活的JavaScript库
- **样式**：[Tailwind CSS](https://tailwindcss.com/) - 实用为先的CSS框架，用于现代设计
- **构建工具**：[Vite](https://vitejs.dev/) - 下一代前端工具链
- **状态管理**：使用SolidJS信号实现细粒度响应式
- **存储**：使用浏览器的localStorage实现持久化设置和保存列
- **国际化**：自定义i18n实现，支持自动语言检测

### 🚀 快速开始

#### 安装

```bash
# 克隆仓库
git clone https://github.com/nirnturt/table-width-calculator.git

# 进入项目目录
cd table-width-calculator

# 安装依赖
npm install
```

#### 开发

```bash
# 启动开发服务器
npm run dev
```

#### 生产构建

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 📖 使用方法

1. 在输入框中输入基准宽度（像素）
2. 表格将自动显示从1%到99%的百分比计算宽度
3. 点击任何值可将其复制到剪贴板
4. 使用"暂存当前结果"按钮保存计算结果以便比较
5. 使用标签切换显示所有结果或仅显示当前宽度
6. 使用主题切换按钮在浅色和深色模式之间切换
7. 使用语言切换器更改界面语言

### 🤝 贡献

欢迎贡献、提问和功能请求！请随时查看[问题页面](https://github.com/nirnturt/table-width-calculator/issues)。

### 📝 许可证

本项目采用[MIT](./LICENSE)许可证。

### 👨‍💻 关于

表格宽度计算器的开发旨在解决UI设计师和前端开发者在处理响应式表格布局时遇到的常见挑战。在实现基于百分比宽度的表格时，通常很难直观地了解这些百分比在各种容器宽度下如何转换为实际的像素尺寸。

这个工具通过提供一个直观的界面来计算和可视化基于百分比的列宽，解决了这个问题。它特别适用于：

- **UI/UX设计师**：快速确定表格设计的适当列比例
- **前端开发者**：使用精确的宽度计算实现响应式表格
- **设计团队**：并排比较不同的宽度配置
- **响应式设计工作**：测试百分比宽度在不同视口大小下的显示效果

该项目是开源的，由社区维护，注重用户体验、性能和可访问性。
