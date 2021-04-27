import React from "react";
import "../css/cards.css";
import "../css/utilities.css";

class CardSkeleton extends React.Component {

    render() {
        return (
            <span className='card--is-loading'>
                <span className='card__image' />
                <span className='card__content--is-loading' />
            </span>
        );
    }
}

export default CardSkeleton;
