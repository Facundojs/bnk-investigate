import { createHash } from 'crypto'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const idempotency = (req, res, next) => {
  const idempotencyKey = req.headers['x-idempotency-key'];

  if (req.method.toUpperCase() === 'GET') {
    return next()
  }

  if (!idempotencyKey && Object.keys(req.body).length > 0) {
    const idempotencyFromRequest = generateIdempotencyKey(req.body);
    req.headers['x-idempotency-key'] = idempotencyFromRequest;
    return next();
  }

  // Aquí se debería de implementar la lógica para guardar el idempotencyKey
  // en la base de datos, y verificar que no se haya utilizado previamente.
  // En caso de que se haya utilizado previamente, se debería de retornar un
  // error 409 (Conflict).
  next();
}

/**
 * @param {Object} obj - Object to generate the idempotency key
 * @returns {string} - The idempotency key
 */
function generateIdempotencyKey(obj) {
  const hash = createHash("sha256");
  hash.update(JSON.stringify(obj));
  return hash.digest("hex");
}
