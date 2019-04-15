import React, { Fragment } from 'react'

import Toolbar from './Toolbar'

const Layout = ({ children }) => (
  <Fragment>
    { children }
    <Toolbar />
  </Fragment>
)

export default Layout
