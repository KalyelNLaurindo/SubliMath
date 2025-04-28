
# 🧮 SubliMath — Calculadora Científica Avançada (PWA)

![Badge License](https://img.shields.io/badge/license-MIT-green)  
![Badge Status](https://img.shields.io/badge/status-Production-blue)

**SubliMath** é uma calculadora científica **moderna**, **leve** e **offline-first**,
construída com **HTML5**, **CSS3**, **JavaScript ES6+** e **Bootstrap 5**,
projetada para funcionar como um **Progressive Web App (PWA)** — podendo ser **instalada** no celular ou desktop.

---

## 📋 Tabela de Conteúdo

- [Visão Geral](#visão-geral)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Instalação e Uso](#instalação-e-uso)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura e Boas Práticas](#arquitetura-e-boas-práticas)
- [Modo Offline e PWA](#modo-offline-e-pwa)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

---

## ✨ Visão Geral

SubliMath nasceu da ideia de unir:

- **Funcionalidades científicas avançadas** (logaritmos, trigonometria, exponenciais, fatorial)
- **Interface limpa e moderna**, adaptada para mobile
- **Capacidade de funcionamento offline** via **Service Worker** e **manifest.json**

Este projeto é **ideal** para estudantes, desenvolvedores ou qualquer pessoa que precise de uma **calculadora confiável e instalável** no navegador.

---

## 🚀 Funcionalidades Principais

- ➕ **Operações básicas**: Soma, Subtração, Multiplicação, Divisão
- 📐 **Funções científicas**: `sin`, `cos`, `tan`, `log`, `ln`, `√`, `e`, `EXP`, `fatorial`
- 🎯 **Alternância de ângulo**: Graus ↔️ Radianos
- 🧠 **Histórico de cálculos**: Persistente via **localStorage**
- 📱 **Instalável**: Funciona como App nativo no Android, iOS e Desktop
- 🌎 **Modo Offline**: Calculadora continua funcionando sem conexão
- ⚡ **Teclado físico**: Controle por teclado (Enter, Backspace, Números, Operadores)
- 🎨 **Tema escuro moderno** (Dark Mode por padrão)

---

## 📦 Instalação e Uso

### 1. Clonar o repositório
```bash
git clone https://github.com/kalyelnlaurindo/sublimath.git
cd sublimath
```

### 2. Executar localmente
- Abra o arquivo `index.html` no seu navegador favorito
- Ou inicie um servidor local para melhor suporte a Service Workers:
  ```bash
  npx serve .
  ```

### 3. (Opcional) Instalar no Dispositivo
- No Chrome/Edge: Clique no ícone de instalação na barra de endereços
- No Android: Toque em "Adicionar à tela inicial"

---

## 🗂️ Estrutura de Pastas

```bash
SubliMath/
├── src/
│   ├── calculator.js
│   ├── storage.js
│   ├── ui.js
│   ├── keyboard.js
│   ├── test.js
├── icons/
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   └── ...
├── CSS/
│   ├── style.css
├── assets/
├── index.html
├── manifest.json
├── service-worker.js
├── README.md
```

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** — Estrutura semântica
- **CSS3 / Bootstrap 5** — Layout responsivo e estilizado
- **JavaScript ES6+** — Lógica, DOM, LocalStorage
- **PWA Technologies** — Service Worker, Manifest
- **IconKitchen** — Geração de ícones otimizados para multiplataformas

---

## 🧠 Arquitetura e Boas Práticas

- **Calculator** — Avalia expressões matemáticas
- **Expression Parser** — Traduz expressões especiais
- **Storage Manager** — Gerencia histórico local
- **UI Controller** — Separa DOM vs lógica
- **Logger Interno** — Mensagens de log padronizadas
- **Teclado Virtual e Físico** — Suporte completo

---

## 📲 Modo Offline e PWA

- Manifesto configurado (`manifest.json`)
- Cache offline via Service Worker
- Instalável em Android, iOS e Desktop

---

## 🤝 Contribuindo

Sinta-se livre para abrir uma **Issue** ou enviar um **Pull Request**!

1. Faça um **Fork** do projeto
2. Crie uma branch (`git checkout -b feature/nome`)
3. Commit (`git commit -m "feat: minha melhoria"`)
4. Push (`git push origin feature/nome`)
5. Abra um Pull Request 🚀

---

## 📜 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

> SubliMath: Calculadora avançada para quem precisa de mais que as quatro operações.
