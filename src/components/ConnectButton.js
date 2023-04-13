import React from "react"
import styled from "styled-components";
import metamaskImage from "./metamask.png"

const ConnectButton = (props) => {
    return (
        <Button {...props}>
            <Icon src={metamaskImage} alt="metamask-icon" />
            Sign In
        </Button>
    )
} 

const Button = styled.button`
    color: white;
    background-color: #4285F4;
    padding: 7px 15px;
    font-size: 20px;
    border-radius: 5px;
    border: none;
    align-items: center;
    display: flex;
    margin: 20px auto 0px auto;
    cursor: pointer;
`

const Icon = styled.img`
    height: 30px;
    width: 30px;
    margin-right: 5px;
`

export default ConnectButton;