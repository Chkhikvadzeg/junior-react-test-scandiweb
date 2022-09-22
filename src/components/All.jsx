import Header from './Header';
import React from 'react';
import Main from './Main';


class All extends React.Component {

    render() {
        return (
            <>
                <Header path='all' />
                <Main category="all" />
            </>
        )
    }
}

export default All;


