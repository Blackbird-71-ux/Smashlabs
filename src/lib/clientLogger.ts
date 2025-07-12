// Client-side logging system for frontend
interface LogEvent {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: Date;
  metadata?: Record<string, any>;
  sessionId?: string;
  url?: string;
  userAgent?: string;
}

class ClientLogger {
  private sessionId: string;
  private enabledLevels: Set<string>;
  private logBuffer: LogEvent[] = [];
  private maxBufferSize = 100;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.enabledLevels = new Set(
      process.env.NODE_ENV === 'production' 
        ? ['warn', 'error'] 
        : ['debug', 'info', 'warn', 'error']
    );
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private createLogEvent(level: LogEvent['level'], message: string, metadata?: Record<string, any>): LogEvent {
    return {
      level,
      message,
      timestamp: new Date(),
      metadata,
      sessionId: this.sessionId,
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
    };
  }

  private addToBuffer(event: LogEvent): void {
    this.logBuffer.push(event);
    if (this.logBuffer.length > this.maxBufferSize) {
      this.logBuffer.shift();
    }
  }

  private formatMessage(event: LogEvent): string {
    const timestamp = event.timestamp.toISOString();
    const metadata = event.metadata ? JSON.stringify(event.metadata) : '';
    return `[${timestamp}] [${event.level.toUpperCase()}] ${event.message} ${metadata}`;
  }

  private shouldLog(level: string): boolean {
    return this.enabledLevels.has(level);
  }

  private consoleLog(event: LogEvent): void {
    if (!this.shouldLog(event.level)) return;

    const message = this.formatMessage(event);
    
    switch (event.level) {
      case 'debug':
        console.debug(message);
        break;
      case 'info':
        console.info(message);
        break;
      case 'warn':
        console.warn(message);
        break;
      case 'error':
        console.error(message);
        break;
    }
  }

  private async sendToServer(event: LogEvent): Promise<void> {
    // Only send warn and error events to server
    if (event.level !== 'warn' && event.level !== 'error') return;

    try {
      // In production, you might want to send to a logging service
      if (process.env.NODE_ENV === 'production') {
        await fetch('/api/client-logs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event)
        });
      }
    } catch (error) {
      // Don't log errors about logging - just fail silently
    }
  }

  debug(message: string, metadata?: Record<string, any>): void {
    const event = this.createLogEvent('debug', message, metadata);
    this.addToBuffer(event);
    this.consoleLog(event);
  }

  info(message: string, metadata?: Record<string, any>): void {
    const event = this.createLogEvent('info', message, metadata);
    this.addToBuffer(event);
    this.consoleLog(event);
  }

  warn(message: string, metadata?: Record<string, any>): void {
    const event = this.createLogEvent('warn', message, metadata);
    this.addToBuffer(event);
    this.consoleLog(event);
    this.sendToServer(event);
  }

  error(message: string, metadata?: Record<string, any>): void {
    const event = this.createLogEvent('error', message, metadata);
    this.addToBuffer(event);
    this.consoleLog(event);
    this.sendToServer(event);
  }

  // Helper methods for common scenarios
  apiCall(method: string, url: string, status: number, duration: number, metadata?: Record<string, any>): void {
    this.info(`API Call: ${method} ${url} - ${status} (${duration}ms)`, metadata);
  }

  userAction(action: string, metadata?: Record<string, any>): void {
    this.info(`User Action: ${action}`, metadata);
  }

  performance(operation: string, duration: number, metadata?: Record<string, any>): void {
    this.debug(`Performance: ${operation} took ${duration}ms`, metadata);
  }

  validation(field: string, error: string, metadata?: Record<string, any>): void {
    this.warn(`Validation Error: ${field} - ${error}`, metadata);
  }

  // Get recent logs for debugging
  getRecentLogs(): LogEvent[] {
    return [...this.logBuffer];
  }

  // Clear the buffer
  clearBuffer(): void {
    this.logBuffer = [];
  }
}

// Create singleton instance
const clientLogger = new ClientLogger();

export default clientLogger;

// Export helper functions for easier use
export const { debug, info, warn, error } = clientLogger;
export const logApiCall = clientLogger.apiCall.bind(clientLogger);
export const logUserAction = clientLogger.userAction.bind(clientLogger);
export const logPerformance = clientLogger.performance.bind(clientLogger);
export const logValidation = clientLogger.validation.bind(clientLogger); 