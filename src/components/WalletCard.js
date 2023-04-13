import React, { useEffect, useState, useCallback } from "react"
import { ethers } from "ethers";
import styled from "styled-components";
import ConnectButton from "./ConnectButton";

const WalletCard = () => {
    const [account, setAccount] = useState("")
    const [balance, setBalance] = useState("")
    const [error, setError] = useState("")

    const chainChangedHandler = useCallback(() => {
        window.location.reload()
    }, [])

    const connectWalletHandler = useCallback(async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
                setAccount(accounts[0])
                const balance = await window.ethereum.request({ method: "eth_getBalance", params: [accounts[0], "latest"] })
                setBalance(ethers.utils.formatEther(balance.toString()));
            } catch (err) {
                setError("Could not connect to the wallet")
            }
            
        } else {
            setError("You need to install metamask")
        }
    }, [])

    useEffect(() => {
        window.ethereum?.on("accountsChanged", connectWalletHandler)
        window.ethereum?.on('chainChanged', chainChangedHandler);

        return () => {
            window.ethereum?.removeListener("accountsChanged", connectWalletHandler)
            window.ethereum?.removeListener("chainChanged", connectWalletHandler)
        };
    }, [connectWalletHandler, chainChangedHandler])

    return (
        <Card>
            {account && balance ? (
                <>
                    <Title>👋 Hi there!</Title>
                    <Account>{account}</Account>
                    <SubTitle>Your balance is</SubTitle>
                    <Balance>{balance} ETH</Balance>
                </>
            ) : (
                <>
                    <Title>Sign in with your Metamask wallet 👇</Title>
                    <ConnectButton onClick={connectWalletHandler} />
                    {error && <Title>{error}</Title>}
                </>
            )}
        </Card>
    )
} 

const Card = styled.div`
    padding: 20px;
    text-align: center;
    background-color: #DDD;
    border-radius: 10px;
    height: 250px;
    max-width: 600px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -70%);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

const Account = styled.div`
    color: #4285F4;
    font-size: 18px;
    padding: 5px 0;
    @media (max-width: 400px) {
        font-size: 14px;
    }
    
`
const Title = styled.div`
  font-size: 25px;
  font-weigth: 400;
  padding-top: 20px;
`

const SubTitle = styled.div`
  font-size: 20px;
  font-weigth: 400;
  padding: 7px 0;
`

const Balance = styled.div`
    color: #0F9D58;
    font-size: 18px;
    font-weight: 600;
    @media (max-width: 400px) {
        font-size: 14px;
    }
`

export default WalletCard;