import React, { Component } from 'react'
import AlbumsList from "./AlbumsList";
import base from "../../config/firebase";
import { filterData } from './AlbumsList';
import { SimpleImg, initSimpleImg } from 'react-simple-img';
import '../../App.css';

export default class AlbumsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults : [],
      favAlbums : [],
    }
  }

  fetchFilteredData = (e) => {
    filterData(e.value).then( data => this.setState({ searchResults : this.state.searchResults.concat(data)}));
  }

  componentDidMount = () => {
    initSimpleImg();

    base.syncState(`itunes-fav-albums`, {
      context: this,
      state: 'favAlbums',
      asArray: true
    });
  }

  removeFavorite = (key) => {
    base.remove('itunes-fav-albums/'+key);
  }
  
  render() {
    return (
      <React.Fragment>

        <div className="App row" style={{ maxWidth:'100vW', overflow:'hidden'}}>
        <div className="col-xs-12 col-sm-12 col-md-9">
        
          <div className="search-header">
          <div class="search-container">
              <input type="text" placeholder="Search Albums" name="search" className="search-box" onChange={ e => this.fetchFilteredData(e.target)}  disabled/>
            <button className="btn btn-md-block btn-danger disabled">Show/Hide Favorites</button>
          </div>

        </div>
        
          {
            (this.state.searchResults.length > 0 ) ? (
              this.state.searchResults.data.feed.entry.map( data => (
               
                <div className="mb-1 col-xs-12 col-sm-12 col-md-3">
                    <div>
                    <SimpleImg src={ data['im:image'][2].label }  imgClassName="album-card" alt={data['im:name'].label}  />
                    </div>
                    <p class="text-left title-heading" data-toggle="tooltip" data-placement="top" title="Detailed View" onClick={ () => {this.saveFavoriteAlbums(data.title.label, data['im:image'][2].label )} }>{( data['im:name'].label).substr(0,50) }</p>
                  </div>
                      
              ))
            ) : <AlbumsList /> 
          }

        </div>
        <div className="col-xs-12 col-sm-12 col-md-3">
       
        <div className="row">< h4 className="text-left fav-heading"> Your Favorite Albums </h4> 
        
        {/* Iteration of Favorite Albums  */}

        {
            ( this.state.favAlbums.length ) ? 
              
              this.state.favAlbums.map( data => 
              
                (
                  <div className="mb-1 col-sm-12 col-md-6" onClick={ () => this.removeFavorite(data.key)}>
                    <div>
                      <SimpleImg src={data.image}  imgClassName="fav-album-card" />
                    </div>
                    <p class="text-left title-heading" data-toggle="tooltip" data-placement="top" title="Remove Favorite">{data.title}</p>                
                
                </div>)
                  
              )
           
            : <div className="emptyFav">
                <img src='https://png.icons8.com/clouds/1600/sad.png'  className="empty-fav-image" />
                <p className="text-center highlight-text"> No Favorites :( </p>
              </div>
            
      }


        </div>
        </div>
        </div>
      </React.Fragment>
    )
  }
}
