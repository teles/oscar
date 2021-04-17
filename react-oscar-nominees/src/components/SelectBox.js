import React from "react";

class SelectBox extends React.Component {
    constructor(props) {
        super(props);
        const logValue = (event) => console.log(event.target.value);
        this.state = {
            id: props.id || null,
            title: props.title || null,
            options: props.options || [],
            onSelect: props.onSelect || logValue
        }
    }

    render() {
        const {id, title, options, onSelect} = this.state;
        return (
            <div className='select-box'>
                {title && <label htmlFor={id} className='select-box__label'>{title}</label> }
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
