// Interface for storage operations
class StorageManager {
  static instance;
  localStorageKey = 'calculatorHistory';
  maxHistoryItems = 100;

  constructor() {
    Logger.info('StorageManager instance created');
  }

  static getInstance() {
    if (!StorageManager.instance) {
      Logger.info('Creating new StorageManager instance');
      StorageManager.instance = new StorageManager();
    } else {
      Logger.info('Reusing existing StorageManager instance');
    }
    return StorageManager.instance;
  }

  loadHistory() {
    Logger.info('Attempting to load history');
    try {
      const data = localStorage.getItem(this.localStorageKey);
      if (!data) {
        Logger.warn('No history found in localStorage');
        return [];
      }

      const parsedData = JSON.parse(data).map(item => ({
        ...item,
        timestamp: new Date(item.timestamp) // Convertendo timestamp para objeto Date
      }));

      Logger.info('History loaded successfully');
      return this.validateHistoryData(parsedData);
    } catch (error) {
      Logger.error(`Failed to load history: ${error.message}`);
      return [];
    }
  }

  saveHistory(history) {
    Logger.info('Attempting to save history');
    try {
      if (!this.isValidHistory(history)) {
        Logger.warn('Invalid history format detected');
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
    Logger.info('Attempting to clear history');
    try {
      localStorage.removeItem(this.localStorageKey);
      Logger.info('History cleared successfully');
    } catch (error) {
      Logger.error(`Failed to clear history: ${error.message}`);
    }
  }

  validateHistoryData(data) {
    Logger.info('Validating history data');
    if (!Array.isArray(data)) {
      Logger.warn('Invalid history data format: not an array');
      return [];
    }

    const validData = data.filter(item => {
      const isValidTimestamp = 
        (typeof item.timestamp === 'string' && !isNaN(Date.parse(item.timestamp))) || 
        item.timestamp instanceof Date;

      return item.calculation &&
             typeof item.result === 'number' &&
             isValidTimestamp;
    });

    Logger.info(`Validation complete: ${validData.length} valid items found`);
    return validData;
  }

  isValidHistory(history) {
    Logger.info('Checking if history is valid');
    const isValid = Array.isArray(history) &&
      history.every(item =>
        item.calculation &&
        typeof item.result === 'number' &&
        item.timestamp instanceof Date
      );

    Logger.info(`History validation result: ${isValid}`);
    return isValid;
  }

  trimHistory(history) {
    Logger.info('Trimming history to max allowed items');
    const trimmed = history.slice(-this.maxHistoryItems);
    Logger.info(`History trimmed to ${trimmed.length} items`);
    return trimmed;
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
    Logger.info('Running StorageManager tests');
    this.testSingleton();
    this.testSaveAndLoad();
    this.testInvalidData();
    this.testClearHistory();
    Logger.info('All tests completed');
  }

  static testSingleton() {
    Logger.info('Testing Singleton pattern');
    const instance1 = StorageManager.getInstance();
    const instance2 = StorageManager.getInstance();
    console.assert(instance1 === instance2, 'Singleton pattern test failed');
    Logger.info('Singleton pattern test passed');
  }

  static testSaveAndLoad() {
    Logger.info('Testing save and load functionality');
    const manager = StorageManager.getInstance();
    const testData = [{
      calculation: '2+2',
      result: 4,
      timestamp: new Date()
    }];

    manager.saveHistory(testData);
    const loaded = manager.loadHistory();
    console.assert(loaded.length === 1, 'Save and load test failed');
    Logger.info('Save and load test passed');
  }

  static testInvalidData() {
    Logger.info('Testing invalid data handling');
    const manager = StorageManager.getInstance();
    try {
      manager.saveHistory([{ invalid: 'data' }]);
      console.assert(false, 'Invalid data validation failed');
    } catch (error) {
      console.assert(error instanceof StorageError, 'Error handling test failed');
      Logger.info('Invalid data handling test passed');
    }
  }

  static testClearHistory() {
    Logger.info('Testing clear history functionality');
    const manager = StorageManager.getInstance();
    manager.clearHistory();
    const history = manager.loadHistory();
    console.assert(history.length === 0, 'Clear history test failed');
    Logger.info('Clear history test passed');
  }
}

export { StorageManager, Logger };

export class CustomStorageManager {
  constructor() {
    this.manager = StorageManager.getInstance(); // Reutilizando a instância de StorageManager
  }

  loadHistory() {
    Logger.info('[CustomStorageManager] Delegando carregamento para StorageManager...');
    return this.manager.loadHistory(); // Delegando para StorageManager
  }

  saveHistory(history) {
    Logger.info('[CustomStorageManager] Delegando salvamento para StorageManager...');
    this.manager.saveHistory(history); // Delegando para StorageManager
  }
}

// Consolidar todas as exportações em uma única declaração
export { StorageManager, Logger, CustomStorageManager };
