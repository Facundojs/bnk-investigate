# Proyecto de Integración con Treasury Prime

Este proyecto implementa funcionalidades clave de Treasury Prime, incluyendo la gestión de cuentas (`account`), verificación de identidad (`kyc`), solicitudes de cuenta (`application`) y transacciones (`transactions`). A continuación, se detallan estos componentes y se proporcionan instrucciones para su uso, basadas en la documentación oficial de Treasury Prime.

## Jerarquía de Recursos: Cuentas y Proceso de Apertura

En Treasury Prime, la apertura de una cuenta bancaria sigue una jerarquía específica de recursos que deben crearse en orden:

1. **`Person Application`**: Representa la información personal del solicitante y se utiliza para realizar la verificación de identidad (KYC).
2. **`Account Application`**: Utiliza la `Person Application` para solicitar la apertura de una nueva cuenta bancaria.

Este proceso garantiza que se recopile y verifique toda la información necesaria antes de la apertura de la cuenta.

## Proceso de Apertura de una Cuenta

Para abrir una cuenta en Treasury Prime, siga estos pasos:

1. **Crear una `Person Application`**: Envíe la información personal del cliente para realizar la verificación de identidad (KYC). Esto incluye datos como nombre, dirección, fecha de nacimiento, entre otros.

   ```bash
   curl -u $API_KEY_ID:$API_SECRET_KEY https://api.treasuryprime.com/apply/person_application \
       -H 'Content-Type: application/json' \
       -d '{
             "first_name": "John",
             "last_name": "Doe",
             "email_address": "johndoe@example.com",
             "date_of_birth": "1990-01-01",
             "physical_address": {
               "street_line_1": "123 Main St",
               "city": "Anytown",
               "state": "CA",
               "postal_code": "12345"
             }
           }'
Referencia: [Documentación de Person Application
](https://developers.sandbox.treasuryprime.com/guides/open-accounts#1-create-a-person-application)

2. **Crear una `Account Application`**: Una vez que la Person Application ha sido aprobada, utilice su ID para crear una Account Application, especificando el producto de cuenta deseado y otros detalles necesarios.
```bash
curl -u $API_KEY_ID:$API_SECRET_KEY https://api.treasuryprime.com/apply/account_application \
    -H 'Content-Type: application/json' \
    -d '{
          "person_applications": [
            {
              "id": "apsn_01d5w6yaa6vt",
              "roles": ["owner", "signer"]
            }
          ],
          "primary_person_application_id": "apsn_01d5w6yaa6vt",
          "account_product_id": "apt_11gqk87qmrax"
        }'

```

## Visión General de las Transacciones

Las transacciones en Treasury Prime permiten mover fondos entre cuentas utilizando diferentes métodos, tales como:

- **Transferencias ACH**: Permiten transferencias electrónicas entre cuentas bancarias en EE.UU.
- **Transferencias internas (Book Transfers)**: Movimientos de fondos entre cuentas dentro del mismo banco.
- **Transferencias por cable (Wire Transfers)**: Transferencias electrónicas rápidas, tanto nacionales como internacionales.

Cada tipo de transacción tiene sus propias características y tiempos de procesamiento. Es esencial seleccionar el tipo adecuado según las necesidades específicas de la operación.

[Referencia: Documentación de Transacciones](https://docs.treasuryprime.com/docs/ach-origination)

## Problema del Sandbox Prefondeado

El entorno Sandbox de Treasury Prime está diseñado para pruebas y desarrollo. En este entorno, las cuentas están prefinanciadas con fondos ficticios para facilitar las pruebas sin riesgo financiero real. Es importante destacar que las operaciones realizadas en el Sandbox no afectan a redes bancarias reales ni a saldos de cuentas reales, y no incurren en costos.

[Referencia: Documentación del Sandbox](https://docs.treasuryprime.com/reference/introduction)
