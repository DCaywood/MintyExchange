import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {
    Link
  } from "react-router-dom";

export default class Header extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
        console.log(this.isChrome);
    }

    algosignerattempt = async() =>{
        console.log('hi');
        await AlgoSigner.connect();
        let accts = await AlgoSigner.accounts({ ledger: 'MainNet'});
        console.log(accts);
    }

    render(){
        let login;
        if(typeof AlgoSigner !== 'undefined'){
            console.log(typeof AlgoSigner);
            console.log('Algosigner is here');
            login = [<Button onClick={() => this.props.handleClick()} style={{'margin-right': '5px'}}>Login to a MyAlgo wallet</Button>, <Button onClick={() => this.props.handleAlgoSign()} >Login Via AlgoSigner</Button>];
        } else {
            login = <Button onClick={() => this.props.handleClick()} >Login Via MyAlgo wallet</Button>
        }
    if(!this.props.login){
        return(
            <>
                <Navbar className="headerNav" fluid>
                    <img src="/favicon-32x32.png" alt="Minty Exchange Logo"/>
                    <Link to="/"><Navbar.Brand>Minty Exchange</Navbar.Brand></Link>
                    <Nav className="headerButtons">
                        <Link to="/mint" className="nav-link mintASA">Mint ASA</Link>
                        <Link to="/mynfts" className="nav-link myNFTButton">My ASAs</Link>
                        <Link to="/asaviewer" className="nav-link ASAViewerButton">ASA Viewer</Link>
                        <Link to="/wallet" className="nav-link ASAViewerButton">Search Wallet ASAs</Link>
                        <Link to="/settings" className="nav-link nodeSettingsButton">Node Settings</Link>
                    </Nav>
                    <Nav className="ml-auto">
                        {login}
                    </Nav>
                </Navbar>
            </>
    )} else {
        const selectOpts = this.props.accounts.map((acct, i) => 
            <option value={acct}>{acct}</option>
        );
        return(
            <>
            <Navbar className="headerNav">
                <img src="/favicon-32x32.png" alt="Minty Exchange Logo"/>
                <Link to="/"><Navbar.Brand>Minty Exchange</Navbar.Brand></Link>
                <Nav className="headerButtons">
                    <Link to="/mint" className="nav-link mintASA">Mint ASA</Link>
                    <Link to="/mynfts" className="nav-link myNFTButton">My ASAs</Link>
                    <Link to="/asaviewer" className="nav-link ASAViewerButton">ASA Viewer</Link>
                    <Link to="/wallet" className="nav-link ASAViewerButton">Search Wallet ASAs</Link>
                    <Link to="/settings" className="nav-link nodeSettingsButton">Node Settings</Link>
                </Nav>
                <Nav className="ml-auto">
                    <p>Welcome 
                        <select value={this.props.selAccount} onChange={e => this.props.handleChange(e.target.value)}>
                            {selectOpts}
                        </select>
                    </p>
                </Nav>
            </Navbar>
            </>
        )
        }
    }
_
}