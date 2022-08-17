const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('Testes do arquivo salesModel.js', () => {
  describe('Lista todas as vendas com a função getAll', () => {
    
    before(async () => {
      const execute = [];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('quando todas as vendas são retornados corretamente', async () => {
      const response = await salesModel.getAll();

      expect(response).to.be.an('array');
      expect(response).to.be.not.empty;
      expect(response[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });

  describe('Busca uma venda específica pelo id', () => {

    before(async () => {
      const execute = [[]];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe('quando não existe uma venda com o id informado', () => {
      it('retorna null', async () => {
        const response = await salesModel.getById();
        expect(response).to.be.equal(null);
      });
    });
    
    describe('quando existe uma venda com o id informado', async () => {

      before(() => {
        sinon.stub(salesModel, 'getById')
          .resolves(
            [
              {
                "saleId": 1,
                "date": "2021-09-09T04:54:29.000Z",
                "productId": 1,
                "quantity": 2
              },
              {
                "saleId": 1,
                "date": "2021-09-09T04:54:54.000Z",
                "productId": 2,
                "quantity": 2
              }
            ]
          );
      });

      after(() => {
        salesModel.getById.restore();
      });

      it('retorna um objeto com as propriedades: "saleId", "date", "productId" e "quantity"', async () => {
        const response = await salesModel.getById(1);

        expect(response).to.be.an('object');
        expect(response).to.be.not.empty;
        expect(response).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
      });
    });
  });

  describe('Cadastra nova venda com a função create', () => {
    
    const sale = [
    {
      "productId": 1,
      "quantity":1
    },
    {
      "productId": 2,
      "quantity":5
    }
  ]

    before(async () => {
      const execute = [sale];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe('quando uma venda é cadastrada corretamente', async () => {
      it('retorna um objeto com as propriedades: "id" e "name"', async () => {
      const response = await productsModel.create({ name: 'ProdutoX' });

      expect(response).to.be.an('object');
      expect(response).to.be.not.empty;
      expect(response).to.include.all.keys('id', 'name');
      });
    });
  });

  describe('Atualiza vendas com a função update', () => {

    before(async () => {
      sinon.stub(connection, 'execute').resolves();
    });
    after(async () => {
      connection.execute.restore();
    });

    describe('quando não existe um produto com o id informado', () => {
      it('retorna null', async () => {
        const response = await salesModel.getById();
        expect(response).to.be.equal(null);
      });
    });
      
    describe('quando existe um produto com o id informado', async () => {
      const sales = [
        {
          "productId": 1,
          "quantity": 10
        },
        {
          "productId": 2,
          "quantity": 50
        }
      ];

      it('retorna true', async () => {
        const response = await salesModel.update(1, sales);

        expect(response).to.be.equal(true);
      });
    });
  });

  describe('Deleta vendas específicas com a função deleted', () => {

    before(async () => {
      sinon.stub(connection, 'execute').resolves();
    });
    after(async () => {
      connection.execute.restore();
    });

    describe('quando não existe uma venda com o id informado', () => {
      it('retorna null', async () => {
        const response = await salesModel.getById();
        expect(response).to.be.equal(null);
      });
    });
      
    describe('quando existe uma venda com o id informado', async () => {
      it('retorna o id', async () => {
        const response = await salesModel.deleted(1);

        expect(response).to.be.a('number');
        expect(response).to.be.not.empty;
      });
    });
  });
});

