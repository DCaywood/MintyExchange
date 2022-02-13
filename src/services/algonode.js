import algosdk from 'algosdk';


const token = "";
const server = "https://algoexplorerapi.io/";

const port = "";

// algod client
let AlgoNode = new algosdk.Algodv2(token, server, port);
export default AlgoNode;
