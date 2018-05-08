import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    this.toggleChange = this.toggleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
    
  
  handleNameChange(event) {
    this.props.onNameChange(event.target.value)
  }
  
  toggleChange() {
      //console.log(this.props.checked);
    this.props.onCheckChange();
  }
    
  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  
    render() {
        return(
          <div className="Playlist">
            <input placeholder="Enter Playlist Name" defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
                <TrackList playlistName={this.props.playlistName} tracks={this.props.playlistTracks} isRemoval={true} onAdd={this.props.onAdd} onRemove={this.props.onRemove} playButton={false} onMoveTrack={this.props.onMoveTrack} trackTarget='SearchResults' />
            <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
                <a className="Playlist-save" onClick={this.handleClick}>{this.state.isToggleOn ? 'PUBLIC' : 'PRIVATE'}</a>
                <a className="Playlist-save" onClick={this.props.onClear}>CLEAR PLAYLIST</a>
            <label className="Playlist"><input type="checkbox" id="privatePlaylist" name="playlistcheck" onChange={this.toggleChange} checked={this.props.checked}/>Make Playlist Private</label>
            </div>
        );
    }
}

export default Playlist;