# SubliMath - Calculadora Avançada

Este projeto é uma **Calculadora Avançada** construída com **HTML, CSS, JavaScript** e **Bootstrap**, possuindo recursos de **PWA** (Progressive Web App). A calculadora suporta funções matemáticas comuns (soma, subtração, multiplicação, divisão), operadores avançados (fatorial, seno, cosseno, radianos vs. graus, etc.) e armazena o histórico de operações no **localStorage**.

---

## **Índice**

- [Visão Geral](#visão-geral)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Instalação e Uso](#instalação-e-uso)
- [Como Usar a Calculadora](#como-usar-a-calculadora)
- [Arquitetura e Organização (SOLID/Clean Code)](#arquitetura-e-organização-solidclean-code)
- [PWA (Progressive Web App)](#pwa-progressive-web-app)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

---

## **Visão Geral**

O **SubliMath** nasceu da necessidade de uma calculadora moderna que contempla funções avançadas (log, ln, trigonometria, fatorial, etc.), além de uma interface agradável e um **modo offline** graças ao **PWA**.

![SubliMath Screenshot](assets/screenshot.png "Exemplo de interface SubliMath")  

---

## **Funcionalidades Principais**

1. **Operações Básicas**  
   Soma, subtração, multiplicação, divisão, porcentagem, etc.

2. **Funções Avançadas**  
   - Seno (`sin`), cosseno (`cos`), tangente (`tan`), logaritmos (`log`, `ln`), exponenciais (`EXP`, `e`), fatorial (`!`), etc.  
   - Alternância entre **Graus (Deg)** e **Radianos (Rad)**.

3. **Histórico de Operações**  
   - Registro de cálculos armazenado em **localStorage**, preservando dados mesmo ao fechar o navegador.

4. **PWA - Modo Offline**  
   - Suporte a **Service Worker** e **manifest.json**, permitindo “instalar” o aplicativo no celular e usá-lo offline.

5. **Layout Responsivo**  
   - Adaptado para dispositivos móveis (smartphones/tablets) usando **Bootstrap**.

---

## **Estrutura de Pastas**

```bash
.
├── assets/
│   ├── favicon.png
│   ├── gear-icon.png
│   ├── user-avatar.png
│   └── screenshot.png
├── icons/               # Ícones para PWA (vários tamanhos)
├── CSS/
│   ├── style.css        # Estilos customizados
├── js/
│   ├── calculator.js    # Lógica de cálculo e funções avançadas
│   ├── storage.js       # Gerenciamento de histórico e logger
│   └── ui.js            # Manipulação do DOM, eventos de interface
├── index.html           # Página principal da aplicação
├── manifest.json        # Arquivo de configuração PWA
├── service-worker.js    # Service Worker para cache e offline
└── README.md            # Este arquivo
```

---

## **Instalação e Uso**

1. **Clonar o repositório**  
   ```bash
   git clone https://github.com/kalyelnlaurindo/sublimath.git
   ```
2. **Acessar o diretório**  
   ```bash
   cd sublimath
   ```
3. **Abrir o `index.html`** no navegador  
   - Você pode simplesmente clicar duas vezes no arquivo `index.html` ou  
   - Iniciar um servidor local (por exemplo, usando `npx serve` ou outro método) para melhor compatibilidade com PWA.

4. **(Opcional) Ajustar o Service Worker**  
   - Verifique se o `service-worker.js` e o caminho do `manifest.json` estão corretos para o seu ambiente.

5. **(Opcional) Deploy**  
   - Para hospedar, basta enviar os arquivos para um servidor web (GitHub Pages, Netlify, Vercel, etc.).  
   - Certifique-se de que os caminhos no `manifest.json` e `service-worker.js` estejam corretos.

---

## **Como Usar a Calculadora**

1. **Operações Básicas**  
   - Digite números e operadores (por exemplo, `7 + 5`) e pressione `=` ou tecla **Enter** (no teclado) para ver o resultado.  
   - Use botões como **AC** (para limpar tudo) e **⌫** (backspace).

2. **Funções Avançadas**  
   - Seno: `sin(45)` (em **graus** se “Deg” estiver selecionado)  
   - Cosseno: `cos(60)`  
   - Log base 10: `log(100)` => 2  
   - Log natural (ln): `ln(10)`  
   - Exponencial: `EXP` => `Math.exp()`  
   - Fatorial: `5!` => 120  

3. **Ans**  
   - O botão **Ans** utiliza o **último resultado** exibido no visor.

4. **Alternar Graus/Radianos**  
   - Clique em **Deg** para alternar para **Rad** e vice-versa. Internamente, as funções trigonométricas são atualizadas (p. ex. `sin(x)` para `Math.sin()` ou `Math.sin(Math.PI/180 * x)`).

5. **Histórico**  
   - As operações são armazenadas em localStorage. Sempre que você calcula, o resultado atual + expressão anterior é salvo no histórico (que pode ser exibido ou gerenciado por você no `storage.js`).

---

## **Arquitetura e Organização (SOLID/Clean Code)**

1. **calculator.js**  
   - `Calculator`: classe com responsabilidade de **avaliar expressões**, lidar com conversão **graus/radianos**, fatorial, etc.  
   - Funções privadas para parse de strings, substituição de símbolos, etc.  

2. **storage.js**  
   - `StorageManager`: cuida de **salvar/carregar** o histórico no `localStorage`.  
   - `Logger`: exemplo simples de logger (`info`, `warn`, `error`) para agrupar mensagens de console.  

3. **ui.js**  
   - Manipula **eventos de DOM** (cliques de botões e teclado), exibe resultados no `display`, chama métodos de `Calculator` e `StorageManager`.

4. **Separação de Responsabilidades**  
   - Cada parte do sistema cumpre uma função específica, facilitando manutenção e extensão.

5. **TDD/Tests**  
   - No `calculator.js` há exemplos de testes simples integrados (método estático `runTests()`).  
   - Em projetos maiores, recomenda-se usar frameworks de testes (Jest, Mocha etc.) e arquivos dedicados para testes unitários.

---

## **PWA (Progressive Web App)**

1. **manifest.json**  
   - Contém nome, tema, ícones e configurações para instalar o app no celular/desktop.

2. **service-worker.js**  
   - Responsável por gerenciar cache de arquivos, possibilitando **uso offline**.  
   - Toda vez que o usuário **instala** o aplicativo, os arquivos listados no SW são armazenados localmente.

3. **Como Instalar**  
   - Em navegadores compatíveis (ex.: Chrome no Android), ao acessar o site, aparecerá uma **opção de instalar** na tela inicial.  
   - No Desktop (Chrome/Edge), aparecerá um ícone de instalação na barra de endereços.

4. **Modo Offline**  
   - Mesmo **sem internet**, o usuário pode abrir a calculadora, pois o SW entregará o cache local do app.

---

## **Tecnologias Utilizadas**

- **HTML5** e **CSS3**  
  - Estrutura semântica, estilização customizada (tema escuro + pink highlight).
- **Bootstrap 5**  
  - Grid System, classes de botões e responsividade.
- **JavaScript (ES6+)**  
  - Lógica da calculadora, manipulação do DOM, localStorage.
- **Service Worker**  
  - Suporte a cache offline e instalação PWA.
- **manifest.json**  
  - Arquivo de metadados do aplicativo web.

---

## **Contribuindo**

1. Faça um **fork** deste repositório.  
2. Crie uma **branch** para sua feature (`git checkout -b feature/nomeFeature`).  
3. Commit suas alterações (`git commit -m 'Minha nova feature'`).  
4. Faça o push da branch (`git push origin feature/nomeFeature`).  
5. Abra um **Pull Request** no GitHub.

Sinta-se à vontade para sugerir melhorias de usabilidade, layout ou novas funções matemáticas.

---

## **Licença**
 
Você é livre para **usar**, **modificar** e **distribuir** conforme as condições da licença.

---

**Aproveite o SubliMath!**  
Para dúvidas, abra uma issue ou entre em contato.