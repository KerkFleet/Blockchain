//libraries&API's
import { Component, useState } from 'react';
import { ethers } from 'ethers';
import { NFTStorage, File } from 'nft.storage'

//contracts
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import Newsletter from './artifacts/contracts/Newsletter.sol/Newsletter.json';

//components
import NFTCard from './components/NFTCard';
import ButtonAppBar from './components/ButtonAppBar';

//materialui
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';

//styling
import './App.css';


const newsletterAddress = "0x84540F4d93188d78C5bBc03c17aB9C05692A40e7";
const data = { 'collections' : []};
const nftObjects = [];
const client = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA5Q0ZkNjBENzY2NmIzN0QyMzBmRUVDQ0Y3NjMxRjhFQ2Y1NmVEMzEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MDg2NjExMDUzNiwibmFtZSI6IlRlc3RLZXlzIn0.B4EwAuUengT8H4X6SU6QOwIVpDFyaGAxc0dSC3bdOtg' })
var COLLECTIONS_CID = "";



function App() {

  const [totalCard, setTotalCard] = useState(0);
  const [collectionImages, setCollectionImages] = useState([]);
  const [collectionTitles, setCollectionTitles] = useState([]);
  const [collection, setCollection] = useState("");
  const [emptyCollections, setEmptyCollections] = useState(true);

  const props = {
    removeCollection,
    addCollection,
    updateCollections,
    collection,
    setCollection,
    showCollections
  }

  async function requestAccount () {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function updateCollections() {
  }

  async function removeCollection(index) {
    data['collections'].splice(index, 1);
  }
    
  async function addCollection() {
    var i = data['collections'].length;
    data['collections'][i] = collection;
    console.log(data);
  }

  async function showCollections() {
    const images = [];
    const titles = [];
    for(var i = 0; i < data['collections'].length; i++){
      const options = {method: 'GET'};
      const response = await fetch(`https://api.opensea.io/api/v1/collection/${data['collections'][i]}`, options)
      const contract_data = await response.json();
      console.log(contract_data);
      images[i] = contract_data['collection']['banner_image_url'];
      titles[i] = contract_data['collection']['name'];
      nftObjects[i] = contract_data;
    }
    console.log(images);
    console.log(titles);
    setTotalCard(data['collections'].length);
    setCollectionImages(images);
    setCollectionTitles(titles);
    return;
  }


  return (
      <div className="App" >
        <ButtonAppBar data={data} {...props}/>
        <header className="App-header" >
        <div >
          <Box sx={{ flexGrow: 1 }} style={{display:'flex', justifyContent:'center'}}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {Array.from(Array(totalCard)).map((_, index) => (
                <Grid item xs={6} key={index}>
                  <NFTCard nftData={nftObjects[index]} image_url={collectionImages[index]} title={collectionTitles[index]} index={index}/>
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
