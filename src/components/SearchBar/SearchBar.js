import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {term: ''};
        this.handleTermChange = this.handleTermChange.bind(this);
        this.search = this.search.bind(this);
        
    }
    
    search() {
        this.props.onSearch(this.state.search);
    }
    
    handleTermChange(event) {
        this.setState({search: event.target.value});
    }
    
    render() {
        return(
            <div className="SearchBar">
             <input type="search" onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
             <a onClick={this.search}>SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;