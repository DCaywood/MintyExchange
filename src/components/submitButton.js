import React from "react";
import Button from 'react-bootstrap/Button';

export default function SubmitButton({isLogged, submitClick, handleClick}){
        if(!isLogged){
           return(<p>Connect a MyAlgo Wallet to generate your ASA</p>)
        }
        if(submitClick === true){
            return(<p>Processing</p>)
        } else {
            return(<Button onClick={handleClick}>Submit</Button>)
        }
        
}