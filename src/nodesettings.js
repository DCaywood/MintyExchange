import React from "react";
import Button from 'react-bootstrap/Button';

export default class NodeSettings extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            nodeOption: this.props.nodeOption,
            nodeURL: "",
            nodePort: "",
            nodeToken: "",
            indexerOption: this.props.indexerOption,
            indexerURL: "",
            indexerPort: "",
            indexerToken: ""
        }
    }

    handleNodeClick = async() =>{
        if(this.state.nodeOption === "0"){
            let info = {
                url: "https://algoexplorerapi.io/",
                port: "",
                token: "",
                option: 0
            }
            this.props.updateNode(info);
        }
        if(this.state.nodeOption === "1"){
            let info = {
                url: "https://testnet.algoexplorerapi.io/",
                port: "",
                token: "",
                option: 1
            }
            this.props.updateNode(info);
        }
        if(this.state.nodeOption === "2"){
            let info = {
                url: this.state.nodeURL,
                port: this.state.nodePort,
                token: this.state.nodeToken,
                option: 2
            }
            this.props.updateNode(info);
        }
    }

    handleIndexerClick = async() =>{
        if(this.state.indexerOption === "0"){
            let info = {
                url: "https://algoexplorerapi.io/idx2",
                port: "",
                token: "",
                option: 0
            }
            this.props.updateIndexer(info);
        }
        if(this.state.indexerOption === "1"){
            let info = {
                url: "https://testnet.algoexplorerapi.io/idx2",
                port: "",
                token: "",
                option: 1
            }
            this.props.updateIndexer(info);
        }
        if(this.state.indexerOption === "2"){
            let info = {
                url: this.state.indexerURL,
                port: this.state.indexerPort,
                token: this.state.indexerToken,
                option: 2
            }
            this.props.updateIndexer(info);
        }
    }

    render(){
        return(
            <div className="content">
            <h1>Node and Indexer options</h1>
            <h3>Node Settings</h3>
            <div className="nodeSettings">
                <input type="radio" value={0} name="node" onChange={e => this.setState({nodeOption: e.target.value})} /> AlgoExplorer MainNet <br />
                <input type="radio" value={1} name="node" onChange={e => this.setState({nodeOption: e.target.value})} /> AlgoExplorer TestNet <br />
                <input type="radio" value={2} name="node" onChange={e => this.setState({nodeOption: e.target.value})} /> Custom Settings - URL: <input type="text" className="nodeURL" value={this.state.nodeURL} onChange={e => this.setState({nodeURL: e.target.value})} /> Port: <input type="text" className="nodePort" value={this.state.nodePort} onChange={e => this.setState({nodePort: e.target.value})} /> Token: <input type="text" className="nodeToken" value={this.state.nodeToken} onChange={e => this.setState({nodeToken: e.target.value})} /><br />
                <Button onClick={this.handleNodeClick}>Update Node Settings</Button>
            </div>
            <h3>Indexer Settings</h3>
            <div className="indexerSettings">
                <input type="radio" value="0" name="indexer" onChange={e => this.setState({indexerOption: e.target.value})} /> AlgoExplorer MainNet <br />
                <input type="radio" value="1" name="indexer" onChange={e => this.setState({indexerOption: e.target.value})} /> AlgoExplorer TestNet <br />
                <input type="radio" value="2" name="indexer" onChange={e => this.setState({indexerOption: e.target.value})} /> Custom Settings - URL: <input type="text" className="indexerURL" value={this.state.indexerURL} onChange={e => this.setState({indexerURL: e.target.value})} /> Port: <input type="text" className="indexerPort" value={this.state.indexerPort} onChange={e => this.setState({indexerPort: e.target.value})} /> Token: <input type="text" className="indexerToken" value={this.state.indexerToken} onChange={e => this.setState({indexerToken: e.target.value})} /><br />
                <Button onClick={this.handleIndexerClick}>Update Indexer Settings</Button>
            </div>
            </div>

        )
    }
}