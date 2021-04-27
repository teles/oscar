import React from "react";
import "../css/cards.css";
import "../css/utilities.css";

class Card extends React.Component {

    render() {
        const {title, subtitle, alt, image, onSelect, isSelected, isFeatured } = this.props;
        const cardClassName = isSelected ?
            (isSelected && isFeatured ? 'card--is-selected card--is-featured' : 'card--is-selected' )
            : isFeatured ? 'card--is-featured' : 'card';

        return (
            <li className={cardClassName + ' ' + this.props.className || '' } >
                { image && image.src ?
                <img
                    loading='lazy'
                    onClick={onSelect}
                    className='card__image'
                    src={image.src}
                    alt={alt}
                /> : <span className='card__image'>&nbsp;</span>
                }
                <div className='card__content'>
                    <p className='card__title'>{isFeatured && '🏆 '}{title}</p>
                    <p className='card__subtitle'>
                        {subtitle} {isFeatured && '(winner)'}
                    </p>
                </div>
            </li>
        );
    }
}

export default Card;
