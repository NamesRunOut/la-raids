export const getIlvlRating = (clvl: number, minlvl: number) => {
    let relative = clvl-minlvl

    // equal ilvl
    if (relative === 0) return "#dada00"

    // less ilvl
    if (relative < 0 && Math.abs(relative) >= 20) return "#d2200c"
    if (relative < 0 && Math.abs(relative) >= 10) return "#c4770e"

    // more ilvl
    if (relative >= 20) return "#10d269"
    if (relative >= 15) return "#11ce39"
    if (relative >= 10) return "#30dc13"
    if (relative >= 5) return "#5fd90f"
    if (relative >= 2) return "#91da10"

    return "#cfdc13"
}

export default getIlvlRating