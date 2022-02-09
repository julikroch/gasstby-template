import React, { useEffect, useState } from 'react'
import firebase from '../firebase'

function useAuth() {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
        const unsuscribe = firebase.auth?.onAuthStateChanged(user => {
            user ? setAuthUser(user) : setAuthUser(null)
        })

        return () => unsuscribe();
    }, [])

    return authUser

}

export default useAuth