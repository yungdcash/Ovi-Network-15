import { useState, useCallback } from 'react';

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = ++toastId;
    const newToast = {
      id,
      type: 'info',
      duration: 5000,
      persistent: false,
      ...toast
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-remove non-persistent toasts
    if (!newToast.persistent && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const updateToast = useCallback((id, updates) => {
    setToasts(prev => prev.map(toast => 
      toast.id === id ? { ...toast, ...updates } : toast
    ));
  }, []);

  // Convenience methods
  const success = useCallback((message, options = {}) => {
    return addToast({
      type: 'success',
      title: 'Success',
      message,
      ...options
    });
  }, [addToast]);

  const error = useCallback((message, options = {}) => {
    return addToast({
      type: 'error',
      title: 'Error',
      message,
      ...options
    });
  }, [addToast]);

  const warning = useCallback((message, options = {}) => {
    return addToast({
      type: 'warning',
      title: 'Warning',
      message,
      ...options
    });
  }, [addToast]);

  const info = useCallback((message, options = {}) => {
    return addToast({
      type: 'info',
      title: 'Information',
      message,
      ...options
    });
  }, [addToast]);

  const loading = useCallback((message, options = {}) => {
    return addToast({
      type: 'loading',
      title: 'Loading',
      message,
      persistent: true,
      ...options
    });
  }, [addToast]);

  const promise = useCallback(async (promise, options = {}) => {
    const {
      loading: loadingMessage = 'Loading...',
      success: successMessage = 'Success!',
      error: errorMessage = 'Something went wrong'
    } = options;

    const loadingId = loading(loadingMessage);

    try {
      const result = await promise;
      removeToast(loadingId);
      success(typeof successMessage === 'function' ? successMessage(result) : successMessage);
      return result;
    } catch (err) {
      removeToast(loadingId);
      error(typeof errorMessage === 'function' ? errorMessage(err) : errorMessage);
      throw err;
    }
  }, [loading, success, error, removeToast]);

  return {
    toasts,
    addToast,
    removeToast,
    removeAllToasts,
    updateToast,
    success,
    error,
    warning,
    info,
    loading,
    promise
  };
}