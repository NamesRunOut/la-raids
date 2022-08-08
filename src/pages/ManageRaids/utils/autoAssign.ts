//@ts-nocheck
import reset from "./reset";
import {signedupgroupname} from "./consts";
import {raidData} from "../../../data/raidData";
import compareIlvl from "./compareIlvl";

const autoAssign = (raid: string, elements: any, setElements: any) => {
    reset(elements, setElements)
    let signedUp = elements[signedupgroupname]
    let groups = []
    let groupMax = raidData[raid].groupSize
    for (let i=0;i<Object.keys(elements).length-1;i++){
        groups.push([])
    }
    let supportClasses = ["Bard", "Paladin"]

    // sort by ilvl
    signedUp.sort(compareIlvl)

    let dpsPlayers = signedUp.filter(c => !supportClasses.includes(c.class))
    let supportPlayers = signedUp.filter(c => supportClasses.includes(c.class))

    // assign at least groupMax/4 supports
    let supportNumber = groupMax/4
    for (let group=0;group<groups.length;group++){
        let suppsInGroup = 0
        let newSups = supportPlayers
        let sIdx = 0
        let eIdx = newSups.length-1

        while (suppsInGroup < Math.ceil(supportNumber/2)){
            if (supportPlayers.length < 1 || groups[group].length >= groupMax || eIdx < 0) break
            if (!groups[group].some(el => el.playerName === newSups[eIdx].playerName)){
                suppsInGroup++
                groups[group].push(newSups[eIdx])
                let elIdx = supportPlayers.indexOf(newSups[eIdx])
                supportPlayers.splice(elIdx, 1)
            }
            eIdx--
        }

        newSups = supportPlayers

        while (suppsInGroup < supportNumber){
            if (supportPlayers.length < 1 || groups[group].length >= groupMax || sIdx > newSups.length-1) break
            if (!groups[group].some(el => el.playerName === newSups[sIdx].playerName)){
                suppsInGroup++
                groups[group].push(newSups[sIdx])
                let elIdx = supportPlayers.indexOf(newSups[sIdx])
                supportPlayers.splice(elIdx, 1)
            }
            sIdx++
        }
    }

    // TODO recommended ilvl

    // assign dps to groups
    let dpsNumber = groupMax-supportNumber
    for (let group=0;group<groups.length;group++){
        let dpsInGroup = 0
        let newDps = dpsPlayers
        let sIdx = 0
        let eIdx = newDps.length-1

        while (dpsInGroup < Math.ceil(dpsNumber/2)){
            if (dpsPlayers.length < 1 || groups[group].length >= groupMax || eIdx < 0) break
            if (!groups[group].some(el => el.playerName === newDps[eIdx].playerName)){
                dpsInGroup++
                groups[group].push(newDps[eIdx])
                let elIdx = dpsPlayers.indexOf(newDps[eIdx])
                dpsPlayers.splice(elIdx, 1)
            }
            eIdx--
        }

        newDps = dpsPlayers

        while (dpsInGroup < groupMax){
            if (dpsPlayers.length < 1 || groups[group].length >= groupMax || sIdx > newDps.length-1) break
            if (!groups[group].some(el => el.playerName === newDps[sIdx].playerName)){
                dpsInGroup++
                groups[group].push(newDps[sIdx])
                let elIdx = dpsPlayers.indexOf(newDps[sIdx])
                dpsPlayers.splice(elIdx, 1)
            }
            sIdx++
        }
    }

    // assign leftovers to groups
    let leftovers = [dpsPlayers, supportPlayers].flat()
    for (let group=0;group<groups.length;group++){
        for (let i=0;i<groupMax;i++){
            // weakest first
            if (leftovers.length < 1 || groups[group].length >= groupMax) break
            if (!groups[group].some(el => el.playerName === leftovers[0].playerName))
                groups[group].push(leftovers.shift())

            // strongest last
            if (leftovers.length < 1 || groups[group].length >= groupMax) break
            if (!groups[group].some(el => el.playerName === leftovers[leftovers.length-1].playerName))
                groups[group].push(leftovers.pop())
        }
    }

    // sort groups by ilvl
    for (let group=0;group<groups.length;group++){
        groups[group].sort(compareIlvl).reverse()
    }

    // sort leftovers by ilvl
    leftovers.sort(compareIlvl).reverse()

    // fit and assign data
    let result = {}
    for (let group=0;group<groups.length;group++){
        result[`Group${group+1}`] = groups[group]
    }
    setElements({[signedupgroupname]: leftovers, ...result})
}

export default autoAssign