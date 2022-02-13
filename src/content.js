import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

export default function Content(){
    return(
        <div className="content">
            <Jumbotron>
                <h1>Welcome To The Minty Exchange</h1>
                <h2>Your source for creating and selling NFTs built on Algorand</h2>
            </Jumbotron>
            <Alert variant="warning"><h3>This site is in beta!</h3><p>NFT Generation works properly and will fail if there are errors with the transaction. <br />The ASA Wallet Viwer and Individual ASA Viewer have their share of quirks. Any feedback for this is greatly appriciated</p></Alert>
            <Card >
                <Card.Header style={{'max-width': '100%', 'background-color': '#52FFB8'}} >Update - 0.4.0 - 5/23/2021</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <ul>
                            <li><b>JSON Type Parsing:</b> will look for a "Type" Field in notes that return a JSON structure. If the type field is set to video, a video will be displayed. Example: <a href="https://minty.exchange/asaviewer/226533284">Look At This Graph</a></li>
                            <li><b>AlgoEYE Support:</b> started added parsing for AlgoEYE assets</li>
                        </ul>
                        <hr />
                        <p>Known Bugs</p>
                        <ul>
                            <li>Wallet Search has some issues and very poor error handling.</li>
                            <li>ASA Parser fun</li>
                        </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            
            <Container className="Main" style={{'max-width': '100%', 'background-color': '#52FFB8'}} fluid="xl">
                <p>Right now, you can Mint ASAs (Algorand Standard Assets) or view a list of assets you own. There are plans to update to add a full Asset Exchange for Algorand Standard Assets but the core functionality of minting ASAs is functioning.</p>
                <h3>Mint ASA</h3>
                <p>Mint your own Algorand Standard Asset. This can be a Fungible Token or Non-Fungible Token. The asset Metadata must be 32 characters in length or else the transaction will fail.</p>
                <h3>My ASAs</h3>
                <p>View your Algorand Standard Assets in your wallet. Will attempt to find an image (.jpg, .jpeg, .png, .gif) in the Asset URL or unhashed Asset Metadata and display it.</p>
                <br/>
                <p>Requires a <a href="https://wallet.myalgo.com/">My Algo Wallet</a> to create ASAs and view account ASAs. Transactions are signed through your MyAlgo Wallet then processed with the public node provided by <a href="http://algoexplorer.io">Algo Explorer</a>. <b>None of your information, accounts, keys or transaction data pass through our server!</b></p>
                <p>Contact me on <a href="https://www.reddit.com/user/MintyExchange">Reddit</a> or <a href="https://twitter.com/mintyexchange">Twitter</a> with any questions, concerns or issues! <br/>
                Feel free to support future development by making an Algorand Donation to this Address: MINTYMQSXLCAZBEMZTU4PEHACARVL5GIXM4K2XEHBIK53ILRHPFKKVL7QA</p>
            </Container>
            <br />
            <h3>Past Updates</h3>
            <Card >
                <Card.Header style={{'max-width': '100%', 'background-color': '#52FFB8'}} >Update - 0.3.1 - 5/19/2021</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <ul>
                            <li>Wallet search loading improved. Loads assets individually over time instead of waiting for all the asset parsing to return</li>
                            <li>Functions in the Wallet Search function, coming to the My ASAs search later after some tweaks</li>
                        </ul>
                        <hr />
                        <p>Known Bugs</p>
                        <ul>
                            <li>Wallet Search has some issues and very poor error handling.</li>
                            <li>ASA Parser fun</li>
                        </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <Card >
                <Card.Header style={{'max-width': '100%', 'background-color': '#52FFB8'}} >Update - 0.3.0 - 5/17/2021</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <ul>
                            <h1>Wallet search and sharing added!</h1>
                            <li>Search any Algorand Wallet for ASA and attempt to display them.</li>
                            <li>Share your wallet easily by adding it to the end of minty.exchange/wallet/ - Example <a href="https://minty.exchange/wallet/MINTYMQSXLCAZBEMZTU4PEHACARVL5GIXM4K2XEHBIK53ILRHPFKKVL7QA">http://minty.exchange/wallet/MINTYMQSXLCAZBEMZTU4PEHACARVL5GIXM4K2XEHBIK53ILRHPFKKVL7QA</a></li>
                            <li><h4>This feature is in beta and is known to have bugs</h4></li>
                            <br/>
                            <h1>Extended ASA Viewer support</h1>
                            <li>Added easier support for sharing assets by adding to the end of minty.exchange/asaviwer/ - Example <a href="https://minty.exchange/asaviewer/219597684">https://minty.exchange/asaviewer/219597684</a></li>
                            <br/>
                            <h1>Algoworld ASA Support</h1>
                            <li>Added support for viewing <a href="https://algoworld-nft.com/">Algoworld NFT's</a> in the individual ASA viewer and Wallet Viewers</li>
                            <li>Support includes the current 1500 <a href="https://minty.exchange/asaviewer/189949327">Standard Algoworld Cards</a> and 6 <a href="https://minty.exchange/asaviewer/220523743">Special Algoworld Cards</a></li>
                        </ul>
                        <hr />
                        <p>Known Bugs</p>
                        <ul>
                            <li>Wallet Search has some issues and very poor error handling.</li>
                            <li>ASA Parser fun</li>
                        </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <Card >
                <Card.Header style={{'max-width': '100%', 'background-color': '#52FFB8'}} >Update - 0.2.0 - 5/16/2021</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <ul>
                            <h1>ASA Wallet Viewer and Individual ASA Viewer updates:</h1>
                            <li><h3 style={{display : 'inline-block'}}><b>Added TinyURL Support</b></h3> - added support for asset URLs containing TinyURL links in the parser</li>
                            <li><h3 style={{display : 'inline-block'}}><b>Added JSON Note Support</b></h3> - the parser now searches the Asset Creation Transaction for a valid JSON Object containing a "url" field then attempts to display the result. Assets created with <a href="https://www.originmint.io/">Origin Mint</a> display properly in both the individual and wallet ASA viewer</li>
                            <li>Added the amount a wallet owns displayed next to the amount in circulation</li>
                            <li>Fixed an issue where assets that wallet owners were Opted-In to but didn't have any in their wallet was displayed.</li>
                            <br/>
                            <h3>Other:</h3>
                            <li>UI Cleanup and Social Links added</li>
                        </ul>
                        <hr />
                        <p>Known Bugs</p>
                        <ul>
                            <li>ASA Parser doesn't find all assets. Fighting the ongoing battle to find where everyone is hiding their metadata</li>
                        </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <Card >
                <Card.Header style={{'max-width': '100%', 'background-color': '#52FFB8'}} >Update - 0.1.1 - 5/15/2021</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <ul>
                            <li>Some more parser updates. Mainly bit.ly related</li>
                        </ul>
                        <hr />
                        <p>Known Bugs</p>
                        <ul>
                            <li>ASA Parser doesn't find all assets. Fighting the ongoing battle to find where everyone is hiding their metadata</li>
                        </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <Card >
                <Card.Header style={{'max-width': '100%', 'background-color': '#52FFB8'}} >Update - 0.1.0 - 5/12/2021</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <ul>
                            <li><h3 style={{display : 'inline-block'}}><b>Added Standalone ASA Viewer</b></h3> - View individual ASAs by Asset ID in a standalone viewer! Search for assets by ID, no login required</li>
                            <li>Fixed some URL Routing Issues - should be able to link to individual pages</li>
                        </ul>
                        <hr />
                        <p>Known Bugs</p>
                        <ul>
                            <li>ASA Parser doesn't find all assets. Fighting the ongoing battle to find where everyone is hiding their metadata</li>
                        </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <Card >
                <Card.Header style={{'max-width': '100%', 'background-color': '#52FFB8'}} >Update - 0.0.2 - 5/6/2021</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <ul>
                            <li>Node Settings Added - Switch between AlgoExplorer's public node, AlgoExplorer's public TestNet node or provide your own settings including localhost</li>
                            <li>Bit.ly URL Support for ASA Viewer - Asset URLs that are set to a Bit.ly link are parsed for an image and displayed in the wallet</li>
                        </ul>
                        <hr />
                        <p>Known Bugs</p>
                        <ul>
                            <li>CSS Issues with images that are wider than taller</li>
                        </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <Card >
                <Card.Header style={{'max-width': '100%', 'background-color': '#52FFB8'}} >Update - 0.0.1a - 5/6/2021</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <ul>
                            <li>Added field for transaction notes while Minting ASAs</li>
                        </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            
        </div>
    );
}