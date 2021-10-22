import React from 'react'

const WordSpace = (props) => {
    return (
        <span>
            &nbsp;
            {props.children}
            &nbsp;
        </span>
    )
}

export default WordSpace;
