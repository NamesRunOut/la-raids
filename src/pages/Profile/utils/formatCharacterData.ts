import getWeekNumber from "../../../utils/getWeekNumber";

const formatCharacterData = (characters: Array<any>, ilvlhistory: Array<any>) => {
    let dataRange = 7
    ilvlhistory = ilvlhistory.reverse()
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
                    charHistory[character.name].push(character.ilvl)
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

    return result
}

export default formatCharacterData