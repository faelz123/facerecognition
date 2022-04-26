import React from 'react';
import './ImageLinkForm.css'


const ImageLinkForm = ({ onInputChange , onSubmit }) => {

    return(
        <div>
            <p className='f3'>
                Face Recognition App, take a shot!
            </p>
            <div>
                <div className='form BgColour center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70' type='text' onChange={onInputChange} />
                    <button className='grow w-30 f4 link ph3 pv2 dib white BgColour pointer' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;