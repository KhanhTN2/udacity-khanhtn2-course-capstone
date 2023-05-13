# Serverless Mystery Diary


# Frontend
configuration

```ts
const apiId = 'jlugceduee'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-gf5wx2z3abauhbmd.us.auth0.com',            // Auth0 domain
  clientId: 'bZJZzFN2GyL6o5mUBZaZAJzrYJrdCRwG',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}

```


## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

