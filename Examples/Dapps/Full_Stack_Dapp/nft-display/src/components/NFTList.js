import { Component } from "react";
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import NFTCard from "./nft-card";

export default class NFTList extends Component{
    constructor(props){
        super(props)
        this.props = props;
    }

    componentDidMount () {
        this.props.fetchNFT();
    }

    render() {
        return (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 6, lg: 6 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12}}>
              {Array.from(Array(this.props.nftImages.length)).map((_, index) => (
                <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                  <NFTCard image_url={this.props.nftImages[index]}/>
                </Grid>
              ))}
            </Grid>
          </Box>
        )
    }
}