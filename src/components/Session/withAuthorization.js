import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
const withAuthorization = condition => Component =>{
    class WithAuthorization extends React.Component {
        render() {
        return <Component {...this.props} />;
        }
    }
    
    return compose(
        withRouter,
        withFirebase,
      )(WithAuthorization);
};

export default withAuthorization;