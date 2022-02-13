import React from 'react';
import Header from './header.js';
import Content from './content.js';
import MintNFT from './mintnft.js';
import Footer from './footer.js';
//import AlgoNode from './services/algonode.js'
//import AlgoIndex from './services/algoindex.js'
import MyAlgo from '@randlabs/myalgo-connect'
import MyNFTs from './mynfts.js'
import NodeSettings from './nodesettings.js'
import ViewASA from './viewasa.js'
import Wallet from './wallet.js'
import { Base64 } from 'js-base64';
import {useState, useCallback} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import algosdk from 'algosdk';
const myAlgoWallet = new MyAlgo();

class App extends React.Component {
    constructor (props) {
        super(props);
        this.assets = {};
        this.algosigner = [];
        this.assetinfo = {};
        this.assetsLoaded = false;
        this.assetTotal = []
        this.state = {
            isLogged: false,
            selectedAccount: '',
            assets: [],
            assetsLoaded: false,
            nodeToken: "",
            nodeServer: "https://algoexplorerapi.io/",
            nodePort: "",
            nodeOption: 0,
            indexerToken: "",
            indexerServer: "https://algoexplorerapi.io/idx2",
            indexerPort: "",
            indexerOption: 0,
            isAlgoSign: false
        }
    }

    logFunc = async() => {
        try {
            const myAlgoaccounts = await myAlgoWallet.connect();
            const accounts = myAlgoaccounts.map(account => account.address);
            this.setState({isLogged: true, accounts: accounts, selectedAccount: accounts[0]});
            this.updateUserNFTs();
        } catch (err){
            console.log(err);
        }
    }
    updateUserNFTs = async () =>{
        let AlgoNode = new algosdk.Algodv2(this.state.nodeToken, this.state.nodeServer, this.state.nodePort);
        let bal = await AlgoNode.accountInformation(this.state.selectedAccount).do();
        let assets = bal.assets.map(asset => asset['asset-id']);
        for(let i = 0; i < bal.assets.length; i++){
            if(bal.assets[i].amount > 0){
                let assetBal = {
                    id: bal.assets[i]['asset-id'],
                    bal: bal.assets[i].amount
                }
                this.assetTotal.push(assetBal);
            }
        }
        this.setState({assets: assets});
        this.setState({assetsLoaded: false});
    }


    loginClick = async() => {
        await this.logFunc();
    }

    waitForConfirm = async(txID) => {
        try{
            let AlgoNode = new algosdk.Algodv2(this.state.nodeToken, this.state.nodeServer, this.state.nodePort);
            let status = (await AlgoNode.status().do());
            if (status === undefined) throw new Error("Unable to get node status");
            let startRound = status["last-round"] + 1;
            let currentRound = startRound;
            while(currentRound <(startRound + 1500)){
                let pendingInfo = await AlgoNode.pendingTransactionInformation(txID).do();
                if(pendingInfo !== undefined){
                    if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0){
                        return pendingInfo;
                    }
                    else {
                        if (pendingInfo["pool-error"] != null && pendingInfo["pool-error"].length > 0){
                            // If there was a pool error, then the transaction has been rejected!
                            throw new Error("Transaction Rejected! Pool error" + pendingInfo["pool-error"]);
                        }
                    }
                }
                await AlgoNode.statusAfterBlock(currentRound).do();
                currentRound++
            }
            throw new Error("Transaction not confirmed after 15 rounds!");
        } catch(err){
            console.log(err);
        }
    }

    mintNFT = async(mintData) =>{
        let AlgoNode = new algosdk.Algodv2(this.state.nodeToken, this.state.nodeServer, this.state.nodePort);
        try {
        if(mintData.assetMetadata === ''){
            mintData.assetMetadata = undefined;
        }
        if(mintData.assetFreezeAdd === ''){
            mintData.assetFreezeAdd = undefined;
        }
        if(mintData.assetManagerAdd === ''){
            mintData.assetManagerAdd = undefined;
        }
        if(mintData.assetReserveAdd === ''){
            mintData.assetReserveAdd = undefined;
        }
        if(mintData.assetClawbackAdd === ''){
            mintData.assetClawbackAdd = undefined;
        }
        if(mintData.notes === ''){
            mintData.notes = undefined;
        } else  {
            mintData.notes = new Uint8Array(Buffer.from(mintData.notes));
        }
        let txn = await AlgoNode.getTransactionParams().do();
        txn = {
            ...txn,
            fee: 1000,
            flatFee: true,
            type: 'acfg',
            from: this.state.selectedAccount,
            assetName: mintData.assetName,
            assetUnitName: mintData.assetUnitName,
            assetDecimals: parseInt(mintData.assetDecimals),
            assetTotal: parseInt(mintData.assetTotal),
            assetURL: mintData.assetURL,
            assetMetadataHash: mintData.assetMetadata,
            assetFreeze: mintData.assetFreezeAdd,
            assetManager: mintData.assetManagerAdd,
            assetReserve: mintData.assetReserveAdd,
            assetClawback: mintData.assetClawbackAdd,
            assetDefaultFrozen: mintData.assetFrozen,
            note: mintData.notes
        };
        if(this.state.isAlgoSign === true){
            let signedTran = await AlgoSigner.sign(txn);
            console.log(signedTran);
            await AlgoNode.sendRawTransaction(signedTran.blob).do();
            let isConfirmed = await this.waitForConfirm(signedTran.txID);
            if (isConfirmed !== undefined){
                this.refreshNFT();
                alert('Transaction successful - New NFT Created'); 
            }
        } else {
            let signedTran = await myAlgoWallet.signTransaction(txn);
            await AlgoNode.sendRawTransaction(signedTran.blob).do();
            let isConfirmed = await this.waitForConfirm(signedTran.txID);
            if (isConfirmed !== undefined){
                this.refreshNFT();
                alert('Transaction successful - New NFT Created'); 
            }
        }
        }  catch(err) {
            alert('Error processing NFT ' + err.message);
            console.log(err);
        }
    }
    getNFTdata = async() =>{
        let data = []
        let AlgoIndex = new algosdk.Indexer(this.state.indexerToken, this.state.indexerServer, this.state.indexerPort);
        let AlgoNode = new algosdk.Algodv2(this.state.nodeToken, this.state.nodeServer, this.state.nodePort);
        let bal = await AlgoNode.accountInformation(this.state.selectedAccount).do();
        for(let i = 0; i < bal.assets.length; i++){
            if(bal.assets[i].amount > 0){
                let NFTdata = await AlgoIndex.searchForAssets().index(this.state.assets[i]).do();
                NFTdata = NFTdata.assets[0];
                NFTdata.NFTamount = bal.assets[i].amount;
                let moreData = await AlgoIndex.lookupAssetTransactions(this.state.assets[i]).txType('acfg').do();
                if(moreData.transactions[0].note !== undefined){
                    let isNoteJson = await this.jsontest(Base64.decode(moreData.transactions[0].note));
                    if(isNoteJson === true){
                        let noteJson = JSON.parse(Base64.decode(moreData.transactions[0].note));
                        NFTdata = {
                            ...NFTdata,
                            note: noteJson,
                            JSONnote: true
                        }
                    } else {
                        NFTdata = {
                            ...NFTdata,
                            note: Base64.decode(moreData.transactions[0].note),
                            JSONnote: false
                        };
                    }
                }
                data.push(NFTdata);
            }
        }
        this.assets = data;
        this.setState({assetsLoaded: true});
    }
    refreshNFT = async() =>{
        await this.updateUserNFTs();
    }

    selectAccount = async(acct) =>{
        this.setState({selectedAccount: acct, assetsLoaded: false});
    }

    updateNode = async(info) =>{
        this.setState({nodeOption: info.option, nodeServer: info.url, nodePort: info.port, nodeToken: info.token});
        let text = 'Algorand Node Updated - ' + info.url;
        alert(text);
        return;
    }

    jsontest = async(str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    updateIndexer = async(info) =>{
        this.setState({indexerOption: info.option, indexerServer: info.url, indexerPort: info.port, indexerToken: info.token});
        let text = 'Algorand Indexer Updated - ' + info.url;
        alert(text);
    }

    asaSearch = async(asa) =>{
        let AlgoIndex = new algosdk.Indexer(this.state.indexerToken, this.state.indexerServer, this.state.indexerPort);
        try{
        let NFTdata = await AlgoIndex.searchForAssets().index(asa).do();
        NFTdata = NFTdata.assets[0];
        let moreData = await AlgoIndex.lookupAssetTransactions(asa).txType('acfg').do();
        if(moreData.transactions !== undefined && moreData.transactions[0].note !== undefined){
            let isNoteJson = await this.jsontest(Base64.decode(moreData.transactions[0].note));
            if(isNoteJson === true){
                let noteJson = JSON.parse(Base64.decode(moreData.transactions[0].note));
                NFTdata = {
                    ...NFTdata,
                    note: noteJson,
                    JSONnote: true
                }
            } else {
                NFTdata = {
                    ...NFTdata,
                    note: Base64.decode(moreData.transactions[0].note),
                        JSONnote: false
                    };
            }
        } else {
            NFTdata = {
                ...NFTdata,
                note: undefined
            };
        }
        return(NFTdata);
        }catch(err){
            alert('Could not find valid NFT Data');
        }
    }

    walletSearch = async(walletid) =>{
        let AlgoNode = new algosdk.Algodv2(this.state.nodeToken, this.state.nodeServer, this.state.nodePort);
        let AlgoIndex = new algosdk.Indexer(this.state.indexerToken, this.state.indexerServer, this.state.indexerPort);
        try{
            let assetIDs = await AlgoNode.accountInformation(walletid).do();
            let assets = []
            for(let i = 0; i < assetIDs.assets.length; i++){
                if(assetIDs.assets[i].amount > 0){
                    console.log('Asset check: ' + i);
                    let NFTinfo = await AlgoIndex.searchForAssets().index(assetIDs.assets[i]['asset-id']).do();
                    NFTinfo = NFTinfo.assets[0];
                    let moreData = await AlgoIndex.lookupAssetTransactions(assetIDs.assets[i]['asset-id']).txType('acfg').do();
                    if(moreData.transactions !== undefined && moreData.transactions[0].note !== undefined){
                        let isNoteJson = await this.jsontest(Base64.decode(moreData.transactions[0].note));
                        if(isNoteJson === true){
                            let noteJson = JSON.parse(Base64.decode(moreData.transactions[0].note));
                            NFTinfo = {
                                ...NFTinfo,
                                note: noteJson,
                                JSONnote: true,
                                owned: assetIDs.assets[i].amount
                            }
                        } else {
                            NFTinfo = {
                                ...NFTinfo,
                                note: Base64.decode(moreData.transactions[0].note),
                                JSONnote: false,
                                owned: assetIDs.assets[i].amount
                            };
                        }
                    } else {
                        NFTinfo= {
                            ...NFTinfo,
                            note: undefined,
                            owned: assetIDs.assets[i].amount
                        };
                    }
                    assets.push(NFTinfo);
                }
            }
            return assets;
        }catch(e){
            return e;
        }
    }

    algosignLogin = async() =>{
        try{
            await AlgoSigner.connect();
            let accts = await AlgoSigner.accounts({ ledger: 'MainNet'});
            const accounts = accts.map(account => account.address);
            console.log(accounts);
            this.setState({isLogged: true, accounts: accounts, selectedAccount: accounts[0], isAlgoSign: true});
            this.updateUserNFTs();
        } catch(e){
            console.log(e);
            return e;
        }
    }

    getAssetIDs = async(walletid) =>{
        let AlgoNode = new algosdk.Algodv2(this.state.nodeToken, this.state.nodeServer, this.state.nodePort);
        try{
            let assetIDs = await AlgoNode.accountInformation(walletid).do();
            assetIDs = assetIDs.assets.filter(asset => asset.amount > 0);
            assetIDs = assetIDs.sort((a, b) => (a['asset-id'] > b['asset-id'] ? 1 : -1));
            return assetIDs;
        }catch(e){
            return e;
        }
    }

    render(){
    return(
            <>
            <Router>    
            <Header login={this.state.isLogged} handleClick={this.loginClick} handleAlgoSign={this.algosignLogin} accounts={this.state.accounts} selAcct={this.state.selectedAccount} handleChange={this.selectAccount}/>
                <Switch>
                    <Route path="/mint">
                        <MintNFT isLogged={this.state.isLogged} account={this.state.accounts} mint={this.mintNFT} nodeOption={this.state.nodeOption}/> 
                    </Route>
                    <Route path="/mynfts">
                        <MyNFTs isLogged={this.state.isLogged} isLoaded={this.state.assetsLoaded} assets={this.assets} getNFT={this.getNFTdata} refreshNFT={this.refreshNFT} nodeOption={this.state.nodeOption}/>
                    </Route>
                    <Route path="/settings">
                        <NodeSettings nodeOption={this.state.nodeOption} indexerOption={this.state.indexerOption} updateNode={this.updateNode} updateIndexer={this.updateIndexer}/>
                    </Route>
                    <Route exact path="/asaviewer">
                        <ViewASA nodeOption={this.state.nodeOption} search={this.asaSearch}/>
                    </Route>
                    <Route path="/asaviewer/:id" render={({ match }) => <ViewASA nodeOption={this.state.nodeOption} search={this.asaSearch} id={match.params.id}/>}/>
                    <Route exact path="/wallet/">
                        <Wallet walletSearch={this.walletSearch} assetSearch={this.getAssetIDs} asaSearch={this.asaSearch}/>
                    </Route>
                    <Route path="/wallet/:id" render={({match}) => <Wallet walletSearch={this.walletSearch} assetSearch={this.getAssetIDs} asaSearch={this.asaSearch}id={match.params.id} />} />
                    <Route exact path="/">
                        <Content />
                    </Route>
                </Switch>
            </Router>
            <Footer />
            </>
        );
    }
}

export default App;