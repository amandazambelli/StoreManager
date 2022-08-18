const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

describe('Testes do arquivo salesController.js', () => {
  describe('Ao chamar o controller de getAll na rota de vendas', () => {

    beforeEach(async () => {

      const result = [
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

      sinon.stub(salesService, 'getAll').resolves(result);
    });

    afterEach(async () => {
      salesService.getAll.restore();
    });

    it('todas as vendas são retornadas com status 200', async () => {
      const response = {};
      const request = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      
      await salesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.true;
    });

    it('as vendas são retornadas em forma de um array de objetos JSON', async () => {
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

      const response = {};
      const request = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      
      await salesController.getAll(request, response);

      expect(response.json.calledWith(sales)).to.be.true;
    });
  });

  describe('Ao chamar o controller de getById na rota de vendas', () => {

    describe('quando o id existe', async () => {
      beforeEach(async () => {
        const result = [
          {
            date: "2021-09-09T04:54:29.000Z",
            productId: 1,
            quantity: 2
          },
          {
            date: "2021-09-09T04:54:54.000Z",
            productId: 2,
            quantity: 2
          }
        ];

        sinon.stub(salesService, 'getById').resolves(result);
      });

      afterEach(async () => {
        salesService.getById.restore();
      });

      it('as vendas são retornadas com status 200', async () => {
        const response = {};
        const request = {};
          
        request.params = { id: 1 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        await salesController.getById(request, response);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('as vendas são retornadas como um array de objetos JSON', async () => {
        const saleById = [
          {
            date: "2021-09-09T04:54:29.000Z",
            productId: 1,
            quantity: 2
          },
          {
            date: "2021-09-09T04:54:54.000Z",
            productId: 2,
            quantity: 2
          }
        ];

        const response = {};
        const request = {};
          
        request.params = { id: 1 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        await salesController.getById(request, response);

        expect(response.json.calledWith(saleById)).to.be.true;
      });
    });
  });

  describe('Ao chamar o controller da função create na rota de vendas', () => {

    describe('quando o id é cadastrado com sucesso', async () => {
      beforeEach(() => {
        const result = {
          id: 5,
          itemsSold: [
            {
              productId: 1,
              quantity: 1,
            },
            {
              productId: 2,
              quantity: 5,
            },
          ]
        };

        sinon.stub(salesService, 'create').resolves(result);
      });

      afterEach(() => {
        salesService.create.restore();
      });

      it('as vendas são retornadas com status 201', async () => {
        const response = {};
        const request = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        await salesController.create(request, response);

        expect(response.status.calledWith(201)).to.be.true;
      });

      it('as vendas são retornadas como objeto JSON', async () => {
        const newSale = {
          id: 5,
          itemsSold: [
            {
              productId: 1,
              quantity: 1
            },
            {
              productId: 2,
              quantity: 5
            }
          ]
        };

        const response = {};
        const request = {};

        request.body = [
          {
            "productId": 1,
            "quantity": 1
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ];

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        await salesController.create(request, response);

        expect(response.json.calledWith(newSale)).to.be.true;
      });
    });
  });
});
