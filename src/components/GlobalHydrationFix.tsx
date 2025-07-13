'use client';

import { useEffect } from 'react';

// Global fix for browser extension hydration warnings
export function GlobalHydrationFix() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Store original console methods
      const originalError = console.error;
      const originalWarn = console.warn;

      // More aggressive message filtering
      const shouldSuppress = (message: any) => {
        if (typeof message !== 'string') return false;
        
        return (
          message.includes('bis_skin_checked') ||
          message.includes('Extra attributes from the server') ||
          (message.includes('Warning:') && message.includes('attributes')) ||
          message.includes('app-index.js:33 Warning') ||
          (message.includes('hydration') && message.includes('bis_skin_checked'))
        );
      };

      // Override console methods
      console.error = function(...args) {
        if (shouldSuppress(args[0])) return;
        originalError.apply(console, args);
      };

      console.warn = function(...args) {
        if (shouldSuppress(args[0])) return;
        originalWarn.apply(console, args);
      };

      // Also suppress React's internal warnings
      const originalReactError = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__?.onError;
      if (originalReactError) {
        (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__.onError = function(error: any) {
          if (shouldSuppress(error?.message || error?.toString())) return;
          return originalReactError.call(this, error);
        };
      }

      // Cleanup function
      return () => {
        console.error = originalError;
        console.warn = originalWarn;
        if (originalReactError) {
          (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__.onError = originalReactError;
        }
      };
    }
  }, []);

  return null;
} 