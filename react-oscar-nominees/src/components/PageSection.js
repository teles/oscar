import {titleToId} from "../Utilities";
import SelectBox from "./SelectBox";
import Card from "./Card";
import React from "react";
import "../css/utilities.css";

class PageSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selections: {}
        }
    }

    getSelectionKey(categoryId) {
        return `${this.props.id}_${categoryId}`;
    }

    select(categoryId, cardId) {
        const keyValue = this.getSelectionKey(categoryId);
        this.setState(Object.assign(this.state.selections,{
           [keyValue]: cardId
        }));
    }

    render() {

        const {items, selections, pageTopReference} = {
            items: this.props.items.items,
            selections: this.state.selections,
            pageTopReference: `#${this.props.pageTopReference}`
        };

        const backToTop = function () {
            document.querySelector(pageTopReference).scrollIntoView({
                behavior: "smooth"
            });
        };

        const onSelectSectionToJump = (sectionId) => {
            document.querySelector(sectionId).scrollIntoView({behavior: 'smooth'});
        };

        return (
            <React.Fragment>
                <SelectBox
                    label='Select a year'
                    id='year'
                    options={[{value: 2021, name: '2021'}]}
                />
                <SelectBox
                    label='Jump to section'
                    id='nominees'
                    options={this.props.items.options}
                    onSelect={onSelectSectionToJump}
                />
                { items.map((item, index) => {
                    return (
                        <section id={titleToId(item.name)} className='category' key={index}>
                            <h2 className='category__title'>{item.name}</h2>
                            <ul className='category__cards u-opacity-on-hover-parent'>
                                {item.items.map((card, cardIndex) => (
                                    <Card
                                        className='u-opacity-on-hover-parent__item'
                                        isSelected={selections[this.getSelectionKey(index)] === cardIndex}
                                        onSelect={this.select.bind(this, index, cardIndex)}
                                        title={card.title}
                                        alt={card.title}
                                        subtitle={card.subtitle}
                                        image={card.image}
                                        key={cardIndex}
                                    />
                                ))}
                            </ul>
                            <button
                                onClick={backToTop}
                                className='category__back-to-top-button'>
                                Back to top
                            </button>
                        </section>
                    );
                })}
            </React.Fragment>
        );
    }
}

export default PageSection;
