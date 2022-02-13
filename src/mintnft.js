import React from "react";
import Form from 'react-bootstrap/Form';
import SubmitButton from './components/submitButton.js';
import Alert from 'react-bootstrap/Alert';

export default class MintNFT extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            assetName:"",
            assetUnitName:"",
            assetDecimals:0,
            assetTotal:1,
            assetURL: "http://minty.exchange/",
            assetMetadata: "",
            assetIsFrozen: false,
            assetFreezeAdd: '',
            assetManagerAdd: '',
            assetReserveAdd: '',
            assetClawbackAdd: '',
            submitClick: false,
            notes: ''
        }
    }
    

    mySubmit = async() =>{
        await this.setState({submitClick: true});
        let mintData = {
            assetName: this.state.assetName,
            assetUnitName: this.state.assetUnitName,
            assetDecimals: this.state.assetDecimals,
            assetTotal: this.state.assetTotal,
            assetURL: this.state.assetURL,
            assetMetadata: this.state.assetMetadata,
            assetFrozen: this.state.assetIsFrozen,
            assetFreezeAdd: this.state.assetFreezeAdd,
            assetManagerAdd: this.state.assetManagerAdd,
            assetReserveAdd: this.state.assetReserveAdd,
            assetClawbackAdd: this.state.assetClawbackAdd,
            notes: this.state.notes
        }
        console.log(mintData);
        await this.props.mint(mintData);
        await this.setState({submitClick: false});
    }

    checkBox = async(e) =>{
        console.log(e.target)
        if(this.state.assetIsFrozen === true){
            this.setState({assetIsFrozen: false});
        }
        if(this.state.assetIsFrozen === false){
            this.setState({assetIsFrozen: true});
        }
    }

    render(){
        let warning;
        if(this.props.nodeOption === 1){
            warning = <Alert variant="warning">This transaction will be sent to the Algorand TestNet</Alert>
        }
        return(
            <div className="content">
                <h1>Generate ASA</h1>
                {warning}
                <Form>
                    <label>
                        Name: &nbsp; 
                        <input type="text" className="assetName" value={this.state.assetName} onChange={e => this.setState({assetName: e.target.value})} />
                        &nbsp;  
                    </label>
                    <br />
                    <label>
                        Unit Name: &nbsp;
                        <input type="text" className="assetUnitName" value={this.state.assetUnitName} onChange={e => this.setState({assetUnitName: e.target.value})} />
                    </label>
                    <br />
                    <label>
                        Decimals: &nbsp;
                        <input type="text" className="assetDecimals" value={this.state.assetDecimals} onChange={e => this.setState({assetDecimals: e.target.value})} />
                        <b>&nbsp; Required!</b>
                    </label>
                    <br />
                    <label>
                        Total to create: &nbsp;
                        <input type="text" className="assetTotal" value={this.state.assetTotal} onChange={e => this.setState({assetTotal: e.target.value})} />
                        <b>&nbsp; Required!</b>
                    </label>
                    <br />
                    <label>
                        Asset Metadata (unhashed): &nbsp;
                        <input type="text" className="assetMetadata" value={this.state.assetMetadata} onChange={e => this.setState({assetMetadata: e.target.value})} />
                        &nbsp; <b>Must be 32 Characters in Length or Empty!</b> Current length: {this.state.assetMetadata.length}
                    </label>
                    <br />
                    <label>
                        Asset URL: &nbsp;
                        <input type="text" className="assetURL" value={this.state.assetURL} onChange={e => this.setState({assetURL: e.target.value})} />
                    </label>
                    <br />
                    <label>
                        Asset Freeze Address: &nbsp;
                        <input type="text" className="assetURL" value={this.state.assetFreezeAdd} onChange={e => this.setState({assetFreezeAdd: e.target.value})} />
                    </label>
                    <br />
                    <label>
                        Asset Manager Address: &nbsp;
                        <input type="text" className="assetURL" value={this.state.assetManagerAdd} onChange={e => this.setState({assetManagerAdd: e.target.value})} />
                    </label>
                    <br />
                    <label>
                        Asset Reserve Address: &nbsp;
                        <input type="text" className="assetURL" value={this.state.assetReserveAdd} onChange={e => this.setState({assetReserveAdd: e.target.value})} />
                    </label>
                    <br />
                    <label>
                        Asset Clawback Address: &nbsp;
                        <input type="text" className="assetURL" value={this.state.assetClawbackAdd} onChange={e => this.setState({assetClawbackAdd: e.target.value})} />
                    </label>
                    <br />
                    <label>
                        Transaction Notes:
                        <textarea className="txnNotes" value={this.state.notes} onChange={e => this.setState({notes: e.target.value})} />
                    </label>
                    <br />
                    <label>
                        Is frozen by default: &nbsp;
                        <input
                        name="assetIsFrozen"            
                        type="checkbox"
                        checked={this.state.assetIsFrozen}
                        onChange={this.checkBox} />
                    </label>
                </Form>
                <SubmitButton isLogged={this.props.isLogged} submitClick={this.state.submitClick} handleClick={this.mySubmit} />
                {warning}
            </div>
        );
    }
}