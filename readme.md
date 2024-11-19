# Api vendinha - Frameworks FullStack
---

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