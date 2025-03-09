/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import App from './App';

// 导入i18n配置（确保在App前导入）
import './i18n';

render(() => <App />, document.getElementById('root'));
