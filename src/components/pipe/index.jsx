import React from 'react';
import { CONSTANTS } from '../../util/constants';
import './index.css';

export const Pipe = (props) => {
    const { top, height, leftPosition } = props;
    const { PIPE_WIDTH } = CONSTANTS;

    const pipeStyles = {
        height: `${height}px`,
        width: `${PIPE_WIDTH}px`,
        top: `${top}px`,
        left: `${leftPosition}px`
    };
    
    return (
        <div className="pipe" style={pipeStyles}></div>
    );
};