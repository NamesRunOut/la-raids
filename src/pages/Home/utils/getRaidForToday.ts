import {raidData} from "../../../data/raidData";

const getRaidForToday = () => {
    let day = (new Date()).getDay()
    let raid = Object.entries(raidData).find(el => el[1].raidDay === day)
    if (raid === undefined) return Object.keys(raidData)[0]
    return raid[0]
}

export default getRaidForToday