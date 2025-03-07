import ApplicationController from './controller/application.controller.js';
import TransactionController from './controller/transaction.controller.js';
import AccountController from './controller/account.controller.js';
import KycController from './controller/kyc.controller.js';

import { AxiosError } from 'axios';
import express from 'express';
import cors from 'cors';

const transactionController = TransactionController();
const applicationController = ApplicationController();
const accountController = AccountController();
const kycController = KycController();

/**
 * @param {express.Application} app
 */
export default (app) => {
  app.get('/status', (_, res, __) => {
    res.status(200).send('App running!')
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.get('/account/products', accountController.getProducts);

  app.get('/account/:id', accountController.getAccount)

  app.post('/application', applicationController.create)

  app.get('/application/:id', applicationController.getApplication)

  app.post('/transaction', transactionController.createTransaction);

  app.get('/transaction/:id', transactionController.getTransaction);

  app.get('/kyc/:id', kycController.get);

  app.post('/kyc', kycController.create);

  app.use(
    /**
     * @param {Error} err
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     */
    (err, req, res, next) => {
      let message = err.message
      let status = 422
      if (err instanceof AxiosError) {
        message = err.response.data.error;
        console.error(err.response.data);
        status = err.response.status;
      }

      res.status(422).send(message);
    }
  );
}