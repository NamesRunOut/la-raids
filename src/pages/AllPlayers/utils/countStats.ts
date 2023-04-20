import {classData} from "../../../data/classData";

const countStats = (players: Array<any>) => {
    let classes = [
        {name: 'Warrior', value: 0, color: classData.Berserker.color},
        {name: 'Martial Artist', value: 0, color: classData.Striker.color},
        {name: 'Gunner', value: 0, color: classData.Gunslinger.color},
        {name: 'Mage', value: 0, color: classData.Sorceress.color},
        {name: 'Assassin', value: 0, color: classData.Deathblade.color},
        {name: 'Specialist', value: 0, color: classData.Artist.color},
    ]
    let specs = [
        {name: 'Berserker', value: 0, color: classData.Berserker.color, className: "Warrior"},
        {name: 'Paladin', value: 0, color: classData.Paladin.color, className: "Warrior"},
        {name: 'Gunlancer', value: 0, color: classData.Gunlancer.color, className: "Warrior"},
        {name: 'Destroyer', value: 0, color: classData.Destroyer.color, className: "Warrior"},
        {name: 'Striker', value: 0, color: classData.Striker.color, className: "Martial Artist"},
        {name: 'Wardancer', value: 0, color: classData.Wardancer.color, className: "Martial Artist"},
        {name: 'Scrapper', value: 0, color: classData.Scrapper.color, className: "Martial Artist"},
        {name: 'Soulfist', value: 0, color: classData.Soulfist.color, className: "Martial Artist"},
        {name: 'Glaivier', value: 0, color: classData.Glaivier.color, className: "Martial Artist"},
        {name: 'Gunslinger', value: 0, color: classData.Gunslinger.color, className: "Gunner"},
        {name: 'Artillerist', value: 0, color: classData.Artillerist.color, className: "Gunner"},
        {name: 'Deadeye', value: 0, color: classData.Deadeye.color, className: "Gunner"},
        {name: 'Sharpshooter', value: 0, color: classData.Sharpshooter.color, className: "Gunner"},
        {name: 'Machinist', value: 0, color: classData.Machinist.color, className: "Gunner"},
        {name: 'Bard', value: 0, color: classData.Bard.color, className: "Mage"},
        {name: 'Sorceress', value: 0, color: classData.Sorceress.color, className: "Mage"},
        {name: 'Arcanist', value: 0, color: classData.Arcanist.color, className: "Mage"},
        {name: 'Summoner', value: 0, color: classData.Summoner.color, className: "Mage"},
        {name: 'Shadowhunter', value: 0, color: classData.Shadowhunter.color, className: "Assassin"},
        {name: 'Deathblade', value: 0, color: classData.Deathblade.color, className: "Assassin"},
        {name: 'Reaper', value: 0, color: classData.Reaper.color, className: "Assassin"},
        {name: 'Artist', value: 0, color: classData.Artist.color, className: "Specialist"}
    ]
    let ilvls = [
        {name: '<1475', value: 0, color: '#b96c32'},
        {name: '1475-1490', value: 0, color: '#f04d4d'},
        {name: '1490-1540', value: 0, color: '#d93b3b'},
        {name: '1540-1550', value: 0, color: '#e74fe4'},
        {name: '1550-1560', value: 0, color: '#71b8ff'},
        {name: '1560<=', value: 0, color: '#dbeaff'},
    ]
    for (let player of players){
        for (let char of player.characters){
            let ilvl = char.ilvl
            if (ilvl < 1475) ilvls[0].value = ilvls[0].value+1
            else if (ilvl >= 1475 && ilvl < 1490) ilvls[1].value = ilvls[1].value+1
            else if (ilvl >= 1490 && ilvl < 1540) ilvls[2].value = ilvls[2].value+1
            else if (ilvl >= 1540 && ilvl < 1550) ilvls[3].value = ilvls[3].value+1
            else if (ilvl >= 1550 && ilvl < 1560) ilvls[4].value = ilvls[4].value+1
            else if (ilvl >= 1560) ilvls[5].value = ilvls[5].value+1

            let specsIdx: number = specs.findIndex(el => el.name === char.class)
            if (specsIdx !== -1) {
                specs[specsIdx].value += 1

                let classIdx: number = classes.findIndex(el => el.name === specs[specsIdx].className)
                if (classIdx !== -1) classes[classIdx].value += 1
            }

        }
    }

    return {
        classDistribution: classes,
        specializationDistribution: specs,
        ilvlDistribution: ilvls
    }
}

export default countStats