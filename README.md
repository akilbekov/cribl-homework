# Cribl homework

## Getting Start

### Environment setup

Install bun or NodeJS > 20.x, as project uses native fetch and env without dependecies.

```bash
curl -fsSL https://bun.sh/install | bash

or

curl -fsSL https://fnm.vercel.app/install | bash
# activate fnm
source ~/.bashrc
# download and install Node.js
fnm use --install-if-missing 20
```

Clone repo and rename .env.example to .env

Setup HEC source on [Cribl](https://docs.cribl.io/stream/sources-splunk-hec/). Copy ingest URL and token to .env file. Sourcetype and index are optional, if you want to use custom index, allow them in the HEC source.

```bash
bun install

or

npm install
```

## How-to run

```bash
bun run index.js

or

node --env-file=.env index.js
```

### With custom source URL

```bash
bun run index.js --url=https://ergast.com/api/f1/constructors.json

or

node --env-file=.env index.js  --url=https://ergast.com/api/f1/constructors.json
```

## What can be improved

- Handle other types of logs, currently assumes data comes only in JSON format
- Error handling during timeout, due to fetch implementiation, it can hang the script without informing about error. Possible solution is to add [AbortSignal.timeout(time)](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static)
- Add pagination support
- Sending multiple events as array, currently everything is sent as a one big event
