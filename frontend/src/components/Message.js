import React from 'react'
import { Alert } from 'react-bootstrap'

//-----------------------------------------------------------------------------
// COMPONENT: MESSAGE
//-----------------------------------------------------------------------------
function Message({ variant, children }) {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}

export default Message
