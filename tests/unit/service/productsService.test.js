const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('Testes do arquivo productsService.js', () => {

  describe('Busca todos os produtos com a função getAll', () => {
    
    const products = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ];

    before(async () => {
      const execute = [products];

      sinon.stub(productsModel, 'getAll').resolves(products);
    });

    after(async () => {
      productsModel.getAll.restore();
    });

    it('quando os produtos são retornados corretamente', async () => {
      const response = await productsService.getAll();

      expect(response).to.be.an('array');
      expect(response).to.be.not.empty;
      expect(response[0]).to.include.all.keys('id', 'name');
    });
  });

  describe('Busca um produto no Banco de Dados pelo id', () => {

    const product = {
      id: 1,
      name: 'Martelo de Thor',
    };

    before(() => {
      sinon.stub(productsModel, 'getById').resolves(product);
    });

    after(() => {
      productsModel.getById.restore();
    });

    describe('quando existe um produto com o id informado', async () => {
      it('retorna um objeto com as propriedades: "id" e "name"', async () => {
        const response = await productsService.getById(1);
    
        expect(response).to.be.an('object');
        expect(response).to.be.not.empty;
        expect(response).to.include.all.keys('id', 'name');
      });
    });
  });

  describe('Cadastra novos produtos', () => {
    
    const product = {
      name: 'ProdutoX'
    };

    before(async () => {
      const execute = [product];

      sinon.stub(productsModel, 'create').resolves(product);
    });

    after(async () => {
      productsModel.create.restore();
    });

    it('quando os produtos são cadastrados corretamente', async () => {
      const response = await productsService.create({ name: 'ProdutoX' });

      expect(response).to.be.an('object');
      expect(response).to.be.not.empty;
      expect(response).to.include.all.keys('id', 'name');
    });
  });

  describe('Atualiza um produto específico na função update', () => {

    before(async () => {
      sinon.stub(productsModel, 'update').resolves(1);
    });
    after(async () => {
      productsModel.update.restore();
    });
      
    describe('quando existe um produto com o id informado', async () => {
      it('retorna um objeto com as propriedades: "id" e "name"', async () => {
        const response = await productsService.update({ id: 1, name: 'Martelo do Batman' });

        expect(response).to.be.an('object');
        expect(response).to.be.not.empty;
        expect(response).to.include.all.keys('id', 'name');
      });
    });
  });

  describe('Deleta um produto específico na função deleted', () => {

    before(async () => {

      sinon.stub(productsModel, 'deleted').resolves();
    });
    
    after(async () => {
      productsModel.deleted.restore();
    });

    describe('quando existe um produto com o id informado', async () => {
      it('retorna o id', async () => {
        const response = await productsService.deleted(1);

        expect(response).to.be.eq(3);
      });
    });
  });

  describe('Busca produtos baseados na query pela função search', () => {
    
    const product = [
      {id: 1, name: 'Martelo de Thor'},
    ];

    before(async () => {
      const execute = [product];

      sinon.stub(productsModel, 'search').resolves(execute);
    });

    after(async () => {
      productsModel.search.restore();
    });

    it('quando os produtos são retornados corretamente', async () => {
      const response = await productsService.search(product);

      expect(response).to.be.an('array');
      expect(response).to.be.not.empty;
      expect(response[0]).to.include.all.keys('id', 'name');
    });
  });
});
