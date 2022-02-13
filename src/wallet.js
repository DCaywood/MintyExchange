import React from "react";
import NFTContainer from './nftcontainer.js'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

export default class Wallet extends React.Component {
    constructor(props){
        super(props);
        this.assets = []
        this.state = {
            walletinput: '',
            walletid: 0,
            loaded: false,
            loading: false,
            asseturl: '/noNFT.png',
            hash: '',
            unhash: '',
            autoclick: false,
            assetCount: 0,
            assetsparsed: 0
        }
    }

    componentDidMount(){
        if(this.props.id !== undefined){
            this.setState({walletinput: this.props.id, autoclick: true});
        }
    }

    componentDidUpdate() {
        if(this.state.autoclick === true){
            this.search();
            this.setState({autoclick: false});
        }
    }

    search = async() => {
        try{
            this.assets = [];
            this.setState({loaded: false, loading: true, assetCount: '', assetsparsed: 0});
            console.log(this.state.walletinput);
            let searchassets = await this.props.assetSearch(this.state.walletinput);
            console.log(searchassets);
            this.setState({assetCount: searchassets.length, assetsparsed: 0});
            for(let i = 0; i < searchassets.length; i++){
                let parsed = i + 1;
                this.setState({assetsparsed: parsed});
                let data = await this.props.asaSearch(searchassets[i]['asset-id']);
                console.log(data);
                data.owned = searchassets[i].amount;
                this.assets.push(data);
            }
            this.setState({loaded: true, loading: false});
        }catch (e){
            alert('Something happened! ' + e);
        }
    }

    loaderfunc = async() =>{
        if(this.state.assetsparsed < this.state.assetCount){
            return <b>Loading {this.state.assetsparsed} of {this.state.assetCount}</b>
        } else {
            return <b>{this.state.assets}</b>
        }
    }

    render(){
        if(this.state.loaded === false && this.state.loading === false){
        return(
            <div className="content">
                <h1>Wallet Viewer</h1>
                <label>
                    Wallet Address: &nbsp;
                    <input type="text" className="inputWallet" value={this.state.walletinput} onChange={e => this.setState({walletinput: e.target.value})} /> &nbsp;
                    <Button onClick={this.search}>Search for Wallet</Button>
                </label>
            </div>
        )
        }
        if(this.state.loaded === false && this.state.loading === true){
            let items = [];
            if(this.assets.length > 0){
                items = this.assets.map((asset, i) =>
                <NFTContainer key={i} name={asset.params.name} url={asset.params.url} hash={asset.params['metadata-hash']} owned={asset.owned} note={asset.note} jsonnote={asset.JSONnote}circulation={asset.params.total} creator={asset.params.creator} index={asset.index}/>
                );
            }
            let loadtext;
            if(this.state.assetsparsed < this.state.assetCount){
                loadtext = <b>Loading {this.state.assetsparsed} of {this.state.assetCount}</b>;
            }
            return(
                <div className="content">
                    <h1>Wallet Viewer</h1>
                    <label>
                        Wallet Address: &nbsp;
                        <input type="text" className="inputWallet" value={this.state.walletinput} onChange={e => this.setState({walletinput: e.target.value})} /> &nbsp;
                        <Button onClick={this.search}>Search for Wallet</Button>
                    </label>
                    <p>{loadtext}</p>
                    <ul className="NFTList">{items}</ul> 
                </div>
            )
            }
        if(this.state.loaded === true){
            const items = this.assets.map((asset, i) =>
                <NFTContainer key={i} name={asset.params.name} url={asset.params.url} hash={asset.params['metadata-hash']} owned={asset.owned} note={asset.note} jsonnote={asset.JSONnote}circulation={asset.params.total} creator={asset.params.creator} index={asset.index}/>
            );
            return(
                <div className="content">
                    <h1>Wallet Viewer</h1>
                    <label>
                        Wallet Address: &nbsp;
                        <input type="text" className="inputWallet" value={this.state.walletinput} onChange={e => this.setState({walletinput: e.target.value})} /> &nbsp;
                        <Button onClick={this.search}>Search for Wallet</Button>
                    </label>
                    <ul className="NFTList">{items}</ul>
                </div>
            )
            }
    }
}