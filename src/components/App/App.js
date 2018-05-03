import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';


class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          playlistName: 'New Playlist',
          playlistTracks: [],
          searchResults: [

      { name:'Tiny Dancer',

        artist:'Elton John',

        album:'Madam Across The Water',

        id: 1,
        uri: 'spotify:track:4bJpdznQXEeRE1xrn69nMU'
      }],
          privatePlaylist: false
      };
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);
      this.clearPlaylist = this.clearPlaylist.bind(this);
      this.privatePlaylist = this.privatePlaylist.bind(this);
  }
    
  componentDidUpdate() {
      //console.log(this.state);
  }
    
  addTrack(track) {
      //console.log('Add Track');
      if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
          alert('This track is already on the Playlist!')
          return;
      }
      let newTracks = this.state.playlistTracks;
      newTracks.push(track);
      this.setState({playlistTracks: newTracks});
  }
  
  removeTrack(track) {
      //console.log('Remove Track');
      let newTracks = this.state.playlistTracks;
      newTracks = newTracks.filter(savedTrack => savedTrack.id !== track.id)
      this.setState({playlistTracks: newTracks});
  }

  updatePlaylistName(name) {
      this.setState({playlistName: name});
      console.log(this.state.playlistName);
  }
    
  clearPlaylist() {
      this.setState({
          playlistTracks: [],
          playlistName: ''
      })
  }
    
  savePlaylist() {
      let trackURIs = this.state.playlistTracks.map(track => track.uri);
      Spotify.savePlaylist(this.state.playlistName, trackURIs, this.state.privatePlaylist).then(() => {
        this.clearPlaylist();
      });
  }
    
  search(term) {
    Spotify.search(term).then(results => {
      this.setState({searchResults: results});                
    });
  }
  
  privatePlaylist() {
      this.state.privatePlaylist ? this.setState({privatePlaylist: false}) : this.setState({privatePlaylist: true})
  }
    
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} onClear={this.clearPlaylist} checked={this.state.privatePlaylist} onCheckChange={this.privatePlaylist}/>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
