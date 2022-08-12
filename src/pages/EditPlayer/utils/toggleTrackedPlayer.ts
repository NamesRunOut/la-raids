import React from "react";

const toggleTrackedPlayer = (e: React.ChangeEvent<HTMLInputElement>, playerName: string, updateTrackedPlayer: any) => {
    let val = e.target.checked

    if (val) {
        updateTrackedPlayer(playerName)
    } else {
        updateTrackedPlayer("")
    }
}

export default toggleTrackedPlayer