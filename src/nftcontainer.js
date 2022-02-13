import React from "react";
import ReactPlayer from 'react-player';
import { Base64 } from 'js-base64';

export default class NFTContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            hash: '',
            image: '/noNFT.png',
            imageCheck: false,
            isVideo: false
        }
    }

    componentDidMount() {
        console.log('updated I think')
        if(this.props.hash === undefined){
            this.setState({hash: 'None'});
        } else if(this.props.hash.length > 0){
            this.setState({hash: Base64.decode(this.props.hash)});
        }
        
    }

    componentDidUpdate(){
        if(this.state.imageCheck === false){
            this.updateImage();
        }
    }

    updateImage = async() => {
        //Check Hash for a image URL
        if(this.state.hash !== 'None' && this.state.image === '/noNFT.png'){
            let hash = this.state.hash.replace(/\s/g, "");
            if(/(jpg|jpeg|gif|png)$/i.test(hash)){
                this.setState({image: this.state.hash, imageCheck: true});
            } 
        } 
        //Check Asset URL for Image
        if(/(jpg|jpeg|gif|png)$/i.test(this.props.url) && this.state.image === '/noNFT.png'){
            this.setState({image: this.props.url, imageCheck: true});
        } 
        if(this.props.creator === 'INE3CGSY3LXFXUUUOOECCLLPXCZ5AVZSR4WF4XBK7QY7N63XTUKCPOL5K4'){
            console.log('AlgoEye!');
            let url = this.props.url;
            url = url.substring(8);
            let bitlyURL = {"bitlink_id": url}
            bitlyURL = JSON.stringify(bitlyURL);
            let vid = false;
            if(this.props.index !== 213100663){
                vid = true;
            }
            fetch('https://api-ssl.bitly.com/v4/expand', {method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer abf8cd5c3e5b431c24de9aecd4e189e12d02db17'},  body: bitlyURL})
            .then(async response => {return response.json()})
            .then(async response2 => this.setState({isVideo: vid, image: response2.long_url, imageCheck: true})
            );
        }
        //Check for Bitly in the asset URL
        if(this.props.url !== undefined && this.props.url.startsWith("https://bit.ly/") && this.state.image === '/noNFT.png'){
            let url = this.props.url;
            url = url.substring(8);
            let bitlyURL = {"bitlink_id": url}
            bitlyURL = JSON.stringify(bitlyURL);
            fetch('https://api-ssl.bitly.com/v4/expand', {method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer abf8cd5c3e5b431c24de9aecd4e189e12d02db17'},  body: bitlyURL})
            .then(async response => {return response.json()})
            .then(async response2 => this.setState({image: response2.long_url, imageCheck: true})
            );
        }
        if(this.props.url !== undefined && this.props.url.startsWith("http://bit.ly/") && this.state.image === '/noNFT.png'){
            let url = this.props.url;
            url = url.substring(8);
            let bitlyURL = {"bitlink_id": url}
            bitlyURL = JSON.stringify(bitlyURL);
            fetch('https://api-ssl.bitly.com/v4/expand', {method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer abf8cd5c3e5b431c24de9aecd4e189e12d02db17'},  body: bitlyURL})
            .then(async response => {return response.json()})
            .then(async response2 => this.setState({image: response2.long_url, imageCheck: true})
            );
        }
        if(this.props.url !== undefined && this.props.url.startsWith("https://tinyurl.com/") && this.state.image === '/noNFT.png'){
            this.setState({image: this.props.url, imageCheck: true});
        }
        if(this.props.url !== undefined && this.props.url.startsWith("http://tinyurl.com/") && this.state.image === '/noNFT.png'){
            this.setState({image: this.props.url, imageCheck: true});
        }
        if(this.props.url !== undefined && this.props.url.startsWith("tinyurl.com/") && this.state.image === '/noNFT.png'){
            let url = 'http://' + this.props.url;
            this.setState({image: url, imageCheck: true});
        }
        //Check for Bitly in the hash
        if(this.state.hash.startsWith("http://bit.ly/") && this.state.image === '/noNFT.png'){
            let url = this.state.hash;
            url = url.substring(7);
            url = url.replace(/\s/g, "");
            let bitlyURL = {"bitlink_id": url}
            bitlyURL = JSON.stringify(bitlyURL);
            fetch('https://api-ssl.bitly.com/v4/expand', {method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer abf8cd5c3e5b431c24de9aecd4e189e12d02db17'},  body: bitlyURL})
            .then(async response => {return response.json()})
            .then(async response2 => this.setState({image: response2.long_url, imageCheck: true})
            );
        }
        if(this.state.hash.startsWith("https://bit.ly/") && this.state.image === '/noNFT.png'){
            let url = this.state.hash;
            url = url.substring(8);
            url = url.replace(/\s/g, "");
            let bitlyURL = {"bitlink_id": url}
            bitlyURL = JSON.stringify(bitlyURL);
            fetch('https://api-ssl.bitly.com/v4/expand', {method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer abf8cd5c3e5b431c24de9aecd4e189e12d02db17'},  body: bitlyURL})
            .then(async response => {return response.json()})
            .then(async response2 => this.setState({image: response2.long_url, imageCheck: true})
            );
        }
        //Check for a note if something hasn't been found yet
        if(this.props.jsonnote === true && this.state.image === '/noNFT.png'){
            if(this.props.note.type !== undefined && this.props.note.type === 'video' && this.props.note.url !== undefined){
                this.setState({image: this.props.note.url, isVideo: true, imageCheck: true});
            }
            if(this.props.note.url !== undefined){
                    this.setState({image: this.props.note.url, imageCheck: true});
            }
        }
        if(this.props.url !== undefined && this.props.url === 'www.algoworld-nft.com' && this.props.name.startsWith("AW #") && this.state.image === '/noNFT.png'){
            console.log('Algoworld Normal');
            let worldurl = this.props.name;
            worldurl = worldurl.substring(4);
            worldurl = worldurl.split(" ")[0];
            console.log(worldurl)
            worldurl = 'https://algoworld-nft.com/wp-content/uploads/2021/04/' + worldurl + '.png';
            this.setState({image: worldurl, imageCheck: true});
            
        }
        if(this.props.url !== undefined && this.props.url === 'www.algoworld-nft.com' && this.props.name.startsWith("AW Special Card") && this.state.image === '/noNFT.png'){
            let worldurl = this.props.name;
            worldurl = worldurl.split(" ");
            worldurl = worldurl[worldurl.length - 1]
            worldurl = worldurl.toLowerCase();
            console.log(worldurl);
            worldurl = 'https://algoworld-nft.com/wp-content/uploads/2021/05/' + worldurl + '.png';
            this.setState({image: worldurl, imageCheck: true});
        } 
        if(this.state.image === '/noNFT.png'){
            this.setState({asseturl: '/noNFT.png', imageCheck: true});
        }
    }

    jsontest = async(str) => {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
    }

    render(){
    let imageparse;
    if(this.state.isVideo === true){
        imageparse = <ReactPlayer url={this.state.image} className="NFTImage" width="400px" height="400px" volume={0} playing={true} controls={true} loop={true}/>
    } else {
        imageparse = <img src={this.state.image} className="NFTImage" alt="Non Fungible Token" />
    }
    return(
        <div className='NFTContainer'>
                <h2 className="NFTTitle"><b>{this.props.name}</b></h2>
                <p className="NFTIndex">Asset ID - <a href={'https://algoexplorer.io/asset/' + this.props.index}>{this.props.index}</a></p>
                {imageparse}
                <p className="NFTUrl">URL - <a href={this.props.url}>{this.props.url}</a></p>
                <p className="NFTUnhashedData">Unhashed Data: {this.state.hash}</p>
                <p className="NFTMetadataHash">Metadata Hash: {this.props.hash}</p>
                <p className="NFTCreatorAddress">Created By: <a href={'https://algoexplorer.io/address/'+ this.props.creator}>{this.props.creator}</a></p>
                <p className="NFTOwnedAmount">You Own: {this.props.owned} &nbsp; &nbsp; &nbsp; In circulation: {this.props.circulation}</p>
            </div>
        )
    }
}