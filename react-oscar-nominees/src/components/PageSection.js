import {titleToId} from "../Utilities";
import SelectBox from "./SelectBox";
import Card from "./Card";
import React from "react";

class PageSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selections: {}
        }
    }

    select(categoryId, cardId) {
        this.setState(Object.assign(this.state.selections,{
           [categoryId]: cardId
        }));
        console.log(this.state.selections);
    }

    render() {

        const {items, pageTopReference} = {
            items: this.props.items.items,
            selections: this.props.selections,
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
                            <ul className='category__cards'>
                                {item.items.map((card, cardIndex) => (
                                    <Card
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
