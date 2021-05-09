import React from "react";
import "../css/select-box.css";

class SelectBox extends React.Component {

    render() {
        const {id, label, options, onSelect} = {
            id: this.props.id || null,
            label: this.props.label || null,
            options: this.props.options || [],
            onSelect: (event) => this.props.onSelect ? this.props.onSelect(event.target.value) : x => x
        };

        return (
            <div className='select-box'>
                {label && <label htmlFor={id} className='select-box__label'>{label}</label> }
                <div className='select-box__select'>
                    <select id={id} className='select-box__select__select' onChange={onSelect}>
                        { options.map((option, index) => (
                            <option value={option.value} key={index}>{option.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }
}

export default SelectBox;
