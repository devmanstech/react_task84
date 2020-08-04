import React from 'react';

function Header(props) {
    return (
        <div className="header no-top-nav">
            <div className="wrapper-container">
                <h1><a href="http://focus.GoogleInternal.com/tools/">FOCUS Tools</a></h1>
                <div className="logo" title="John GoogleInternal Logo">&nbsp;</div>
            </div>
            <div className="brandbar-top" />
            <div className="brandbar-bottom" />
        </div>
    );
}

export default Header;