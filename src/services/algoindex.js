const algosdk = require('algosdk');

const indexer_server = "https://algoexplorerapi.io/idx2";
const indexer_port = "";
const token = ""

const AlgoIndex = new algosdk.Indexer(token, indexer_server, indexer_port);
export default AlgoIndex;