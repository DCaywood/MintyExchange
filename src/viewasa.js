import React from "react";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ReactPlayer from 'react-player';
import { Base64 } from 'js-base64';

export default class ViewASA extends React.Component {
    constructor(props){
        super(props);
        this.asset = {}
        this.state = {
            asainput: '',
            asaid: 0,
            loaded: true,
            isVideo: false,
            asseturl: '/load.png',
            hash: '',
            unhash: '',
            autoclick: false
        }
    }

    componentDidMount(){
        if(this.props.id !== undefined){
            this.setState({asainput: this.props.id, autoclick: true});
        }
        if(this.state.asainput !== ''){
            this.click();
        }
    }

    componentDidUpdate() {
        if(this.state.autoclick === true){
            this.click();
            this.setState({autoclick: false});
        }
    }

    click = async() =>{
        try{
        this.asset = await this.props.search(this.state.asainput);
        let id = await this.state.asainput;
        if(this.asset !== undefined){
            this.setState({loaded: true, asaid: id});
            if(this.asset.params['metadata-hash'] !== undefined){
                this.setState({hash: this.asset.params['metadata-hash'], unhash: Base64.decode(this.asset.params['metadata-hash'])})
            } else {
                this.setState({hash: '', unhash: ''})
            }
            this.nftimage();
            return;
        } else {
            this.setState({loaded: false, asaid: 0});
        }
        } catch(err){
            console.log(err);
        }
    }

    nftimage = async() =>{
        if(this.asset.params.url !== undefined && /(jpg|jpeg|gif|png)$/i.test(this.asset.params.url)){
            this.setState({asseturl: this.asset.params.url});
            return;
        }
        if(this.asset.params.creator === 'INE3CGSY3LXFXUUUOOECCLLPXCZ5AVZSR4WF4XBK7QY7N63XTUKCPOL5K4'){
            console.log('AlgoEye!');
            let url = this.asset.params.url;
            url = url.substring(8);
            let bitlyURL = {"bitlink_id": url}
            bitlyURL = JSON.stringify(bitlyURL);
            let vid = false;
            if(this.asset.index !== 213100663){
                vid = true;
            }
            fetch('https://api-ssl.bitly.com/v4/expand', {method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer abf8cd5c3e5b431c24de9aecd4e189e12d02db17'},  body: bitlyURL})
            .then(async response => {return response.json()})
            .then(async response2 => this.setState({isVideo: vid, asseturl: response2.long_url})
            );
            return;
        }
        if(this.asset.params.url !== undefined && this.asset.params.url.startsWith("https://bit.ly/")){
            let url = this.asset.params.url;
            url = url.substring(8);
            let bitlyURL = {"bitlink_id": url}
            bitlyURL = JSON.stringify(bitlyURL);
            fetch('https://api-ssl.bitly.com/v4/expand', {method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer abf8cd5c3e5b431c24de9aecd4e189e12d02db17'},  body: bitlyURL})
            .then(async response => {return response.json()})
            .then(async response2 => this.setState({asseturl: response2.long_url})
            );
            return;
        }
        if(this.asset.params.url !== undefined && this.asset.params.url.startsWith("http://bit.ly/")){
            let url = this.asset.params.url;
            url = url.substring(7);
            let bitlyURL = {"bitlink_id": url}
            bitlyURL = JSON.stringify(bitlyURL);
            fetch('https://api-ssl.bitly.com/v4/expand', {method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer abf8cd5c3e5b431c24de9aecd4e189e12d02db17'},  body: bitlyURL})
            .then(async response => {return response.json()})
            .then(async response2 => this.setState({asseturl: response2.long_url})
            );
            return;
        }
        if(this.asset.params.url !== undefined && this.asset.params.url.startsWith("http://tinyurl.com")){
            this.setState({asseturl: this.asset.params.url})
            return;
        }
        if(this.asset.params.url !== undefined && this.asset.params.url.startsWith("https://tinyurl.com")){
            this.setState({asseturl: this.asset.params.url})
            return;
        }
        if(this.asset.params.url !== undefined && this.asset.params.url.startsWith("tinyurl.com")){
            let url = 'http://' + this.asset.params.url;
            this.setState({asseturl: url})
            return;
        }
        if(this.asset.params['metadata-hash'] !== undefined){
            let unhash = Base64.decode(this.asset.params['metadata-hash']);
            unhash = unhash.replace(/\s/g, "");
            if(/(jpg|jpeg|gif|png)$/i.test(unhash)){
                this.setState({asseturl: unhash});
                return;
            } 
        } 
        if(this.asset.JSONnote === true){
            if(this.asset.note.type !== undefined && this.asset.note.type === 'video' && this.asset.note.url !== undefined){
                this.setState({asseturl: this.asset.note.url, isVideo: true});
                return;
            }
            if(this.asset.note.url !== undefined){
                this.setState({asseturl: this.asset.note.url});
                return;
            }
        }
        if(this.state.unhash.startsWith("http://bit.ly/")){
            let url = this.state.unhash;
            url = url.substring(7);
            url = url.replace(/\s/g, "");
            let bitlyURL = {"bitlink_id": url}
            bitlyURL = JSON.stringify(bitlyURL);
            fetch('https://api-ssl.bitly.com/v4/expand', {method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer abf8cd5c3e5b431c24de9aecd4e189e12d02db17'},  body: bitlyURL})
            .then(async response => {return response.json()})
            .then(async response2 => this.setState({asseturl: response2.long_url})
            );
            return;
        }
        if(this.state.unhash.startsWith("https://bit.ly/")){
            let url = this.state.unhash;
            url = url.substring(8);
            url = url.replace(/\s/g, "");
            let bitlyURL = {"bitlink_id": url}
            bitlyURL = JSON.stringify(bitlyURL);
            fetch('https://api-ssl.bitly.com/v4/expand', {method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer abf8cd5c3e5b431c24de9aecd4e189e12d02db17'},  body: bitlyURL})
            .then(async response => {return response.json()})
            .then(async response2 => this.setState({asseturl: response2.long_url})
            );
            return;
        }
        if(this.asset.params.url !== undefined && this.asset.params.url === 'www.algoworld-nft.com' && this.asset.params.name.startsWith("AW #")){
            console.log('Algoworld Normal');
            let worldurl = this.asset.params.name;
            worldurl = worldurl.substring(4);
            worldurl = worldurl.split(" ")[0];
            console.log(worldurl)
            worldurl = 'https://algoworld-nft.com/wp-content/uploads/2021/04/' + worldurl + '.png';
            this.setState({asseturl: worldurl});
            return;
        }
        if(this.asset.params.url !== undefined && this.asset.params.url === 'www.algoworld-nft.com' && this.asset.params.name.startsWith("AW Special Card")){
            let worldurl = this.asset.params.name;
            worldurl = worldurl.split(" ");
            worldurl = worldurl[worldurl.length - 1]
            worldurl = worldurl.toLowerCase();
            console.log(worldurl);
            worldurl = 'https://algoworld-nft.com/wp-content/uploads/2021/05/' + worldurl + '.png';
            this.setState({asseturl: worldurl});
            return;
        } else {
            this.setState({asseturl: '/noNFT.png'});
            return;
        }
    }

    render(){
        let warning;
        if(this.props.nodeOption === 1){
            warning = <Alert variant="warning">This is searching the Algorand TestNet</Alert>
        }
        if(this.state.asaid === 0){
        return(
            <div className="content">
                <h1>Individual ASA Viewer</h1>
                {warning}
                <label>
                    ASA ID: &nbsp;
                    <input type="text" className="inputASAID" value={this.state.asainput} onChange={e => this.setState({asainput: e.target.value})} /> &nbsp;
                    <Button onClick={this.click}>Search for ASA</Button>
                </label>
            </div>
        )
        } 
        if(this.state.asaid !== 0 && this.state.loaded === false){
            return(
                <div className="content">
                    <h1>Individual ASA Viewer</h1>
                    {warning}
                    <label>
                        ASA ID: &nbsp;
                        <input type="text" className="inputASAID" value={this.state.asainput} onChange={e => this.setState({asainput: e.target.value})} /> &nbsp;
                        <Button onClick={this.click}>Search for ASA</Button>
                    </label>
                    <br />
                    <h3>Loading</h3>
                </div>
            )
        }
        if(this.state.loaded === true && this.state.id !== 0){
            let imageparse;
            if(this.state.isVideo === true){
                imageparse = <ReactPlayer url={this.state.asseturl} className="NFTImage" playing={true} volume={0} controls={true} loop={true}/>
            } else {
                imageparse = <img src={this.state.asseturl} className="NFTImage" alt="Non Fungible Token" />
            }
            return(
                <div className="content">
                    <h1>Individual ASA Viewer</h1>
                    {warning}
                    <label>
                        ASA ID: &nbsp;
                        <input type="text" className="inputASAID" value={this.state.asainput} onChange={e => this.setState({asainput: e.target.value})} /> &nbsp;
                        <Button onClick={this.click}>Search for ASA</Button>
                    </label>
                    <br />
                    <div className="indAssetView">
                        <h3>{this.asset.params.name}</h3>
                        <p>Asset ID  - <a href={'https://algoexplorer.io/asset/' + this.asset.index}>{this.asset.index}</a></p>
                        {imageparse}
                        <p>Asset URL: <a href={this.asset.params.url}>{this.asset.params.url}</a></p>
                        <p>Unhashed MetaData: {this.state.unhash}</p>
                        <p>Raw MetaData: {this.state.hash}</p>
                        <p>Created by: <a href={'https://algoexplorer.io/address/' + this.asset.params.creator}>{this.asset.params.creator}</a></p>
                        <p>Amount in circulation: {this.asset.params.total}</p>
                    </div>
                </div>
            )
        }
    }
}
