const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('Testes do arquivo productsController.js', () => {  
  describe('Ao chamar o controller de getAll na rota de produtos', () => {

    beforeEach(() => {

      const result = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

      sinon.stub(productsService, 'getAll').resolves(result);
    });

    afterEach(() => {
      productsService.getAll.restore();
    });

    it('os produtos são retornados com status 200', async () => {
      const response = {};
      const request = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      
      await productsController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.true;
    });

    it('os produtos são retornados em forma de um array de objetos JSON', async () => {
      const products = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

      const response = {};
      const request = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      
      await productsController.getAll(request, response);

      expect(response.json.calledWith(products)).to.be.true;
    });
  });

  describe('Ao chamar o controller de getById na rota de produtos', () => {

    describe('quando o id existe', async () => {
      beforeEach(() => {
        const result = { id: 1, name: 'Martelo de Thor' };

        sinon.stub(productsService, 'getById').resolves(result);
      });

      afterEach(() => {
        productsService.getById.restore();
      });

      it('o produto é retornado com status 200', async () => {
        const response = {};
        const request = {};
          
        request.params = { id: 1 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        await productsController.getById(request, response);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('o produto é retornado como um objeto JSON', async () => {
        const productById = { id: 1, name: 'Martelo de Thor' };

        const response = {};
        const request = {};
          
        request.params = { id: 1 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        await productsController.getById(request, response);

        expect(response.json.calledWith(productById)).to.be.true;
      });
    });
  });

  describe('Ao chamar o controller da função create na rota de produtos', () => {

    describe('quando o id é cadastrado com sucesso', async () => {
      beforeEach(() => {
        const result = {
          id: 5,
          name: 'ProdutoX'
        };

        sinon.stub(productsService, 'create').resolves(result);
      });

      afterEach(() => {
        productsService.create.restore();
      });

      it('os produtos são retornados com status 201', async () => {
        const response = {};
        const request = {};

        request.body = {
          name: 'ProdutoX'
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        await productsController.create(request, response);

        expect(response.status.calledWith(201)).to.be.true;
      });

      it('os produtos são retornados como objeto JSON', async () => {
        const newProduct = {
          id: 5,
          name: 'ProdutoX'
        };

        const response = {};
        const request = {};

        request.body = {
          name: 'ProdutoX'
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        await productsController.create(request, response);

        expect(response.json.calledWith(newProduct)).to.be.true;
      });
    });
  });

  /* describe('Ao chamar o controller da função deleted na rota de produtos', () => {

    beforeEach(() => {
        const result = true;

        sinon.stub(productsService, 'deleted').resolves(result);
      });

      afterEach(() => {
        productsService.deleted.restore();
      });

    describe('quando o id existe', async () => {
      it('o produto é deletado com status 204', async () => {
        const response = {};
        const request = {};

        request.params = { id: 1 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        await productsController.deleted(request, response);

        expect(response.status.calledWith(204)).to.be.true;
      });
    });
  }); */

  describe('Ao chamar o controller de search na rota de produtos', () => {

    describe('quando o produto é encontrado', async () => {
      beforeEach(() => {
        const result = [{ id: 1, name: 'Martelo de Thor' }];

        sinon.stub(productsService, 'search').resolves(result);
      });

      afterEach(() => {
        productsService.search.restore();
      });

      it('o produto é retornado com status 200', async () => {
        const response = {};
        const request = {};
          
        request.query = { q: 'Martelo' };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        await productsController.search(request, response);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('o produto é retornado como um array de objetos JSON', async () => {
        const productByQuery = [{ id: 1, name: 'Martelo de Thor' }];

        const response = {};
        const request = {};
          
        request.query = { q: 'Martelo' };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        await productsController.search(request, response);

        expect(response.json.calledWith(productByQuery)).to.be.true;
      });
    });
  });
});
