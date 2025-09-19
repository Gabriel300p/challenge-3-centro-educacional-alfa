# Centro Educacional Alfa - Sistema de Comunicações

## 📋 Sobre o Projeto

Este projeto faz parte do **Tech Challenge** da Pós-Tech Full Stack Development e consiste em uma aplicação web responsiva para gerenciamento de comunicações educacionais. O sistema permite que professores e administradores criem, editem e gerenciem postagens e avisos para a comunidade escolar.

---

### Dependência do Backend
Este frontend é o cliente para uma aplicação completa. Para rodá-lo, é necessário que o backend correspondente esteja em execução. Certifique-se de que o backend, disponível em [https://github.com/Stiverson/blog-backend-v2](https://github.com/Stiverson/blog-backend-v2), esteja configurado e online.

---

## ✨ Funcionalidades Implementadas

### 🔐 Autenticação e Autorização
- **Página de Login**: Interface de autenticação para professores e alunos.
- **Controle de acesso**: Proteção de rotas administrativas. Apenas **professores** podem criar, editar e excluir posts.
- **Personalização da Interface**: A barra superior exibe o e-mail do usuário logado.

### 📝 Gestão de Comunicações
- **Lista de Postagens**: Visualização de todas as comunicações em formato de tabela.
- **Visualização de Post Completo**: Ao clicar no título de um post, o usuário é redirecionado para uma página com o conteúdo completo.
- **Busca e Filtros**: Campo de busca para filtrar comunicações por palavras-chave.
- **Criação de Postagens**: Formulário para criação de novas comunicações (**apenas professores**).
- **Edição de Postagens**: Formulário para edição de comunicações existentes (**apenas professores**).
- **Exclusão de Postagens**: Funcionalidade para remover comunicações (**apenas professores**).

### 📱 Interface Responsiva
- **Design Adaptativo**: Interface otimizada para desktop, tablet e mobile.
- **Componentes Reutilizáveis**: Sistema de design consistente.
- **Experiência de Usuário**: Interface intuitiva e acessível.

## 🛠️ Tecnologias Utilizadas

### Core
- **React 19.1.0**: Biblioteca principal para construção da interface.
- **TypeScript**: Tipagem estática para maior segurança e produtividade.
- **Vite 7.0.4**: Build tool moderna e rápida.

### Estilização
- **TailwindCSS 4.1.11**: Framework CSS utilitário para estilização.
- **Radix UI**: Componentes acessíveis e customizáveis.
- **Phosphorn Icons**: Biblioteca de ícones.

### Gerenciamento de Estado
- **React Query 5.83.0**: Gerenciamento de estado do servidor e cache.
- **React Hooks**: Gerenciamento de estado local.

### Roteamento
- **React Router DOM 7.7.1**: Navegação entre páginas.

### Outras Bibliotecas
- **React Table 8.21.3**: Tabelas interativas e responsivas.
- **Date-fns**: Manipulação e formatação de datas.
- **jwt-decode**: Decodificação de tokens JWT no frontend.

## 🏗️ Arquitetura da Aplicação

### Estrutura de Pastas
```
src/
├── components/
│   ├── ui/
│   ├── layout/
│   └── common/
├── context/
│   └── AuthContext.tsx
├── pages/
│   ├── comunicacoes/
│   ├── login/
│   └── posts/
├── providers/
│   ├── AuthProvider.tsx
│   └── useAuth.tsx
├── services/
├── types/
└── assets/
```
### Padrões Arquiteturais
- **Feature-Based Architecture**: Organização por funcionalidades.
- **Component Composition**: Componentes reutilizáveis e compostos.
- **Custom Hooks**: Lógica de negócio encapsulada.
- **Service Layer**: Camada de serviços para integração com dados.

## 🚀 Setup Inicial

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- **Backend em execução**: Este frontend depende de um backend rodando na porta 3000. Certifique-se de que o backend esteja configurado e online.

### Instalação
```bash
# Clone o repositório
git clone [https://github.com/Gabriel300p/challenge-3-centro-educacional-alfa.git](https://github.com/Gabriel300p/challenge-3-centro-educacional-alfa.git)

# Navegue até o diretório
cd challenge-3-centro-educacional-alfa

# Instale as dependências
npm install

# Execute o projeto em modo de desenvolvimento
npm run dev
Scripts Disponíveis
Bash

npm run dev      # Executa em modo de desenvolvimento
npm run build    # Gera build de produção
npm run preview  # Visualiza build de produção
npm run lint     # Executa linting do código


💻 Guia de Uso
1. Acesso ao Sistema
Acesse a aplicação em http://localhost:5173. Você será redirecionado para a página de login.

Use as credenciais de teste fornecidas pelo backend para fazer login:

Professor: professor@alfa.com / senha123

Aluno: aluno@alfa.com / senha123

2. Visualização de Comunicações
A página principal exibe todas as comunicações em formato de tabela.

Clique no título de um post para ver seu conteúdo completo em uma página dedicada.

Use o campo de busca para filtrar por título, autor, tipo ou descrição.

3. Ações Administrativas (Apenas Professores)
O botão "Nova Comunicação" e as colunas de "Ações" (editar/excluir) são visíveis apenas para usuários com perfil de professor.

A aplicação impedirá que um aluno tente acessar essas funcionalidades.

🎨 Sistema de Design
Paleta de Cores: Tons de azul para elementos principais.

Tipografia: Fonte Inter.

Componentes: Botões, formulários, tabelas e modais consistentes.

🔒 Segurança e Autenticação
Controle de Acesso: Rotas administrativas e botões de ação são protegidos por autorização.

Validação de Dados: Validação de formulários no frontend.

🧪 Testes e Qualidade
Ferramentas: ESLint, TypeScript e Prettier.

👥 Equipe de Desenvolvimento
Este projeto foi desenvolvido como parte do Tech Challenge da Pós-Tech Frontend Engineering.

📄 Licença
Este projeto é desenvolvido para fins educacionais como parte do programa de Pós-Graduação em Full Stack Development.