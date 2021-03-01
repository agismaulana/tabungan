import React from 'react';
import ReactDOM from 'react-dom';

import Route from './components/Route';

function Index() {
    return (
        <div>
            <Route />
        </div>
    );
}

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}