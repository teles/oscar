import React from "react";
import {withRouter} from 'react-router-dom';
import StorageManager from '../core/StorageManager';

class Favorites extends React.Component {
    constructor(props){
        super(props);
        this.storage = new StorageManager('local');
    }

    render() {

        const searchObject = Object.fromEntries(new URLSearchParams(this.props.location.search));
        searchObject.f = JSON.parse(searchObject.f);
        Object.keys(searchObject.f).map(year => {
            const favorites = this.storage.getObject(year);
            console.log(favorites);
            return favorites;
        });
        return <div> Favorites </div>;
    }
}

export default withRouter(Favorites);
