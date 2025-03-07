import { treasureApi } from '../../api.js';
import { AxiosError } from 'axios';

export default () => ({
  create: async (req, res, next) => {
    try {
      const kyc = req.body;

      const personApplicationResponse = await treasureApi.post('/apply/person_application', kyc);

      return res.status(201).send(personApplicationResponse.data);
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const kycId = req.params.id;

      const personResponse = await treasureApi.get(`/person/${kycId}`);

      return res.status(200).send(personResponse.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response.status === 403 && error.response.data.error.startsWith('Access denied')) {
          return next(new Error("User does not have accounts yet"));
        }
      }

      next(error);
    }
  }
})