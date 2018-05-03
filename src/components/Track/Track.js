import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);

        this.renderAction = this.renderAction.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.displayPlayButton = this.displayPlayButton.bind(this);
    }
    
    renderAction() {
        if (this.props.isRemoval) {
            return <a className="Track-action" onClick={this.removeTrack}>-</a>;
        } else {
            return <a className="Track-action" onClick={this.addTrack}>+</a>;
        }
    }
    
    addTrack() {
        this.props.onAdd(this.props.track);
        console.log(this.props.isRemoval);
        
    }
    
    removeTrack() {
        this.props.onRemove(this.props.track);
        console.log(this.props.isRemoval);
    }
    
    displayPlayButton() {
        let uri = `https://open.spotify.com/embed?uri=${this.props.track.uri}`
        if (this.props.playButton) {
            return (
                <div className="Track-information">
                <div>
                  <iframe src={uri} className="Track" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                </div>
                </div>
            );
            
        } else {
            return (
                <div className="Track-information">
                  <h3>{this.props.track.name}</h3>
                  <p>{this.props.track.artist} | {this.props.track.album.name}</p>
                </div>
            );
        }
    }
    
    render() {
        return(
          <div className="Track">
            
              {this.displayPlayButton()}
            
            {this.renderAction()}
          </div>
        );
    }
}

export default Track;
