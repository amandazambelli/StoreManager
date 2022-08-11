const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('Busca um produto específico pelo id', () => {

  before(async () => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando não existe um produto com o ID informado', () => {
    it('retorna null', async () => {
      const response = await productsModel.getById();
      expect(response).to.be.equal(null);
    });
  });
    
  describe('quando existe um produto com o id informado', async () => {

    before(() => {
      sinon.stub(productsModel, 'getById')
        .resolves(
          {
            id: 1,
            name: 'Produto X',
          }
        );
    });

    after(() => {
      productsModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsModel.getById(1);

      expect(response).to.be.an('object');
    });

    it('o objeto não está vazio', async () => {
      const response = await productsModel.getById(1);

      expect(response).to.be.not.empty;
    });

    it('o objeto possui as propriedades: "id" e "name"', async () => {
      const response = await productsModel.getById(1);

      expect(response).to.include.all.keys('id', 'name');
    });
  });
});