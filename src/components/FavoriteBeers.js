import React from 'react';
import BeerCard from'./BeerCard.js';
import{FormWrapper} from './BrowseBeers'
import { Form, Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { DeleteFavs } from '../actions/BeerCardActions';

export const GridWrapper = styled.div`
    display: grid;
    grid-gap: 50px;
    margin-top: 4em;
    margin-left: 2em;
    margin-right: 6em;
    grid-template-areas: 
    "a b c d";
`;

  export const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
  export function RemoveModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {setOpen(true);};

    const handleYes = () => {
        props.DeleteFavs()
      setOpen(false);
    };

    const handleNo = () => { setOpen(false);};
  
    return (
      <div >
        <FormWrapper>
            <Form inline>
                <Button onClick={handleOpen} variant="outline-info" type="button">Remove All</Button>
            </Form>
        </FormWrapper>
        <Modal
          className={classes.modal}
          open={open}
          closeAfterTransition
          onClose={handleNo}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper} >
            <FormWrapper>
                <Form inline>
                    <Form.Text variant="outline-info" style={{'marginRight': '20px', 'fontSize': '2.2em', color: '#63C5Da'}}>Are You Sure?</Form.Text>
                    <Button onClick={handleYes} style={{'marginRight': '20px', 'fontSize': '1.6em', color: '#63C5Da',variant :'outline-info'}} variant="outline-info" type="button" >Yes</Button>
                    <Button onClick={handleNo} style={{'marginRight': '20px', 'fontSize': '1.6em', color: '#63C5Da',variant :'outline-info'}} variant="outline-info"  type="button" >No</Button>
                </Form>
            </FormWrapper>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }


class FavoriteBeers extends React.Component{


    LoadPage(){

        if(this.props.favs.length === 0 || this.props.favs === undefined )
            return <div></div>;

        
        var amountOfBeers = this.props.favs.length;

        var returnvalue1 = [];
        var returnvalue2 = [];
        var i = 0

        if(amountOfBeers > 4){
            for(; i <  Math.floor(amountOfBeers/4)*4 ; i+=4){
                returnvalue1.push (<GridWrapper>
                <BeerCard isfavr = {true} page={this.props.page} like ={false} index={i} beer = {this.props.favs[i]}></BeerCard>
                <BeerCard isfavr = {true} page={this.props.page} like ={false} index={i+1} beer = {this.props.favs[i+1]}></BeerCard>
                <BeerCard isfavr = {true} page={this.props.page} like ={false} index={i+2} beer = {this.props.favs[i+2]}></BeerCard>
                <BeerCard isfavr = {true} page={this.props.page} like ={false} index={i+3} beer = {this.props.favs[i+3]}></BeerCard>
            </GridWrapper>)
            }
        }
        for(i; i <  amountOfBeers ; i++){
            returnvalue2.push(
                <BeerCard isfavr = {true} page={this.props.page} like = {false} index={i} beer = {this.props.favs[i]}></BeerCard>
            )
        }
        return (<div>
                    {returnvalue1} 
                    <GridWrapper>
                        {returnvalue2}
                    </GridWrapper> 
                </div>)

    }
    render() {

        return ( 
            <div>
                <RemoveModal DeleteFavs={this.props.DeleteFavs} handler={this.LoadPage}/>
                {this.LoadPage()}
            </div>
          )
    
        }
    }

    const mapStateToProps = state =>({
        stars: state.beerCards.stars,
        likes: state.beerCards.likes,
        favs: state.beerCards.favs,
        page: state.beerCards.page,
        search: state.beerCards.search,
        IsSearch: state.beerCards.IsSearch,
        beers: state.beerCards.beers,
    })

export default connect(mapStateToProps, { DeleteFavs })(FavoriteBeers);
