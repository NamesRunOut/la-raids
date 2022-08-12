export const getIlvlRating = (clvl: number, minlvl: number) => {
    let relative = clvl - minlvl

    // equal ilvl
    if (relative === 0) return "#da9c00"

    // less ilvl
    if (relative < 0 && Math.abs(relative) >= 20) return "#d2200c"
    if (relative < 0 && Math.abs(relative) >= 10) return "#c4770e"

    // more ilvl
    if (relative >= 35) return "#10d2d2"
    if (relative >= 30) return "#10d27b"
    if (relative >= 25) return "#1dd210"
    if (relative >= 20) return "#56ce11"
    if (relative >= 15) return "#7bdc13"
    if (relative >= 10) return "#a0d90f"
    if (relative >= 5) return "#dab810"

    return "#dc9613"
}

export default getIlvlRating