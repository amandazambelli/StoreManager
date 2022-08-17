const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('Testes do arquivo productsService.js', () => {
  describe('Ao chamar o controller de getAll na rota de vendas', () => {

    const result = {
      data: [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ],
      code: 200,
    };
  
    const response = {};
    const request = {};

    before(async () => {
      response.status = sinon.stub().return(response);
      response.json = sinon.stub().return();

      sinon.stub(salesService, 'getAll').resolves(result);
    });

    after(async () => {
      salesService.getAll.restore();
    });

    it('quando as vendas são retornadas com status 200', async () => {
      const response = await salesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(result.data)).to.be.equal(true);
    });
  });

  describe('Ao chamar o controller de getById na rota de vendas', () => {

    describe('quando não existem vendas no Banco de Dados', async () => {
      const response = {};
      const request = {};

      before(() => {
        request.params = { id: 1 };

        response.status = sinon.stub()
          .returns(response);
        response.send = sinon.stub()
          .returns();

        sinon.stub(salesService, 'getById')
          .resolves(null);
      });

      after(() => {
        salesService.getById.restore();
      });

      it('é chamado o status com o código 404 e a mensagem de "Product not found"', async () => {
        await salesController.getById(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
        expect(response.message.calledWith('Product not found')).to.be.equal(true);
      });
    });

    describe('quando existem vendas no Banco de Dados', async () => {
      const response = {};
      const request = {};

      const getSalesById = [
        {
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ];

      before(() => {
        request.params = { id: 1 };

        response.status = sinon.stub()
          .returns(response);
        response.send = sinon.stub()
          .returns();

        sinon.stub(salesService, 'getById')
          .resolves(getSalesById);
      });

      after(() => {
      salesService.getById.restore();
      });

      it('é chamado o status com o código 200 e json com objeto', async () => {
        await salesController.getById(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(sinon.match.object).to.be.equal(getSalesById));
      });
    });
  });
});
