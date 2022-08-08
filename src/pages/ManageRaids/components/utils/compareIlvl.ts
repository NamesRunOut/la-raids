const compareIlvl = (a: { ilvl: number }, b: { ilvl: number }) => {
    if (a.ilvl < b.ilvl)
        return -1
    if (a.ilvl > b.ilvl)
        return 1
    return 0
}

export default compareIlvl