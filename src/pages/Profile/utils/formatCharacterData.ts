import getWeekNumber from "../../../utils/getWeekNumber";

const compareYear = (a: { year: number }, b: { year: number }) => {
    if (a.year < b.year)
        return -1
    if (a.year > b.year)
        return 1
    return 0
}

const compareWeek = (a: { week: number }, b: { week: number }) => {
    if (a.week < b.week)
        return -1
    if (a.week > b.week)
        return 1
    return 0
}

const formatCharacterData = (characters: Array<any>, ilvlhistory: Array<any>) => {
    let dataRange = 7
    // TODO remove duplicates, of same year and week
    ilvlhistory = ilvlhistory.sort(compareYear)
    ilvlhistory = ilvlhistory.sort(compareWeek)
    let result: Array<any>
    result = []

    let charHistory: any
    charHistory = {}

    let date = getWeekNumber(new Date())
    let year = date[0]
    let weekNo = date[1]

    let weekRangeArray = []
    for (let i=weekNo-dataRange+1;i<=weekNo;i++){
        weekRangeArray.push(i)
    }

    for (let character of characters) {
        charHistory[character.name] = []

        for (let week of weekRangeArray){
            let historicalData = ilvlhistory.find(el => el.year === year && el.week === week && el.charName === character.name)
            if (historicalData === undefined){
                historicalData = ilvlhistory.find(el => el.year <= year && el.week <= week && el.charName === character.name)
                if (historicalData !== undefined) {
                    charHistory[character.name].push(historicalData.ilvl)
                } else {
                    let minIlvl = Math.min.apply(null, ilvlhistory.filter(el => el.charName === character.name).map(el => el.ilvl))
                    if (minIlvl === Infinity) charHistory[character.name].push(character.ilvl)
                    else charHistory[character.name].push(minIlvl)
                }
            } else {
                charHistory[character.name].push(historicalData.ilvl)
            }
        }
    }

    for (let i=0;i<dataRange;i++){
        let record: any
        record = {
            name: `Week ${weekRangeArray[i]}`,
        }
        for (let character of characters) {
            record[character.name] = charHistory[character.name][i]
        }
        result.push(record)
    }

    // console.table(ilvlhistory)
    // console.table(result)

    return result
}

export default formatCharacterData