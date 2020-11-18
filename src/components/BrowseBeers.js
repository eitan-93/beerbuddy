import React from 'react';
import styled from 'styled-components';
import BeerCard from'./BeerCard.js';
import { Form, Button, } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { connect } from 'react-redux';
import { LoadPage, onChange } from '../actions/BeerCardActions';

export const FormWrapper = styled.div`
    display: grid;
    grid-gap: 50px;
    margin-top: 1em;
    margin-left: 2em;
    margin-right: 6em;
    color: #63C5Da;
`;

export const GridWrapper = styled.div`
    display: grid;
    grid-gap: 50px;
    margin-top: 4em;
    margin-left: 2em;
    margin-right: 6em;
    grid-template-areas: 
    "a b c d"
    "e f g h"
    "j j k l";
`;

class BrowseBeers extends React.Component{

    Paging(props){

        const classes = makeStyles((theme) => ({
            root: {
              '& > * + *': {
                marginTop: theme.spacing(2),
              },
            },
          }));

        const handleChange = (event, value) => {
            
            props.handler(value,this.props.search);
        };
        return(
        <FormWrapper>
            <div className={classes.root}>
                <Pagination variant="outlined" color="primary" count={props.pages} page={this.props.page} onChange={handleChange} />
            </div>
        </FormWrapper>

        )
    }
    search = (e) => {
        e.preventDefault(); 
        this.props.LoadPage(1,this.props.search)
    }

      render() {
        if(this.props.page == null) {
            this.props.LoadPage(1,"");
        }
        
        return(
        <div>
       
            <FormWrapper>
                <Form inline>
                    <Form.Text id="SearchInput" value = {this.props.search}  variant="outline-info" style={{ 'marginTop': '0','marginLeft': '0px','marginRight': '80px', 'fontSize': '1.6em', color: '#63C5Da'}}>Food Pairing</Form.Text>
                    <Form.Control onChange={this.props.onChange} type="text" placeholder="Search" className=" mr-sm-2" />
                    <Button onClick={this.search} variant="outline-info" type="button" >Pair!</Button>
                </Form>
            </FormWrapper>
            {this.Paging({pages:28, handler:this.props.LoadPage})}
            <GridWrapper>   
        {(this.props.beers!= null)  ? this.props.beers.map((beer,index) => {
                         return <BeerCard isfavr= {false} page={this.props.page} like ={this.props.likes[index]} /*star={this.props.stars[index]}*/ index={index} beer = {this.props.beers[index]}></BeerCard>
             
}): <div></div>}

            </GridWrapper>
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
    
    export default connect(mapStateToProps, { LoadPage,onChange })(BrowseBeers);