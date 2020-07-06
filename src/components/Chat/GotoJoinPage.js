import { Link } from 'react-router-dom';

import React from 'react'

const GotoJoinPage = () => {
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <Link to='/'><p className="error">Userame is taken. <br /> Goto Join Page.</p></Link>
            </div>

        </div>
    )
}

export default GotoJoinPage

