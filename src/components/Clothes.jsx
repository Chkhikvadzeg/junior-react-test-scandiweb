import Header from './Header';
import React from 'react';
import Main from './Main';

class Clothes extends React.Component {
    render() {
        return (
            <>
                <Header path='clothes' />
                <Main category="clothes" />
            </>
        )
    }
}

export default Clothes;


