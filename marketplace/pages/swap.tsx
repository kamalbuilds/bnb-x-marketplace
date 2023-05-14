import { useEffect, useState } from 'react';
import { FormControl, FormLabel, Input, Button, Typography } from '@mui/material';
import { FusionSDK, NetworkEnum, getOrderHash} from '@1inch/fusion-sdk';
import Web3 from 'web3';

const makerPrivateKey = '0x123....'
const makerAddress = '0x123....'

const nodeUrl = '....'

// const blockchainProvider = new PrivateKeyProviderConnector(
//     makerPrivateKey,
//     new Web3(nodeUrl)
// )

const sdk = new FusionSDK({
    url: 'https://fusion.1inch.io',
    network: NetworkEnum.ETHEREUM
})

async function getOrder(){
    const orders = await sdk.getActiveOrders({page: 1, limit: 2});
}
getOrder();

export default function Home() {
  const [fromTokenAddress, setFromTokenAddress] = useState('')
  const [toTokenAddress, setToTokenAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [result, setResult] = useState('')

  useEffect(() => {
    if (fromTokenAddress && toTokenAddress && amount && walletAddress) {
      sdk.placeOrder({
        fromTokenAddress,
        toTokenAddress,
        amount,
        walletAddress
      }).then(res => setResult(JSON.stringify(res)))
    }
  }, [fromTokenAddress, toTokenAddress, amount, walletAddress])

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="flex flex-col items-center gap-y-[24px] grow font-normal">
        <form onSubmit={handleSubmit}>
        <FormControl fullWidth required>
            <FormLabel>From Token Address</FormLabel>
            <Input type="text" value={fromTokenAddress} onChange={event => setFromTokenAddress(event.target.value)} className='text-black' />
        </FormControl>

        <FormControl fullWidth required>
            <FormLabel>To Token Address</FormLabel>
            <Input type="text" value={toTokenAddress} onChange={event => setToTokenAddress(event.target.value)}  className='text-black'/>
        </FormControl>

        <FormControl fullWidth required>
            <FormLabel>Amount</FormLabel>
            <Input type="text" value={amount} onChange={event => setAmount(event.target.value)} className='text-black' />
        </FormControl>

        <FormControl fullWidth required>
            <FormLabel>Wallet Address</FormLabel>
            <Input type="text" value={walletAddress} onChange={event => setWalletAddress(event.target.value)} className='text-black' />
        </FormControl>

        <Button onClick={getOrder} variant="contained" color="primary">GetActiveOrders</Button>

        <Button type="submit" variant="contained" color="primary">Submit</Button>

        {result && (
            <Typography variant="body1" mt={4}>Result: {result}</Typography>
        )}
        </form>
    </div>
  )
}
