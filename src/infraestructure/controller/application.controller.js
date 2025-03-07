import { treasureApi } from '../../api.js';

export default () => ({
  create: async (req, res, next) => {
    try {
      const { account_product_id, kyc_id } = req.body;

      const accountApplicationResponse = await treasureApi.post(
        '/apply/account_application',
        {
          person_applications: [
            {
              id: kyc_id,
              roles: [
                "owner",
                "signer"
              ]
            }
          ],
          primary_person_application_id: kyc_id,
          account_product_id
        }
      );

      const { id, status, created_at } = accountApplicationResponse.data

      return res.status(200).send({
        account_application_id: id,
        created_at,
        status,
        kyc_id,
      });
    }
    catch (error) {
      next(error);
    }
  },
  getApplication: async (req, res, next) => {
    try {
      const applicationId = req.params.id;

      const accountResponse = await treasureApi.get(`/apply/account_application/${applicationId}`);

      const { id, status, created_at, updated_at, account_number, account_id, account_product_id } = accountResponse.data

      return res.status(200).send({ id, status, created_at, updated_at, account_number, account_id, account_product_id });
    } catch (error) {
      next(error);
    }
  }
})