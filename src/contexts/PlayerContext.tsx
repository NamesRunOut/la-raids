import React, {createContext, useEffect, useState} from 'react'

export const PlayerContext: any = createContext("")

const Player = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) => {
    const [player, setPlayer] = useState<string>(localStorage.getItem("trackedPlayer") || "")

    useEffect(() => {
        setPlayer(localStorage.getItem("trackedPlayer") || "")
    }, [])

    const updateTrackedPlayer = (playerName: string) => {
        localStorage.setItem("trackedPlayer", playerName)
        setPlayer(playerName)
    }

    return (
        <PlayerContext.Provider value={[player, updateTrackedPlayer]}>
            {props.children}
        </PlayerContext.Provider>
    )
}


export {Player}