import React, { Component } from 'react'
import axios from 'axios';
import { SimpleImg, initSimpleImg } from 'react-simple-img';
import base from "../../config/firebase";
const ALBUMS_API_URL = 'https://itunes.apple.com/in/rss/topalbums/limit=100/json';
let ALBUMS_DATA=null;

export default class AlbumsList extends Component {
  constructor(props){
    super(props);

    this.state = {
      albums : null,
      selectedAlbum : null,
      showPanel : false
    }
  }

 
getAlbums = (api) => {
  return new Promise((resolve, reject) => {
    resolve(axios.get(api));
  })
}

updateAlbumsList = (data) => {
  this.setState({
    albums: data
  });
  ALBUMS_DATA = data;
}

async loadAlbums() {
  try {
    let albums = await this.getAlbums(ALBUMS_API_URL);
    this.updateAlbumsList(albums);
  } catch (error) {
    console.error('Error');
  }
}

async componentDidMount(){
  initSimpleImg();
  this.loadAlbums();
}

saveFavoriteAlbums = (title,image) => {
  base.push('itunes-fav-albums/', {
        data: {
            title: title,
            image: image
        }
    }).then(data => {
        console.log('Added !')
    
    }).catch(err => {
        alert('Error Occured !')
    })
}

  render() {
    console.log(this.props)
    return (
      
      <div className="row" style={{
        paddingLeft:30,
        paddingRight:15
      }}>
      
      {
        ( this.state.albums !== null ) ? 
          this.state.albums.data.feed.entry.map( data => 
           
            (<div className="mb-1 col-sm-6 col-md-3">
                <div>
                <SimpleImg src={ data['im:image'][2].label }  imgClassName="album-card" alt={data['im:name'].label}  />
                </div>
                <p class="text-left title-heading" data-toggle="tooltip" data-placement="top" title="Detailed View" onClick={ () => {this.saveFavoriteAlbums(data.title.label, data['im:image'][2].label )} }>{( data['im:name'].label).substr(0,50) }</p>
              </div>)
              
          )
        : (
          <div className="emptyFav">
            <p className="text-center highlight-text"> Loading... </p>
          </div>
        )
      }

      </div>
    )
  }
}


export function filterData ( text ){
   return new Promise( (resolve, reject) => {
     ALBUMS_DATA.data.feed.entry.map( data =>{
      console.log(data['im:name'].label.indexOf(text) +'' +data['im:name'].label.indexOf(text))
      if(data['im:name'].label.indexOf(text)){
         return resolve(data);
        }
      })
    })
}

