import React, {createContext, useEffect, useState} from 'react'

export const SettingsContext: any = createContext("")

const Settings = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) => {
    const [settings, setSettings] = useState<string>(localStorage.getItem("trackedPlayer") || "")

    useEffect(() => {
        setSettings(localStorage.getItem("trackedPlayer") || "")
    }, [])

    useEffect(() => {
        // setPersistence(auth, browserLocalPersistence)
        //     .then(() => {
        //         return signInAnonymously(auth)
        //             .then(r => {
        //                 // set player to display name
        //                 console.log(r.user.displayName)
        //             })
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code
        //         const errorMessage = error.message
        //     })
    }, [])

    const updateSettings = (playerName: string) => {
        localStorage.setItem("trackedPlayer", playerName)
        setSettings(playerName)

        // if (auth.currentUser !== null){
        //     updateProfile(auth.currentUser, {
        //         displayName: playerName
        //     })
        //         .then(() => {
        //             console.log("profile updated")
        //         })
        //         .catch((err: any) => {
        //             console.log(err)
        //         })
        // }
    }

    return (
        <SettingsContext.Provider value={[settings, updateSettings]}>
            {props.children}
        </SettingsContext.Provider>
    )
}


export {Settings}