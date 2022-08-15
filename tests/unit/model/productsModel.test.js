const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('Testes do arquivo productsModel.js', () => {
  describe('Busca todos os produtos', () => {
    
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

  describe('Busca um produto específico pelo id', () => {

    before(async () => {
      const execute = [[]];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe('quando não existe um produto com o id informado', () => {
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
              name: 'Martelo de Thor',
            }
          );
      });

      after(() => {
        productsModel.getById.restore();
      });

      it('retorna um objeto com as propriedades: "id" e "name"', async () => {
        const response = await productsModel.getById(1);

        expect(response).to.be.an('object');
        expect(response).to.be.not.empty;
        expect(response).to.include.all.keys('id', 'name');
      });
    });
  });

  describe('Busca todos os produtos', () => {
    
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
});