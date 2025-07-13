# 🎓 Dodo Cursos Online

![Next.js](https://img.shields.io/badge/Next.js-15-blue?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-blue?logo=tailwind-css)
![License: MIT](https://img.shields.io/badge/License-MIT-green)

Plataforma moderna e responsiva para criação e gerenciamento de cursos online. Desenvolvido com **Next.js 15**, **React 19**, **Tailwind CSS 4** e uma arquitetura de componentes reutilizáveis.

## 🚀 Visão Geral

O **Dodo Cursos Online** permite:

- Gerenciar cursos, lições e instrutores
- Visualizar dashboards e estatísticas
- Criar, editar e excluir conteúdos educacionais
- Usar formulários dinâmicos e interações modernas com modais, notificações e validações

---

## 🧱 Tecnologias Utilizadas

- **Next.js 15** com App Router
- **React 19** + **Zustand** (estado global)
- **Tailwind CSS 4** + **tw-animate-css**
- **Zod** (validação de formulários)
- **React Hook Form**
- **Radix UI** e **Lucide Icons**
- **Date-fns** (tratamento de datas)
- **Sonner** (toasts e notificações)

---

## 📁 Estrutura de Pastas

```plaintext
src/
├── app/                # Rotas e layouts
│   ├── courses/        # Páginas de cursos (new, [id], dashboard)
│   ├── contexts/       # Contextos globais (curso, sessão)
│   ├── helpers/        # Funções utilitárias (formatar datas, status etc.)
│   └── styles/         # CSS global
├── components/         # Componentes reutilizáveis
│   ├── cards/          # Cartões visuais
│   ├── course/         # Detalhes e tipos de aula
│   ├── forms/          # Formulários (curso, aula)
│   ├── modals/         # Modais interativos
│   ├── ui/             # Componentes visuais reutilizáveis (input, button, dialog)
│   └── schemas/        # Validações com Zod
├── dtos/               # Tipagens de dados
├── lib/                # Funções utilitárias globais
public/                 # Arquivos estáticos (imagens, SVGs)
📦 Instalação
Clone o projeto e instale as dependências:

bash
Copiar
Editar
git clone https://github.com/douglasdodo1/dodo-cursos-online.git
cd dodo-cursos-online
npm install
🧪 Scripts disponíveis
Comando	Descrição
npm run dev	Inicia o servidor de desenvolvimento (Turbopack)
npm run build	Gera a build de produção
npm run start	Inicia o servidor em produção
npm run lint	Verifica erros com ESLint

✅ Funcionalidades
📚 CRUD de cursos, lições e instrutores

🧑‍🏫 Modais para adição/edição com validação

🎯 Navegação baseada em contexto (course-context, session-context)

🎨 UI moderna e responsiva com Tailwind + Radix UI

⚡ Feedback com toasts (sonner)

📆 Componentes interativos como calendários, seletores, tabs

👨‍💻 Como contribuir
Contribuições são bem-vindas! Para começar:

bash
Copiar
Editar
git clone https://github.com/douglasdodo1/dodo-cursos-online.git
cd dodo-cursos-online
npm install
npm run dev
Faça suas alterações e envie um Pull Request 😄

📄 Licença
Este projeto está licenciado sob a MIT License.

📌 Autor
Desenvolvido por Douglas Gemir 🧠💻
```
