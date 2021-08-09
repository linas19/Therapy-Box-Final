import React from 'react'
import './AddPhotosComponent.css'

export default function AddPhotosComponent({ onChange }) {
    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();

    }
    return (
        <div className="add-photos-container">
            <button className="add-photos-button" onClick={handleClick}>
                <div className="plus-sign">
                <table>
                    <tr>
                        <td class="TopLeft"></td>
                        <td class="TopRight"></td>
                    </tr>
                    <tr>
                        <td class="BottomLeft"></td>
                        <td class="BottomRight"></td>
                    </tr>
                </table>
                </div>
            </button>
            <input type="file"
                ref={hiddenFileInput}
                onChange={onChange}
                style={{ display: 'none' }} />
        </div>
    )
}