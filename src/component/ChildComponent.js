import React from 'react'

function ChildComponent(props) {
    return (
        <div>
            <button onClick = {()=>props.greedHandler('PANDU')}>Greet Component</button>
        </div>
    )
}

export default ChildComponent
