const clientID = 'ba07110e32fc4b65a52b47e6bd4cc473';
const redirectURI = 'http://localhost:3000/';
let accessToken;
//const arrayOfTracks = [];

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const accessTokenExpireMatch = window.location.href.match(/expires_in=([^&]*)/);
      
    if (accessTokenMatch && accessTokenExpireMatch) {
        accessToken = accessTokenMatch[1];
        const tokenExpireTime = accessTokenExpireMatch[1];
        window.setTimeout(() => accessToken = '', tokenExpireTime * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
    } else {
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },
    
  search(searchTerm) {
      let accessToken = this.getAccessToken();
      const apiHeadders = {
                        headers: {Authorization: `Bearer ${accessToken}`}
                        };
            
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, apiHeadders).then(response => {
        if(response.ok){
        return response.json();
        } else {
          throw new Error ('Request Failed!');
        }}, networkError => {
          console.log(networkError.message);
        }).then(jsonResponse => {
        
        if(jsonResponse.hasOwnProperty('tracks')) {
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album,
                uri: track.uri
            }));
        } 
    });
   //return arrayOfTracks;
  }
}

export default Spotify;