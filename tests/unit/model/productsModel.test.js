const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('Testes do arquivo productsModel.js', () => {
  
  describe('Busca todos os produtos na função getAll', () => {

    const products = [
      {id: 1, name: 'Martelo de Thor'},
      {id: 2, name: 'Traje de encolhimento'},
      {id: 3, name: 'Escudo do Capitão América'},
    ];

    before(async () => {
      const execute = [products];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('quando os produtos são retornados corretamente', async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.an('array');
      expect(response).to.be.not.empty;
      expect(response[0]).to.include.all.keys('id', 'name');
    });
  });

  describe('Busca um produto específico pelo id na função getById', () => {

    const product = [
      {id: 1, name: 'Martelo de Thor'},
    ];

    before(async () => {
      const execute = [product];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });
      
    describe('quando existe um produto com o id informado', async () => {
      it('retorna um objeto com as propriedades: "id" e "name"', async () => {
        const response = await productsModel.getById(1);

        expect(response).to.be.an('object');
        expect(response).to.be.not.empty;
        expect(response).to.include.all.keys('id', 'name');
      });
    });
  });

  describe('Cadastra novo produto com a função create', () => {
    
    const product = {
      id: 5,
      name: 'ProdutoX'
    };

    const insertedId = 

    before(async () => {
      const execute = [product.id];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe('quando o produto é cadastrado corretamente', async () => {
      it('retorna um objeto com as propriedades: "id" e "name"', async () => {
      const response = await productsModel.create(product.name);

      expect(response).to.be.an('object');
      expect(response).to.be.not.empty;
      expect(response).to.include.all.keys('id', 'name');
      });
    });
  });

  describe('Atualiza um produto específico na função update', () => {

    before(async () => {
      sinon.stub(connection, 'execute').resolves();
    });
    after(async () => {
      connection.execute.restore();
    });
      
    describe('quando existe um produto com o id informado', async () => {
      it('retorna um objeto do produto editado com as propriedades: "id" e "name"', async () => {
        const response = await productsModel.update({ id: 1, name: 'Martelo do Batman' });

        expect(response).to.be.an('object');
        expect(response).to.be.not.empty;
        expect(response).to.include.all.keys('id', 'name');
      });
    });
  });

  describe('Deleta um produto específico na função deleted', () => {

    before(async () => {
      sinon.stub(connection, 'execute').resolves();
    });
    after(async () => {
      connection.execute.restore();
    });
      
    describe('quando existe um produto com o id informado', async () => {
      it('retorna o id do produto excluído', async () => {
        const response = await productsModel.deleted(3);

        expect(response).to.be.eq(3);
      });
    });
  });

  describe('Busca produtos baseados na query pela função search', () => {

    const q = 'Martelo';
    
    const product = [
      {id: 1, name: 'Martelo de Thor'},
    ];

    before(async () => {
      const execute = [product];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('quando os produtos são retornados corretamente', async () => {
      const response = await productsModel.search(q);

      expect(response).to.be.an('array');
      expect(response).to.be.not.empty;
      expect(response[0]).to.include.all.keys('id', 'name');
    });
  });

});
