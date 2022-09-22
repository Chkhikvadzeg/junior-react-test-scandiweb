import Header from './Header';
import React from 'react';
import Main from './Main';

class Tech extends React.Component {


    render() {
        return (
            <>
                <Header path='tech' />
                <Main category="tech" />
            </>
        )
    }
}

export default Tech;


