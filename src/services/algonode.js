import algosdk from 'algosdk';

//const token = "2fd6f930612606e3346fc0291621b50d58833c2a02aadac75d721d7ce057147e";
const token = "";
const server = "https://algoexplorerapi.io/";
//const port = "8112";
const port = "";

// algod client
let AlgoNode = new algosdk.Algodv2(token, server, port);
export default AlgoNode;