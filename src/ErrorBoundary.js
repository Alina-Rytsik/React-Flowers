import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Обновляем состояние, чтобы показать fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Логируем ошибку (можно отправить на сервер)
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#f5f5f5', color: 'red' }}>
          <h2>Что-то пошло не так!</h2>
          <p>Ошибка в приложении. Проверьте консоль для деталей.</p>
          <details>
            <summary>Подробности ошибки</summary>
            <pre>{this.state.error.toString()}</pre>
          </details>
          <button onClick={() => window.location.reload()}>Перезагрузить страницу</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
