//libraries
import { Component, useState } from 'react';
import { ethers } from 'ethers';

//contracts
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import Newsletter from './artifacts/contracts/Newsletter.sol/Newsletter.json';

//components
import NFTCard from './components/nft-card';
import ButtonAppBar from './components/header';

//materialui
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';

//styling
import './App.css';


const newsletterAddress = "0x84540F4d93188d78C5bBc03c17aB9C05692A40e7";



function App() {

  const [contract, setContract] = useState();
  const [totalCard, setTotalCard] = useState(0);
  const [nftImages, setNftImages] = useState([]);

  class nftdata extends Component {
    componentDidMount () {
      fetchNFT();
    }
  }

  async function subscribe () {
    if (typeof window.ethereum !== 'undefined'){
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(newsletterAddress, Newsletter.abi, signer)
      const transaction = await contract.subscribe()
      await transaction.wait()
    }
  }
  async function requestAccount () {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function fetchNFT() {
    const options = {method: 'GET'};

    const response = await fetch('https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&asset_contract_address=0x84540F4d93188d78C5bBc03c17aB9C05692A40e7&owner=0x14C365D7E8393b7A18fE4A8459e65cb8CF1bCa23', options)
    const contract_data = await response.json();
    setContract(contract_data);
    console.log(contract_data)
    console.log(contract_data['assets'].length)
    setTotalCard(contract_data['assets'].length)

    //fetch images
    const images = [];
    for(var i = 0; i < contract_data['assets'].length; i++){
      images[i] = contract_data['assets'][i]['image_original_url']
    }
    console.log(images)
    setNftImages(images)
  }

  async function fetchNewsletterName() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(newsletterAddress, Newsletter.abi, provider)
      try {
        const data = await contract.name()
        console.log('Contract Name: ', data)
      } catch (err) {
        console.log('Error: ', err)
      }
    }
  }

  async function fetchURI() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(newsletterAddress, Newsletter.abi, provider)
      try {
        const data = await contract.tokenURI("1")
        console.log('Contract Name: ', data)
      } catch (err) {
        console.log('Error: ', err)
      }
    }
  }

  async function sendNewsLetter() {
    if (typeof window.ethereum !== 'undefined'){
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(newsletterAddress, Newsletter.abi, signer)
      const transaction = await contract.sendNewsletter("1")
      await transaction.wait()
    }
  }


  return (
      <div className="App" >
        <ButtonAppBar subscribe={subscribe} sendNewsLetter={sendNewsLetter} showNewsletter={fetchNFT}></ButtonAppBar>
        <header className="App-header" >
          <Typography>Welcome to Sonarch News!</Typography>
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 6}} columns={{ xs: 4, sm: 8, md: 12 }}>
              {Array.from(Array(totalCard)).map((_, index) => (
                <Grid item xs={4} sm={4} md={6} key={index}>
                  <NFTCard image_url={nftImages[index]}/>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
        </header>
      </div>
  );
}

export default App;
