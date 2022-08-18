const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('Testes do arquivo salesService.js', () => {
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
      sinon.stub(salesModel, 'getAll').resolves(sales);
    });

    after(async () => {
      salesModel.getAll.restore();
    });

    it('quando todas as vendas são retornados corretamente', async () => {
      const response = await salesService.getAll();

      expect(response).to.be.an('array');
      expect(response).to.be.not.empty;
      expect(response[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });

  describe('Busca uma venda no Banco de Dados pelo id', () => {

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
      sinon.stub(salesModel, 'getById').resolves(sales);
    });

    after(async () => {
      salesModel.getById.restore();
    });

    describe('quando existe uma venda com o id informado', async () => {
      it('retorna um objeto com as propriedades: "saleId", "productId" "date" e "quantity"', async () => {
        const response = await salesService.getById(1);
    
        expect(response).to.be.an('array');
        expect(response).to.be.not.empty;
        expect(response[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
      });
    });
  });

  describe('Cadastra novas vendas com função create', () => {
    
    before(async () => {
      sinon.stub(salesModel, 'createSalesProduct').resolves();
    });
    after(async () => {
      salesModel.createSalesProduct.restore();
    });

    describe('quando uma venda é cadastrada corretamente', async () => {
      it('retorna um objeto com as chaves "id" e "itemsSold"', async () => {
        const response = await salesService.create([{ productId: 2, quantity: 2}]);

        expect(response).to.be.an('object');
        expect(response).to.be.not.empty;
        expect(response).to.include.all.keys('id', 'itemsSold');
      });
    });
  });
  
  describe('Atualiza vendas com a função update', () => {

    before(async () => {
      sinon.stub(salesModel, 'getById').resolves([]);
      sinon.stub(salesModel, 'update').resolves([]);
    });
    after(async () => {
      salesModel.update.restore();
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

      it('retorna um objeto com as chaves "saleId" e "ItemsUpdated"', async () => {
        const response = await salesService.update(1, sales);

        expect(response).to.be.an('object');
        expect(response).to.be.not.empty;
        expect(response).to.include.all.keys('saleId', 'itemsUpdated');
      });
    });
  });

  describe('Deleta uma venda com a função deleted', () => {

    before(async () => {
      sinon.stub(salesModel, 'deleted').resolves(1);
    });
    after(async () => {
      salesModel.deleted.restore();
    });
      
    describe('quando existe um produto com o id informado', async () => {
      it('retorna true', async () => {
        const response = await salesService.deleted(1);

        expect(response).to.be.equal(1);
      });
    });
  });
});
