import React from "react";

export default function nftBox(assetID){
    let NFTData = await AlgoIndex.searchForAssets().index(assetID).do();
    console.log(NFTData);
}