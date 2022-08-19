# Project Store Manager #

Projeto realizado no módulo de Back-End do curso de desenvolvimento web da Trybe.
Trata-se de uma API RESTful que utiliza a arquitetura MSC (model-service-controller)!

É um sistema de gerenciamento de vendas no formato dropshipping onde é possível criar, visualizar, deletar e atualizar produtos e vendas.
Para a gestão de dados utilizei o banco de dados MySQL e para a cobertura de testes unitários foi utilizado Mocha, Chai e Sinnon.

## Rotas ##

### Produtos ###

GET | http://localhost:3000/products

GET | http://localhost:3000/products/:id

GET | http://localhost:3000/products/search?q=name

POST | http://localhost:3000/products

PUT | http://localhost:3000/products/:id

DELETE | http://localhost:3000/products/:id

### Vendas ###

GET | http://localhost:3000/sales

GET | http://localhost:3000/sales/:id

POST | http://localhost:3000/sales

PUT | http://localhost:3000/sales/:id

DELETE | http://localhost:3000/sales/:id
