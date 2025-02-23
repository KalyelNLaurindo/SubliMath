// Interface for storage operations
class StorageManager {
  static instance;
  localStorageKey = 'calculatorHistory';
  maxHistoryItems = 100;

  constructor() {}

  static getInstance() {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  loadHistory() {
    try {
      const data = localStorage.getItem(this.localStorageKey);
      if (!data) return [];
      
      const parsedData = JSON.parse(data);
      Logger.info('History loaded successfully');
      return this.validateHistoryData(parsedData);
    } catch (error) {
      Logger.error(`Failed to load history: ${error.message}`);
      return [];
    }
  }

  saveHistory(history) {
    try {
      if (!this.isValidHistory(history)) {
        throw new Error('Invalid history format');
      }

      const trimmedHistory = this.trimHistory(history);
      localStorage.setItem(this.localStorageKey, JSON.stringify(trimmedHistory));
      Logger.info('History saved successfully');
    } catch (error) {
      Logger.error(`Failed to save history: ${error.message}`);
      throw new StorageError('SaveHistoryError', error.message);
    }
  }

  clearHistory() {
    try {
      localStorage.removeItem(this.localStorageKey);
      Logger.info('History cleared successfully');
    } catch (error) {
      Logger.error(`Failed to clear history: ${error.message}`);
    }
  }

  validateHistoryData(data) {
    if (!Array.isArray(data)) return [];
    
    return data.filter(item => 
      item.calculation && 
      typeof item.result === 'number' &&
      item.timestamp
    );
  }

  isValidHistory(history) {
    return Array.isArray(history) && 
           history.every(item => 
             item.calculation && 
             typeof item.result === 'number' &&
             item.timestamp instanceof Date
           );
  }

  trimHistory(history) {
    return history.slice(-this.maxHistoryItems);
  }
}

class StorageError extends Error {
  constructor(name, message) {
    super(message);
    this.name = name;
  }
}

class ConsoleLogStrategy {
  log(message) {
    console.log(message);
  }
}

class Logger {
  static strategy = new ConsoleLogStrategy();

  static setStrategy(strategy) {
    Logger.strategy = strategy;
  }

  static info(message) {
    this.strategy.log(`[INFO] ${message}`);
  }

  static error(message) {
    this.strategy.log(`[ERROR] ${message}`);
  }

  static warn(message) {
    this.strategy.log(`[WARN] ${message}`);
  }
}

class StorageManagerTests {
  static runTests() {
    this.testSingleton();
    this.testSaveAndLoad();
    this.testInvalidData();
    this.testClearHistory();
  }

  static testSingleton() {
    const instance1 = StorageManager.getInstance();
    const instance2 = StorageManager.getInstance();
    console.assert(instance1 === instance2, 'Singleton pattern test failed');
  }

  static testSaveAndLoad() {
    const manager = StorageManager.getInstance();
    const testData = [{
      calculation: '2+2',
      result: 4,
      timestamp: new Date()
    }];
    
    manager.saveHistory(testData);
    const loaded = manager.loadHistory();
    console.assert(loaded.length === 1, 'Save and load test failed');
  }

  static testInvalidData() {
    const manager = StorageManager.getInstance();
    try {
      manager.saveHistory([{invalid: 'data'}]);
      console.assert(false, 'Invalid data validation failed');
    } catch (error) {
      console.assert(error instanceof StorageError, 'Error handling test failed');
    }
  }

  static testClearHistory() {
    const manager = StorageManager.getInstance();
    manager.clearHistory();
    const history = manager.loadHistory();
    console.assert(history.length === 0, 'Clear history test failed');
  }
}

export { StorageManager, Logger, StorageManagerTests };
