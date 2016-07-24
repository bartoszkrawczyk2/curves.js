import React from 'react';
import { connect } from 'react-redux';
import Histogram from '../../components/Histogram';

let mapStateToProps    = (state)    => state;
let mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Histogram);