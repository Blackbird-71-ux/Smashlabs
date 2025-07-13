// Suppress hydration warnings from browser extensions
// This script runs before React loads to prevent bis_skin_checked warnings

(function() {
  'use strict';
  
  if (typeof window !== 'undefined') {
    // Store original console methods immediately
    const originalError = console.error;
    const originalWarn = console.warn;
    
    // Enhanced suppression function
    function shouldSuppressMessage(message) {
      if (typeof message !== 'string') return false;
      
      const suppressPatterns = [
        'bis_skin_checked',
        'Extra attributes from the server',
        'app-index.js:33 Warning',
        'Warning: Extra attributes',
        'hydration.*bis_skin_checked'
      ];
      
      return suppressPatterns.some(pattern => {
        if (pattern.includes('.*')) {
          // Regex pattern
          return new RegExp(pattern).test(message);
        }
        return message.includes(pattern);
      });
    }
    
    // Override console methods before React loads
    console.error = function(...args) {
      if (shouldSuppressMessage(args[0])) return;
      originalError.apply(console, args);
    };
    
    console.warn = function(...args) {
      if (shouldSuppressMessage(args[0])) return;
      originalWarn.apply(console, args);
    };
    
    // Also try to suppress React DevTools warnings
    Object.defineProperty(window, '__REACT_DEVTOOLS_GLOBAL_HOOK__', {
      get: function() {
        return this._reactDevTools;
      },
      set: function(hook) {
        if (hook && hook.onError) {
          const originalOnError = hook.onError;
          hook.onError = function(error) {
            if (shouldSuppressMessage(error?.message || error?.toString())) {
              return;
            }
            return originalOnError.call(this, error);
          };
        }
        this._reactDevTools = hook;
      }
    });
  }
})(); 