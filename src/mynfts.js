import React from "react";
import NFTContainer from './nftcontainer.js'
import Button from 'react-bootstrap/Button';

export default class MyNFTs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            assetsLoaded: false,
            pageLoaded: false
        };
        this.info = {}
    }
    
    componentDidMount() {
        if(this.props.isLoaded === false && this.props.isLogged === true){
            this.props.getNFT();
        }
    }

    componentDidUpdate(){
        if(this.props.isLoaded === false && this.props.isLogged === true){
            this.props.getNFT();
        }
    }

    

    

    render(){
        if(this.props.isLogged === false){
            return(
                <div className="content">
                    <p>Please login to see your NFTs</p>
                </div>
            );
        } 
        if(this.props.isLogged === true && this.props.isLoaded === false){
            return(
            <div className="content">
               <p>Loading assets</p>
            </div>
            );
        }
        if(this.props.isLoaded === true && this.props.assets.length === 0){
            return(
            <div className="content">
               <ul>You have no Algorand Standard Assets</ul>
               <Button className="refreshNFT" onClick={this.props.refreshNFT} style={{display : 'inline-block'}}>Refresh Account Assets</Button>
               <p style={{display : 'inline-block'}}>&nbsp; Click this if you've recently created a new token or changed accounts</p>
            </div>
            );
        }
        if(this.props.isLoaded === true && this.props.assets.length > 0){
            const items = this.props.assets.map((asset, i) =>
                <NFTContainer key={i} name={asset.params.name} url={asset.params.url} hash={asset.params['metadata-hash']} owned={asset.NFTamount} note={asset.note} jsonnote={asset.JSONnote}circulation={asset.params.total} creator={asset.params.creator} index={asset.index}/>
            );
            return(
                <div className="content">
                    <h3 className="NFTCount">You have {this.props.assets.length} NFTs</h3>
                    <div className="refDiv">
                        <Button className="refreshNFT" onClick={this.props.refreshNFT} style={{display : 'inline-block'}}>Refresh Account Assets</Button>
                        <p style={{display : 'inline-block'}}>&nbsp; Click this if you've recently created a new token or changed accounts</p>
                    </div>
                    <ul className="NFTList">{items}</ul>
                </div>
                );
        } else {
            return(
            <p>something is wrong</p>
            )
        }
    }
}