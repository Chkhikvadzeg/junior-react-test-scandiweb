import Header from './Header';
import React from 'react';
import Main from './Main';

class Clothes extends React.Component {
    render() {
        return (
            <div className='category' >
                <Header path='clothes' />
                <Main category="clothes" />
            </div>
        )
    }
}

export default Clothes;


