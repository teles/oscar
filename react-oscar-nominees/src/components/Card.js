import React from "react";
import "../css/cards.css";

class Card extends React.Component {

    render() {
        const {title, subtitle, alt, image, onSelect, isSelected } = this.props;

        return (
            <li className={isSelected ? 'card--is-selected' : 'card'} >
                { image && image.src &&
                <img
                    loading='lazy'
                    onClick={onSelect}
                    className='card__image'
                    src={image.src}
                    alt={alt}
                />
                }
                <div className='card__content'>
                    <p className='card__title'>{title}</p>
                    <p className='card__subtitle'>{subtitle}</p>
                </div>
            </li>
        );
    }
}

export default Card;
