import Header from './Header';
import React from 'react';
import Main from './Main';

class Tech extends React.Component {


    render() {
        return (
            <div className='category' >
                <Header path='tech' />
                <Main category="tech" />
            </div>
        )
    }
}

export default Tech;


