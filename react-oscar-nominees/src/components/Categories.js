import {groupBy, titleToId} from "../Utilities";
import SelectBox from "./SelectBox";
import Card from "./Card";
import React from "react";

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: groupBy(props.nominees, 'category'),
            selections: props.selections,
            pageTopReference: `#${props.pageTopReference}`
        };
    }

    select(categoryId, cardId) {
        const selection = {[categoryId]: cardId === this.state.selections[categoryId] ? null : cardId};
        const selections = Object.assign(this.state.selections, selection);
        this.setState({
            selections
        });
    }

    render() {
        const {categories, selections, pageTopReference} = this.state;

        const years = [{
            value: 2021,
            name: '2021'
        }];

        const sections = Object.keys(categories).map(categoryName => {
            return {
                value: `#${titleToId(categoryName)}`,
                name: categoryName
            }
        });

        const backToTop = function () {
            document.querySelector(pageTopReference).scrollIntoView({
                behavior: "smooth"
            });
        };

        const onSectionSelection = selectionRef => document
            .querySelector(selectionRef.target.value)
            .scrollIntoView({
                behavior: "smooth"
        });

        return (
            <React.Fragment>
                <SelectBox
                    id='years'
                    title='Select a year:'
                    options={years}
                />
                <SelectBox
                    id='sections'
                    title='Jump to section:'
                    options={sections}
                    onSelect={onSectionSelection}
                />
                {Object.keys(categories).map((categoryName, categoryIndex) => {
                    return (
                        <section id={titleToId(categoryName)} className='category' key={categoryIndex}>
                            <h2 className='category__title'>{categoryName}</h2>
                            <ul className='cards'>
                                {categories[categoryName].map((card, cardIndex) => (
                                    <Card
                                        isSelected={selections[categoryIndex] === cardIndex}
                                        onClick={this.select.bind(this, categoryIndex, cardIndex)}
                                        card={card}
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

export default Categories;
