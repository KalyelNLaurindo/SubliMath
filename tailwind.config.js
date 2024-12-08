module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Escaneia todos os arquivos HTML e TypeScript dentro da pasta src
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000", // Cor de fundo preta
        primary: "#FF69B4", // Cor principal rosa claro
        button: "#4B5563", // Cor dos botões (cinza escuro)
        buttonHover: "#374151", // Cor dos botões no hover (cinza mais claro)
        screenText: "#000000", // Cor do texto na tela (preto)
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Fonte padrão para o projeto
      },
      borderRadius: {
        lg: "1rem", // Bordas arredondadas maiores personalizadas
      },
      spacing: {
        screenHeight: "5rem", // Altura personalizada para a tela da calculadora
      },
      gridTemplateColumns: {
        mobile: "repeat(4, 1fr)", // Grid de 4 colunas para dispositivos móveis
        desktop: "repeat(6, 1fr)", // Grid de 6 colunas para desktop
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // Plugin para estilização de formulários
    require("@tailwindcss/typography"), // Plugin para estilização avançada de textos
  ],
};
