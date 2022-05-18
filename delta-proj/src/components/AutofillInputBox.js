import React, { useState } from 'react';

const AutofillInputBox = (props) => {
    const list = props.inputAutofill;
    let [options, updateOptions] = useState([]);
    let [inputStr, updateInputStr] = useState('');

    const updateList = (e) => {
        const newStr = e.target.value ? e.target.value : e.target.innerHTML;
        updateInputStr(newStr);
        const str = new RegExp(newStr, 'i');
        let tempOptions = [];
        for (let i = 0; e.type !== 'click' && i < list.length; i++) {
            if (list[i].match(str)) {
                tempOptions.push(list[i]);
            }
            if (tempOptions.length > 10) {
                updateOptions(tempOptions);
                break;
            }
        }
        updateOptions(tempOptions);
    };

    return (
        <div>
            <input type="text" className="form-control flex-grow-2" placeholder="City or Airport Code" aria-label="City" aria-describedby="station" onInput={updateList} value={inputStr} />
            <ul className="list-group position-absolute">
                {inputStr && options.map(
                    item => (
                        <li className="list-group-item" key={item} onClick={updateList}>{item}</li>
                    )
                )}
            </ul>
        </div>
    );
};

export default AutofillInputBox;