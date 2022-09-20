import {classData} from "../../../data/classData";

const countStats = (players: Array<any>) => {
    let classes = [
        {name: 'Warrior', value: 0, color: classData.Berserker.color},
        {name: 'Martial Artist', value: 0, color: classData.Striker.color},
        {name: 'Gunner', value: 0, color: classData.Gunslinger.color},
        {name: 'Mage', value: 0, color: classData.Sorceress.color},
        {name: 'Assassin', value: 0, color: classData.Deathblade.color},
    ]
    let specs = [
        {name: 'Berserker', value: 0, color: classData.Berserker.color},
        {name: 'Paladin', value: 0, color: classData.Paladin.color},
        {name: 'Gunlancer', value: 0, color: classData.Gunlancer.color},
        {name: 'Destroyer', value: 0, color: classData.Destroyer.color},
        {name: 'Striker', value: 0, color: classData.Striker.color},
        {name: 'Wardancer', value: 0, color: classData.Wardancer.color},
        {name: 'Scrapper', value: 0, color: classData.Scrapper.color},
        {name: 'Soulfist', value: 0, color: classData.Soulfist.color},
        {name: 'Glaivier', value: 0, color: classData.Glaivier.color},
        {name: 'Gunslinger', value: 0, color: classData.Gunslinger.color},
        {name: 'Artillerist', value: 0, color: classData.Artillerist.color},
        {name: 'Deadeye', value: 0, color: classData.Deadeye.color},
        {name: 'Sharpshooter', value: 0, color: classData.Sharpshooter.color},
        {name: 'Bard', value: 0, color: classData.Bard.color},
        {name: 'Sorceress', value: 0, color: classData.Sorceress.color},
        {name: 'Arcanist', value: 0, color: classData.Arcanist.color},
        {name: 'Shadowhunter', value: 0, color: classData.Shadowhunter.color},
        {name: 'Deathblade', value: 0, color: classData.Deathblade.color}
    ]
    let ilvls = [
        {name: '<=1370', value: 0, color: '#ee8484'},
        {name: '1370-1415', value: 0, color: '#FA8837'},
        {name: '1415-1445', value: 0, color: '#D9BE3B'},
        {name: '1445-1460', value: 0, color: '#7EF04D'},
        {name: '1460-1475', value: 0, color: '#3bd96d'},
        {name: '1475-1490', value: 0, color: '#4fe7a3'},
        {name: '1490-1505', value: 0, color: '#71b8ff'},
        {name: '1505<', value: 0, color: '#8f93ff'},
    ]
    for (let player of players){
        for (let char of player.characters){
            let ilvl = char.ilvl
            if (ilvl <= 1370) ilvls[0].value = ilvls[0].value+1
            else if (ilvl > 1370 && ilvl <= 1415) ilvls[1].value = ilvls[1].value+1
            else if (ilvl > 1415 && ilvl <= 1445) ilvls[2].value = ilvls[2].value+1
            else if (ilvl > 1445 && ilvl <= 1460) ilvls[3].value = ilvls[3].value+1
            else if (ilvl > 1460 && ilvl <= 1475) ilvls[4].value = ilvls[4].value+1
            else if (ilvl > 1475 && ilvl <= 1490) ilvls[5].value = ilvls[5].value+1
            else if (ilvl > 1490 && ilvl <= 1505) ilvls[6].value = ilvls[6].value+1
            else if (ilvl > 1505) ilvls[7].value = ilvls[7].value+1

            switch (char.class){
                case "Berserker":
                    classes[0].value = classes[0].value+1
                    specs[0].value = specs[0].value+1
                    break;
                case "Paladin":
                    classes[0].value = classes[0].value+1
                    specs[1].value = specs[1].value+1
                    break;
                case "Gunlancer":
                    classes[0].value = classes[0].value+1
                    specs[2].value = specs[2].value+1
                    break;
                case "Destroyer":
                    classes[0].value = classes[0].value+1
                    specs[3].value = specs[3].value+1
                    break;
                case "Striker":
                    classes[1].value = classes[1].value+1
                    specs[4].value = specs[4].value+1
                    break;
                case "Wardancer":
                    classes[1].value = classes[1].value+1
                    specs[5].value = specs[5].value+1
                    break;
                case "Scrapper":
                    classes[1].value = classes[1].value+1
                    specs[6].value = specs[6].value+1
                    break;
                case "Soulfist":
                    classes[1].value = classes[1].value+1
                    specs[7].value = specs[7].value+1
                    break;
                case "Glaivier":
                    classes[1].value = classes[1].value+1
                    specs[8].value = specs[8].value+1
                    break;
                case "Gunslinger":
                    classes[2].value = classes[2].value+1
                    specs[9].value = specs[9].value+1
                    break;
                case "Artillerist":
                    classes[2].value = classes[2].value+1
                    specs[10].value = specs[10].value+1
                    break;
                case "Deadeye":
                    classes[2].value = classes[2].value+1
                    specs[11].value = specs[11].value+1
                    break;
                case "Sharpshooter":
                    classes[2].value = classes[2].value+1
                    specs[12].value = specs[12].value+1
                    break;
                case "Bard":
                    classes[3].value = classes[3].value+1
                    specs[13].value = specs[13].value+1
                    break;
                case "Sorceress":
                    classes[3].value = classes[3].value+1
                    specs[14].value = specs[14].value+1
                    break;
                case "Arcanist":
                    classes[3].value = classes[3].value+1
                    specs[15].value = specs[15].value+1
                    break;
                case "Shadowhunter":
                    classes[4].value = classes[4].value+1
                    specs[16].value = specs[16].value+1
                    break;
                case "Deathblade":
                    classes[4].value = classes[4].value+1
                    specs[17].value = specs[17].value+1
                    break;
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