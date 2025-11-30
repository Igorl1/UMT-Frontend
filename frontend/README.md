# **> Escopo do Site**

Unified Media Tracker (UMT) é um site simples que busca centralizar anotações de mídias consumidas. Sejam filmes, livros, jogos, entre outros. É um projeto simples desenvolvido para o Trabalho 1 da matéria INF1407 na PUC-Rio.

<img width="778" height="494" alt="image" src="https://github.com/user-attachments/assets/1427b0c9-f149-4aaf-ab3e-de8f7452cd1d" />

Integrante: Igor Soares Lemos - 2011287

# **> Como instalar ( Backend )**

### Backend (Django) https://github.com/Igorl1/UMT-Backend

1. Python instalado
2. Crie o venv: `python -m venv .venv`
3. Ative o venv: `.venv\Scripts\activate` (Windows) ou `source .venv/bin/activate` (Linux/Mac)
4. Instale as dependências: `pip install -r requirements.txt`
5. Execute as migrações: `python manage.py migrate`
6. (Opcional) Crie um superusuário: `python manage.py createsuperuser`
8. Vá para a pasta backend: `cd backend/`
9. Execute o servidor: `python manage.py runserver`

### Frontend (TypeScript) https://github.com/Igorl1/UMT-Frontend

1. Tenha Node.js instalado
2. Navegue até a pasta frontend: `cd frontend/`
3. Instale as dependências: `npm install`
4. Compile o TypeScript: `npm run build`
5. Execute o servidor frontend: `python3 -m http.server 8080`

### Executando a Aplicação

- Backend rodará em `http://127.0.0.1:8000`
- Frontend rodará em `http://127.0.0.1:8080`
- Acesse `http://127.0.0.1:8000/accounts/home/` para começar

# **> Manual do Usuário ( Funcionalidades )**

### 1. Adicionar uma Mídia

A fim de adicionar uma mídia, se deve clicar no botão "Add Media" localizado no topo ou no final da página.

<img width="1257" height="343" alt="image" src="https://github.com/user-attachments/assets/f3ed213c-66bd-419d-9d63-fa36b21d43a2" />

Logo após, é possível especificar os detalhes de uma mídia e adicioná-la na sua lista pessoal.

<img width="1238" height="497" alt="image" src="https://github.com/user-attachments/assets/74ba1656-c3a6-421b-8a79-9cc3c3efe3dc" />

### 2. Atualizar e Excluir uma Mídia

Após uma ou mais mídias terem sido adicionadas, é possível perceber a sua presença na lista. No lado direito, contudo, há algumas ações importantes, como "Edit" e "Delete".

<img width="1245" height="321" alt="image" src="https://github.com/user-attachments/assets/aa9282f3-42d9-4fc4-ad34-3d395665dc7a" />

Ao clicar em "Edit", é possível modificar todas as entradas previamente especificadas.

<img width="1278" height="496" alt="image" src="https://github.com/user-attachments/assets/a93e3f76-9ea8-4df8-8319-0cbfcae71ef4" />

Ao clicar em "Delete", aparece uma confirmação antes de deletar a sua mídia.

<img width="1243" height="465" alt="image" src="https://github.com/user-attachments/assets/e34bcd45-7d39-4669-8016-8271f26353e6" />

### 3. Logout e Deleção de Conta

No topo da página é possível perceber os botões "Logout" e "Delete Account".

<img width="728" height="63" alt="image" src="https://github.com/user-attachments/assets/19883c98-63b6-4086-80d5-362eaff5773a" />

Ao clicar em "Logout", aparece uma confirmação antes de sair da conta e redirecionar para a página inicial.

<img width="1249" height="187" alt="image" src="https://github.com/user-attachments/assets/06c9023f-e544-4673-be4d-78fcbfbd4ea0" />

Ao clicar em "Delete Account", aparece uma confirmação antes de deletar sua conta. Essa é uma ação **IRREVERSÍVEL**.

<img width="1222" height="180" alt="image" src="https://github.com/user-attachments/assets/c0e67c41-4dc4-48c1-8b69-980ce2eef808" />

### 4. Mudança e Reset de Senha

No topo da página é possível perceber o botão "Change Password".

<img width="728" height="63" alt="image" src="https://github.com/user-attachments/assets/19883c98-63b6-4086-80d5-362eaff5773a" />

Ao clicá-lo, é possível mudar sua senha, caso ainda tenha sua senha antiga.

<img width="1270" height="389" alt="image" src="https://github.com/user-attachments/assets/d48c6a5c-58b3-4327-82db-b0e90b9e6cf4" />

Caso não tenha a senha antiga, na tela de login é possível ver um link "Forgot Password?".

<img width="1275" height="373" alt="image" src="https://github.com/user-attachments/assets/3668ba99-4bd8-4cfa-a0f6-adcb4aa74239" />

Ao clicar no link, é possível utilizar seu e-mail.

<img width="1264" height="270" alt="image" src="https://github.com/user-attachments/assets/3af541a8-1b2c-4de8-8cad-770e1fa25f7e" />

O link com token para trocar sua senha é enviado no console.

<img width="1084" height="172" alt="image" src="https://github.com/user-attachments/assets/2cd6a81f-276f-4ed9-8b2e-3ca081a87244" />

### 5. Verficação da documentação de API

No topo da página é possível perceber o botão "API Documentation".

<img width="728" height="63" alt="image" src="https://github.com/user-attachments/assets/19883c98-63b6-4086-80d5-362eaff5773a" />

Ao clicá-lo, você será redirecionado para a interface Swagger do backend, onde poderá visualizar todos os endpoints disponíveis da API, incluindo operações de CRUD para mídias, autenticação de usuários e redefinição de senha.

<img width="1492" height="861" alt="image" src="https://github.com/user-attachments/assets/02fa7344-6ca3-4947-a655-4ed1ba00a351" />

# **> Observação Final**

- Como é um projeto simples, não foi adaptado completamente para produção.
