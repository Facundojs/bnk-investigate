import { treasureApi } from '../../api.js';

export default () => ({
  createTransaction: async (req, res, next) => {
    try {
      const { account_id, amount, description, counterparty_id, type, back_url } = req.body;


      const transactionResponse = await treasureApi.post(
        '/transaction',
        {
          counterparty_id,
          description,
          account_id,
          amount,
          type,
        }
      );

      return res.status(201).send(transactionResponse.data);
    } catch (error) {
      next(error);
    }
  },
  getTransaction: async (req, res, next) => {
    try {
      const { id } = req.params;

      const transactionResponse = await treasureApi.get(`/transaction/${id}`);

      return res.status(200).send(transactionResponse.data);
    } catch (error) {
      next(error);
    }
  },
  webhook: async (req, res, next) => {}
});
