import React from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import fullstar from'./fullstar.png'
import emptystar from'./emptystar.png'
import Modal from '@material-ui/core/Modal';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import {Card } from 'react-bootstrap';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { handleStar } from '../actions/BeerCardActions';


const CardWrapper = styled.div`
    margin-top: 1em;
    margin-left: 0em;
    margin-right: 0em;
`;

const StyledPhoto = styled.div`.card-img-top {
    margin-top: 1em;
    display: block;
    margin-left: 2em;
    margin-right: 8em;
    width: 25%;
}`;

const CardText = styled.div`.card-text {

    text-overflow: ellipsis;
    overflow: hidden; 
    max-width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
  }`;

const NameText = styled.div`.card-title {

    text-overflow: ellipsis;
    overflow: hidden; 
    max-width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    -webkit-box-orient: vertical;
  }`;

const HoverText = styled.p`
  color: #000;
  :hover {
      color: #63C5Da;
      cursor: pointer;
  }`;

const StyledStar = styled.div`.card-img-overlay {
    position: absolute;
    margin-top: em !important;
    margin-left: 68% !important;
    margin-right: 0% !important;
    padding: 0;
    width: 50%;
}`;

const ModalStyledPhoto = styled.div`.card-img-top {
    margin-top: 1em;
    display: block;
    margin-left: 2em;
    margin-right: 8em;
    width: 25%;
}`;

const ModalStyledStar = styled.div`.card-img-overlay {
    position: absolute;
    margin-top: 1em !important;
    margin-left: 96% !important;
    margin-right: 0% !important;
    padding: 0;
    width: 50%;
}`;

const ModalNameText = styled.div`.card-title {

    text-overflow: ellipsis;
    overflow: hidden; 
    max-width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
  }`;
const ModalCardText = styled.div`.card-text {

    text-overflow: ellipsis;
    overflow: hidden; 
    max-width: 100%;
    font-size: font-size:calc(100% + 2vw);
    display: -webkit-box;
    -webkit-line-clamp: 10; /* number of lines to show */
    -webkit-box-orient: vertical;
  }`;


  const labels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
  };
  
  function HoverRating(props) {
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const classes = makeStyles({
      root: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
      },
    });
  
    return (
      <div className={classes.root}>
        <Rating
          name={props.name}
          value={value}
          precision={1}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
      </div>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
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
  
  function BeerCardModal(props) {
    const classes = useStyles();
  
    return (
      <div >
       
        <Modal
          className={classes.modal}
          open={props.open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={props.open}>
            <div className={classes.paper} >
              {props.info}
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }

class BeerCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          star: this.props.like ? emptystar : fullstar,
          like : this.props.like , 
          beer : null,

          ModalOpen: false
        };
      }
    handleOpen = () => {
        this.setState({
            ModalOpen: !this.state.ModalOpen
          });
    };
    handleStarLocal = () => {
        this.setState({star : this.props.isfavr ? fullstar : this.state.like ? fullstar : emptystar,like:!this.state.like});
        this.handleStar();
    }

    handleStar = () => {        
        var likes = []
        if(this.props.likes[this.props.beer.id-1] === false){
            var i
            for(i = 0 ; i< this.props.favs.length; i++){
                if(this.props.favs[i].id === this.props.beer.id){
                    
                    this.props.favs.splice(i,1);
                    break;
                }
                
            }
        }
        else{
            this.props.favs.push(this.props.beer);
        }

        
        this.props.likes.map(x => likes.push(x));
        likes[this.props.beer.id-1] = this.props.isfavr ? true : !this.state.like;
        this.props.handleStar(this.props.favs, likes)
    }

    checkIfFavorite(){

    }

    componentDidUpdate(prevProps){
        if(prevProps.page !== this.props.page){
            for(var i = 0 ; i< this.props.favs.length; i++){
                if(this.props.favs[i].id === this.props.beer.id) {
                    this.setState({like: false, star :fullstar }) 
                    return

                }
            
            }
        this.setState({like: true, star : emptystar })
        }
    }

    render() {

        var beerArray = this.props.beers
        if(this.props.isfavr){
            beerArray = this.props.favs
        }
        var obj = beerArray[this.props.index].image_url;
        var info = (
        <Card border="info" style={{ 'borderRadius': '8px', width: '80rem', height: '45rem'}}>
            
            <ModalStyledPhoto><Card.Img style={{height: '12rem', width : '3.3rem'}} variant="top" src={obj}/></ModalStyledPhoto>
            <ModalStyledStar>
                    <Card.ImgOverlay>
                        <HoverText onClick={this.handleStarLocal}>
                            <Card.Img className="buttonW" style={{height: '30px', width : '30px'}}  variant="top" src={this.state.star}/>
                        </HoverText>
                    </Card.ImgOverlay>
                    
                    </ModalStyledStar>
            <CardWrapper>
                    <Card.Body>
                            <ModalNameText><Card.Title >{beerArray[this.props.index].name}</Card.Title></ModalNameText>
                            <ModalCardText><Card.Text>{beerArray[this.props.index].description}</Card.Text></ModalCardText>
                            <br/>
                            <ModalNameText><Card.Title >Food Pairing</Card.Title></ModalNameText>
                            <ModalCardText><Card.Text>{(beerArray[this.props.index].food_pairing.reduce((list, dish) => list+ " ," + dish) + "." )}</Card.Text></ModalCardText>
                            <br/>
                            <ModalNameText><Card.Title >Yeast</Card.Title></ModalNameText>
                            <ModalCardText><Card.Text>{beerArray[this.props.index].ingredients.yeast}</Card.Text></ModalCardText>
                            <br/>
                            <ModalNameText><Card.Title >Brewer's Tips</Card.Title></ModalNameText>
                            <ModalCardText><Card.Text>{beerArray[this.props.index].brewers_tips}</Card.Text></ModalCardText>


                    </Card.Body>
            </CardWrapper>
        </Card>
        )
        
        return( <div>
            
            <Card border="info" style={{ 'borderRadius': '8px', width: '14rem', height: '25rem'}}>
                <StyledPhoto>
                    <Card.Img variant="top" style={this.props.isfavr ?{width :'17%'} :{}} src={obj}/>
                    <StyledStar>
                        <Card.ImgOverlay>
                            <HoverText onClick={this.handleStarLocal}>
                                <Card.Img className="buttonW" style={{height: '30px', width : '30px'}}  variant="top" src={this.state.star}/>
                            </HoverText>
                        </Card.ImgOverlay>
                    </StyledStar>
                </StyledPhoto>
                <CardWrapper>
                {this.props.isfavr ? <div><HoverRating style ={{'marginLeft':'8em'}} size="small"/><br></br></div> : <div></div>}
                <HoverText>
                        <Card.Body onClick={this.handleOpen}>
                        <BeerCardModal open = {this.state.ModalOpen} info={info} pages={28} handler={this.LoadPage}></BeerCardModal>  
                                <NameText><Card.Title >{beerArray[this.props.index].name}</Card.Title> </NameText>
                                <CardText><Card.Text>{beerArray[this.props.index].description}</Card.Text></CardText>
                        

                        </Card.Body>
                        </HoverText>
                </CardWrapper>
            </Card>
            </div>
    )}}

function mapStateToProps(state){
    return ({
        stars: state.beerCards.stars,
        likes: state.beerCards.likes,
        favs : state.beerCards.favs,
        beers : state.beerCards.beers,
    
    }/*,{}*/)
}

export default connect(mapStateToProps, { handleStar })(BeerCard);
