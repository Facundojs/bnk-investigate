import { treasureApi } from "@/api";

export class TransactionService {
  /**
   *
   * @param {String} from_account - Account (ID) from which the transaction is made
   * @param {String} to_account - Account (ID) to which the transaction is made
   * @param {Number} amount - Amount of the transaction
   * @param {String} type - Type of transaction
   */
  async createTransaction(from_account, to_account, amount, type, body = {}) {
    const data = { from_account, to_account, amount, type, ...body }
    const txn = await treasureApi.post(`/${type}`)
  }
}