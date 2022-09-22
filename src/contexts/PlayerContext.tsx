import React, {createContext, useContext, useEffect, useState} from 'react'
import {browserLocalPersistence, getAuth, onAuthStateChanged, setPersistence, signInAnonymously, updateProfile} from "firebase/auth";
import {NotificationContext} from "./NotificationContext";

export const PlayerContext: any = createContext("")

const Player = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) => {
    const [setNotification] = useContext(NotificationContext)
    const [player, setPlayer] = useState<string>(localStorage.getItem("trackedPlayer") || "")
    const auth = getAuth()

    useEffect(() => {
        setPlayer(localStorage.getItem("trackedPlayer") || "")
    }, [])

    useEffect(() => {
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                return signInAnonymously(auth)
                    .then(r => {
                        // set player to display name
                        // console.log(1, r.user.displayName)
                    })
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
            })
    }, [auth])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid
                // TODO sync issues
                // console.log(2, user.displayName)
            } else {
                // User is signed out
            }
        })
    }, [auth, player])

    const updateTrackedPlayer = (playerName: string) => {
        localStorage.setItem("trackedPlayer", playerName)
        setPlayer(playerName)

        if (auth.currentUser !== null){
            updateProfile(auth.currentUser, {
                displayName: playerName
            })
                .then(() => {
                    setNotification({color: "lightgreen", message: "Profile updated"})
                })
                .catch((err: any) => {
                    console.log(err)
                })
        }
    }

    return (
        <PlayerContext.Provider value={[player, updateTrackedPlayer]}>
            {props.children}
        </PlayerContext.Provider>
    )
}


export {Player}