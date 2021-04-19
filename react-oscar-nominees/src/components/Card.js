import React from "react";
import "../css/cards.css";

class Card extends React.Component {

    render() {
        const {title, subtitle, alt, image } = this.props;

        return (
            <li className='card'>
                { image && image.src &&
                <img
                    loading='lazy'
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
