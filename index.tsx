
import React, { StrictMode, ReactNode, ErrorInfo } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Critical Runtime Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6 text-center" dir="rtl">
          <div className="max-w-md bg-slate-800 p-10 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold text-red-400 mb-4">حدث خطأ تقني مفاجئ</h2>
            <p className="text-slate-400 mb-6 font-tajawal">واجهنا صعوبة في معالجة البيانات، يرجى إعادة تحميل الصفحة للمتابعة.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-8 py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition-colors"
            >
              إعادة التحميل
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  console.error("Failed to find root element");
}
