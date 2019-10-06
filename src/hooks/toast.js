import { useState, useEffect } from 'react';

const useToast = toast => {
  const [toasts, setToast] = useState([]);

  useEffect(() => {
    setToast([toast])
  },[toast]);

  const handleDismiss = () => {
    if (toasts[0].onDismiss) {
      toasts[0].onDismiss()
    }
    setToast([])
  }
  return { toast, setToast, handleDismiss };
}


export default useToast
