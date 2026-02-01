# Configuração do Firebase 🔥

Este projeto agora utiliza **Google Firebase** para Banco de Dados e Login. 
Para que ele funcione, você precisa criar um projeto gratuito no Firebase e colar suas chaves.

## Passo 1: Criar Projeto no Firebase
1. Acesse [console.firebase.google.com](https://console.firebase.google.com/).
2. Clique em **"Adicionar projeto"**.
3. Dê um nome (ex: `sindinor-app`) e clique em Continuar.
4. Desative o Google Analytics (opcional) e crie o projeto.

## Passo 2: Habilitar serviços
### Banco de Dados (Firestore)
1. No menu lateral, clique em **Criação** > **Firestore Database**.
2. Clique em **Criar banco de dados**.
3. Escolha o local (pode ser `nam5` ou `sa-east1` em SP).
4. **IMPORTANTE**: Escolha **Iniciar no modo de teste** (Isso permite que você teste sem configurar regras complexas agora).

### Autenticação (Auth)
1. No menu lateral, clique em **Criação** > **Authentication**.
2. Clique em **Vamos começar**.
3. Na aba **Sign-in method**, escolha **E-mail/Senha**.
4. Ative a opção **Email/Password** e clique em **Salvar**.
5. Vá na aba **Users** e clique em **Adicionar usuário**.
   - Crie o usuário admin: `administrativo@sindinor.org.br`
   - Senha: `Sindi#2025` (ou a que você preferir).

## Passo 3: Pegar as Chaves
1. Clique na engrenagem ⚙️ (Visão geral do projeto) > **Configurações do projeto**.
2. Role até o final da página em **Seus aplicativos**.
3. Clique no ícone **</>** (Web).
4. Dê um apelido (ex: `Site`) e clique em **Registrar app**.
5. Ele vai te dar um código `const firebaseConfig = { ... }`. Copie apenas os valores dentro das aspas.

## Passo 4: Colar no Código
Abra o arquivo `src/services/firebase-config.js` e substitua os valores marcados com "REPLACE_...":

```javascript
const firebaseConfig = {
  apiKey: "COLE_SUA_API_KEY_AQUI",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

**Pronto!** Agora rode `npm run dev` e o site estará conectado na nuvem.
