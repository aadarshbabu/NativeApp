import React from 'react'
import Alert from './Alert'

function useAlert() {

    const callAlert = () => {
        <Alert />
    }
    return () => {
        callAlert()
    }

}

export default useAlert