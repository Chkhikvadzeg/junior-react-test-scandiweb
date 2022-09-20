import Header from './Header';
import React from 'react';
import Main from './Main';


class All extends React.Component {

    render() {
        return (
            <div className='category' >
                <Header path='all' />
                <Main category="all" />
            </div>
        )
    }
}

export default All;


