import React, {useState} from 'react'

export const Options = ({ onSubmit }) => {
    const [selectedOption, setSelectedOption] = useState('ing-inf-23');

    const handleOptionChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(selectedOption);
    };

    return (
        <div className='options'>
            <form onSubmit={handleSubmit}>
                <select name="plans" value={selectedOption} onChange={handleOptionChange}>
                    <option value="ing-inf-23" >Ingeniería Informática Plan 2023</option>
                    <option value="ing-inf-10">Ingeniería Informática Plan 2010</option>
                    <option value="ing-ind-23">Ingeniería Industrial Plan 2023</option>
                    <option value="ing-bio-24">Ingeniería Biomédica Plan 2024</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}