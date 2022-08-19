const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('Testes do arquivo salesModel.js', () => {
  describe('Lista todas as vendas com a função getAll', () => {

    const sales = [
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
      },
      {
        "saleId": 2,
        "date": "2022-08-18T17:57:10.000Z",
        "productId": 3,
        "quantity": 15
      }
    ];
    
    before(async () => {
      const execute = [sales];

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

    const sales = [
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
      },
    ];

    before(async () => {
      const execute = [sales];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });
    
    describe('quando existe uma venda com o id informado', async () => {
      it('retorna um objeto com as propriedades: "saleId", "date", "productId" e "quantity"', async () => {
        const response = await salesModel.getById();

        expect(response).to.be.an('array');
        expect(response).to.be.not.empty;
        expect(response[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
      });
    });
  });

  /* describe('Testa função createSales', () => {

    const id = 10;
    
    before(async () => {
      const execute = [id];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('quando a função é executada corretamente', async () => {
      const response = await salesModel.createSales();

      expect(response).to.be.eq(10);
    });
  }); */

  describe('Cadastra nova venda com a função createSalesProduct', () => {
    
    before(async () => {
      sinon.stub(connection, 'execute').resolves();
    });
    after(async () => {
      connection.execute.restore();
    });

    describe('quando uma venda é cadastrada corretamente', async () => {
      it('retorna true', async () => {
      const response = await salesModel.createSalesProduct(1, 2, 2);

      expect(response).to.be.equal(true);
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

    describe('quando existe uma venda com o id informado', async () => {
      it('retorna o id', async () => {
        const response = await salesModel.deleted(2);

        expect(response).to.be.eq(2);
      });
    });
  });
});

