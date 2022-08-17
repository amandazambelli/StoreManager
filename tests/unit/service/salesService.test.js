const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('Busca uma venda no Banco de Dados pelo id', () => {

  before(async () => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando não existe uma venda com o id informado', async () => {
    
    it('retorna null', async () => {
      const response = await salesService.getById();

      expect(response).to.be.equal('null');
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

    it('retorna um objeto', async () => {
      const response = await salesService.getById(1);
  
      expect(response).to.be.an('object');
    });
  
    it('o objeto não está vazio', async () => {
      const response = await salesService.getById(1);
  
      expect(response).to.be.not.empty;
    });
  
    it('o objeto possui as propriedades: "saleId", "productId" "date" e "quantity"', async () => {
      const response = await salesService.getById(1);
  
      expect(response).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });
});
