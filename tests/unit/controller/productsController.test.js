const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('Ao chamar o controller de getById', () => {

  describe('quando não existem produtos no Banco de Dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();

      sinon.stub(productsService, 'getById')
        .resolves(null);
    });

    after(() => {
      productsService.getById.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await productsController.getById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamada a mensagem "Product not found"', async () => {
      await productsController.getById(request, response);

      expect(response.message.calledWith('Product not found')).to.be.equal(true);
    });

  });

  describe('quando existem produtos no Banco de Dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();

      sinon.stub(productsService, 'getById')
        .resolves({
          id: 1,
          name: 'Produto X',
        });
    });

    after(() => {
      productsService.getById.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await productsController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com objeto', async () => {
      await productsController.getById(request, response);

      expect(response.send.calledWith(sinon.match.object).to.be.equal(true));
    });
  });
});
