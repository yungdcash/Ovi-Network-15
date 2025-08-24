import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ToastNotification from './ToastNotification';

function ToastContainer({ toasts, onRemoveToast }) {
  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast, index) => (
          <motion.div
            key={toast.id}
            className="pointer-events-auto"
            layout
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{
              layout: { duration: 0.2 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 }
            }}
            style={{
              zIndex: 9999 - index // Ensure newest toasts appear on top
            }}
          >
            <ToastNotification
              {...toast}
              onRemove={onRemoveToast}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ToastContainer;