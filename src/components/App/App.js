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
          searchResults: []
      }
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);
      this.clearPlaylist = this.clearPlaylist.bind(this);
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
      //console.log(this.state.playlistName);
  }
    
  savePlaylist() {
      let trackURIs = this.state.playlistTracks.map(track => track.uri);
      Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
        this.clearPlaylist();
      });
  }
    
  search(term) {
    Spotify.search(term).then(results => {
      this.setState({searchResults: results});                
    });
  }
    
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} onClear={this.clearPlaylist}/>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
