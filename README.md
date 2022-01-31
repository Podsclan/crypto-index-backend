
# crypto-index-backend

crypto-index-backend is a backend project that uses CoinDesk [API](https://api.coindesk.com/v1/bpi/currentprice/BTC.json)

## Run Locally

Clone the project

```bash
  git clone https://github.com/Podsclan/crypto-index-backend
```

Go to the project directory

```bash
  cd crypto-index-backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```
**Default URL**: http://localhost:8080

## API Reference

#### Login

```http
  POST /api/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. User email |
| `password` | `string` | **Required**. User password |

#### Get quotationsQ
```http
  GET /api/crypto/btc
```

| Request Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. User token |

#### Update Quotation

```http
  POST /api/crypto/btc
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `currency` | `string` | **Required**. Currency to update |
| `value` | `number` | **Required**. New currency value |

| Request Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. User token |
