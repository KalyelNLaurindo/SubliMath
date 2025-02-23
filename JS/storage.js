/******************************************************
 * storage.js
 * Responsável por gerenciar histórico, salvar e carregar
 * dados no localStorage, bem como um sistema simples de log.
 ******************************************************/

class StorageManager {
    constructor() {
      this.localStorageKey = 'calculatorHistory';
    }
  
    /**
     * Retorna o histórico salvo no localStorage em formato de array.
     * @returns {Array<string>}
     */
    loadHistory() {
      try {
        const data = localStorage.getItem(this.localStorageKey);
        if (data) {
          console.log('[StorageManager] Histórico carregado com sucesso.');
          return JSON.parse(data);
        }
        return [];
      } catch (error) {
        console.error('[StorageManager] Erro ao carregar histórico:', error);
        return [];
      }
    }
  
    /**
     * Salva o histórico (array de strings) no localStorage.
     * @param {Array<string>} history
     */
    saveHistory(history) {
      try {
        localStorage.setItem(this.localStorageKey, JSON.stringify(history));
        console.log('[StorageManager] Histórico salvo com sucesso.');
      } catch (error) {
        console.error('[StorageManager] Erro ao salvar histórico:', error);
      }
    }
  }
  
  /**
   * Logger simples para exibir mensagens de log no console.
   * Poderia ser expandido para enviar logs a um servidor, etc.
   */
  class Logger {
    static info(message) {
      console.log(`[INFO] ${message}`);
    }
  
    static error(message) {
      console.error(`[ERROR] ${message}`);
    }
  
    static warn(message) {
      console.warn(`[WARN] ${message}`);
    }
  }
  
  // Exporta classes para uso externo
  window.StorageManager = StorageManager;
  window.Logger = Logger;
  