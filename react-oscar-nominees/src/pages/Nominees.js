import React from "react";
import {withRouter} from "react-router-dom";
import Spreadparser from "spreadparser";
import NomineesByYear from "../NomineesByYear";
import SelectBox from "../components/SelectBox";
import {dataToSections, titleToId} from "../Utilities";
import "../css/category.css";
import Card from "../components/Card";

class Nominees extends React.Component {
    constructor(props) {
        super(props);
        const sections = Object.keys(NomineesByYear).reduce((total, year) => {
            total[year] = [];
            return total;
        }, {});

        this.options = Object.keys(NomineesByYear).map(year => {
            return {value: year, name: year};
        }).sort((a, b) => b.value - a.value);

        this.state = {
            isLoading: false,
            sections,
            currentYear: this.options[0].value
        };
    }

    loadNominees(year) {
        this.setState({isLoading: true});
        const hasNotLoadedThisYearBefore = this.state.sections[year].length === 0;
        if (hasNotLoadedThisYearBefore) {
            fetch(Spreadparser.getSpreadsheetUrl(...NomineesByYear[year]))
                .then(response => response.json())
                .then(data => Spreadparser.parse(data, {titleCase: 'camelCase'}))
                .then(nominees => {
                    return dataToSections(nominees.data, x => x.category)
                })
                .then(sections => {
                    const state = {
                        isLoading: this.state.isLoading,
                        sections: {},
                        currentYear: year
                    };
                    state.sections = Object.assign(this.state.sections, {[year]: sections});
                    this.setState(state);
                })
                .finally(() => {
                    this.setState({
                        isLoading: false,
                        sections: this.state.sections
                    });
                })
        } else {
            this.setState({
                currentYear: year,
                isLoading: false
            });
        }
    }

    componentDidMount() {
        this.loadNominees(this.state.currentYear);
    }

    onSelect(year) {
        this.loadNominees(year);
    }

    jumpToSection(reference) {
        document.querySelector(`#${reference}`).scrollIntoView({behavior: 'smooth'});
    }

    render() {
        const sections = this.state.sections[this.state.currentYear] || [];
        const {isLoading} = this.state;

        return <React.Fragment>
            <SelectBox
                label='Select a year'
                onSelect={this.onSelect.bind(this)}
                id='year'
                options={this.options}
            />
            <SelectBox
                label='Jump to section'
                onSelect={this.jumpToSection.bind(this)}
                id='jump-to-section'
                options={isLoading ? [{name: 'Loading ...'}] : sections.map(s => ({value: titleToId(s.name), name: s.name}))}
            />
            {sections.map((section, index) => {
                return <section className='category' key={index} id={titleToId(section.name)}>
                    <h2 className='category__title'>{section.name}</h2>
                    <ul className='category__cards u-opacity-on-hover-parent'>
                        {section.items.map((item, innerIndex) => {
                            return <Card
                                className='u-opacity-on-hover-parent__item'
                                key={innerIndex}
                                {...item}
                            />
                        })}
                    </ul>
                </section>
            })}
        </React.Fragment>;
    }
}

export default withRouter(Nominees);
