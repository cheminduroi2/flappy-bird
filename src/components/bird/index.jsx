import React from 'react';
import { CONSTANTS } from '../../util/constants';
import './index.css';

export const Bird = (props) => {
    const { BIRD_SIZE } = CONSTANTS;
    const birdStyles = {
        height: `${BIRD_SIZE}px`,
        width: `${BIRD_SIZE}px`,
        top: `${props.top}px`,  
    };
    
    return (
        <div className="bird" style={birdStyles}></div>
    );
};