import React from 'react'

import { Fade } from 'react-awesome-reveal'

const Cancel = ({ children, isCancelling }) => {
  if (isCancelling) {
    return (
      <Fade reverse direction="right">
        {children}
      </Fade>
    )
  } else {
    return <>{children}</>
  }
}

export default Cancel
