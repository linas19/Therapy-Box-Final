import React from 'react'
import './AddPictureComponent.css'

export default function AddPictureComponent({ text, onChange }) {
    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();

    }
    return (
        <div className="add-container">
            <input type="file"
                ref={hiddenFileInput}
                onChange={onChange}
                style={{ display: 'none' }} />
            <button className="add-button" onClick={handleClick}>{text}</button>
        </div>
    )
}