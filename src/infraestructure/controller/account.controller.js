import { treasureApi } from '../../api.js';

let products = []

export default (() => ({
  getProducts: async (req, res, next) => {
    if (products.length === 0) {
      try {
        const productsReq = await treasureApi.get('/account_product');
        products = productsReq.data.data.filter(e => e.ownership != 'business');
      } catch(err) {
        res.status(500);
      }
    }
    res.status(200).send(products);
  },
  getAccount: async (req, res, next) => {
    try {
      const accountResponse = await treasureApi.get(`/account/${req.params.id}`);

      return res.status(200).send(accountResponse.data);
    } catch (error) {
      next(error)
    }
  },
  listTransactions: async (req, res, next) => { 
    try {
      const account_id = req.params.id;

      const transactionsResponse = await treasureApi.get(`/account/${account_id}/transaction `);

    } catch (error) {
      next(error)
    }
  }
}))