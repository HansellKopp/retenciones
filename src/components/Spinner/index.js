import React, { Fragment } from 'react'
import { LinearProgress, Snackbar } from 'react-md'

const Spinner = (props) =>
  <Fragment>
    <LinearProgress id='loading' scale={2} />
    <Snackbar id='application-toasts' toasts={props.toasts} onDismiss={props.handleDismiss} />
  </Fragment>

export default Spinner
