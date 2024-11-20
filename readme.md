# Api vendinha - Frameworks FullStack
---

## Dia = 28/10
- [x] Cadastrar usuários
- [x] Listar todos usuário= 0.5
- [x] Retornar um usuário pelo id
- [x] Update usuário   = 1

## Dia = 18/11

### Produto
- [x] Cadastrar produto = 1
- [x] Listar todos produtos = 0.5
- [x] Retonar um produto por id
- [ ] Update produto = 1

### Vendas
- [ ] Cadastrar   uma venda = 1
- [ ] Listar todas vendas = 1

## Para rodar o projeto no seu ambiente local

### Adicione as variaveis de ambiente corretamente no arquivo
- .env

### Rode o container do docker que contem o banco de dados postgresql
``` docker compose up -d ```

### Aplique as migrations no banco de dados
- 1 ``` npx prisma migrate generate```
- 2 ``` npx prisma migrate dev ```

### Para rodar o servidor e subir a api
- 1 ``` npm i ```
- 2 ``` npm run dev ```

### :tada: pronto!
