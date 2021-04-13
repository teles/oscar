import React from "react";
import "../css/cards.css";

class NomineeCard extends React.Component {

    render() {
        const {movie, image, nominees} = this.props.card;
        const isSelected = this.props.isSelected;
        return (
            <li
                className={isSelected ? 'card--is-selected' : 'card'}
                onClick={this.props.onClick}
            >
                { image && image.src &&
                <img
                    loading='lazy'
                    className='card__image'
                    src={image.src}
                    alt={nominees}
                />
                }
                <div className='card__content'>
                    <p className='card__title'>{nominees}</p>
                    <p className='card__subtitle'>{movie.name}</p>
                </div>
            </li>
        );
    }
}

export default NomineeCard;
