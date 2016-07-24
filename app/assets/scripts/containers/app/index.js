import React from 'react';
import { connect } from 'react-redux';
import App from '../../components/App';

let mapStateToProps    = (state)    => state;
let mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);