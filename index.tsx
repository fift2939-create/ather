
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  // إخفاء الـ Loader فوراً كـ Failsafe
  const hideLoader = () => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  };

  // محاولة الإخفاء في أسرع وقت ممكن
  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
    // إخفاء إجباري بعد ثانية واحدة لضمان عدم بقاء الشاشة معلقة
    setTimeout(hideLoader, 1000);
  }
}
