//@ts-nocheck
import reset from "./reset";
import {signedupgroupname} from "./consts";
import {raidData} from "../../../data/raidData";
import compareIlvl from "./compareIlvl";

const playerIsAlreadyInGroup = (group, player) => {
    return group.some(el => el.playerName === player.playerName)
}

const playerIsInPreviousGroup = (prevGroup, player) => {
    if (prevGroup === undefined) return false
    return prevGroup.some(el => el.playerName === player.playerName)
}

const retries = 5

const autoAssignParallel = (raid: string, elements: any, setElements: any) => {
    reset(elements, setElements)
    let signedUp = elements[signedupgroupname]
    let groups = []
    let groupMax = raidData[raid].groupSize
    for (let i=0;i<Object.keys(elements).length-1;i++){
        groups.push([])
    }
    let supportClasses = ["Bard", "Paladin"]

    // sort by ilvl
    signedUp.sort(compareIlvl).reverse()

    let dpsPlayers = signedUp.filter(c => !supportClasses.includes(c.class))
    let supportPlayers = signedUp.filter(c => supportClasses.includes(c.class))

    // assign half required supports of lowest rank
    let supportNumber = groupMax/4
    let halfReqSupports = Math.ceil(supportNumber/2)

    // for (let i=0;i<retries;i++)
    for (let group=0;group<groups.length;group++){
        let suppsInGroup = 0
        let newSups = supportPlayers
        let eIdx = newSups.length

        while (suppsInGroup < halfReqSupports){
            if (supportPlayers.length < 1 || groups[group].length >= halfReqSupports || groups[group].length >= groupMax || eIdx < 0) break

            eIdx--

            if (playerIsAlreadyInGroup(groups[group], newSups[eIdx]) || playerIsInPreviousGroup(groups[group-1], newSups[eIdx])) continue

            suppsInGroup++
            groups[group].push(newSups[eIdx])
            let elIdx = supportPlayers.indexOf(newSups[eIdx])
            supportPlayers.splice(elIdx, 1)
        }
    }

    // assign half required dps of lowest rank
    let dpsNumber = groupMax-supportNumber
    let halfReqDps = Math.ceil(dpsNumber/2)
    // for (let i=0;i<retries;i++)
    for (let group=0;group<groups.length;group++){
        let dpsInGroup = 0
        let newDps = dpsPlayers

        let eIdx = newDps.length

        while (dpsInGroup < halfReqDps){
            if (dpsPlayers.length < 1 || groups[group].length >= (halfReqDps+halfReqSupports) || groups[group].length >= groupMax || eIdx < 0) break

            eIdx--

            if (playerIsAlreadyInGroup(groups[group], newDps[eIdx]) || playerIsInPreviousGroup(groups[group-1], newDps[eIdx])) continue

            dpsInGroup++
            groups[group].push(newDps[eIdx])
            let elIdx = dpsPlayers.indexOf(newDps[eIdx])
            dpsPlayers.splice(elIdx, 1)
        }
    }

    // equally distribute highest ranking supports
    // for (let i=0;i<retries;i++){
        let newSups = structuredClone(supportPlayers)
        for (let player=0;player<newSups.length;player++){
            for (let group=0;group<groups.length;group++){
                if (supportPlayers.length < 1 || groups[group].length >= groupMax) continue
                if (playerIsAlreadyInGroup(groups[group], newSups[player]) || playerIsInPreviousGroup(groups[group-1], newSups[player])) continue

                groups[group].push(newSups[player])
                let elIdx = supportPlayers.findIndex(c => c.name === newSups[player].name && c.playerName === newSups[player].playerName)
                supportPlayers.splice(elIdx, 1)
                break
            }
        }
    // }

    // equally distribute highest ranking dps
    // for (let i=0;i<retries;i++){
        let newDps = structuredClone(dpsPlayers)
        for (let player=0;player<newDps.length;player++){
            for (let group=0;group<groups.length;group++){
                if (dpsPlayers.length < 1 || groups[group].length >= groupMax) continue
                if (playerIsAlreadyInGroup(groups[group], newDps[player]) || playerIsInPreviousGroup(groups[group-1], newDps[player])) continue

                groups[group].push(newDps[player])
                let elIdx = dpsPlayers.findIndex(c => c.name === newDps[player].name && c.playerName === newDps[player].playerName)
                dpsPlayers.splice(elIdx, 1)
                break
            }
        }
    // }

    // assign leftovers to groups
    let leftovers = [dpsPlayers, supportPlayers].flat()
    // for (let i=0;i<retries;i++) {
        let newLeftovers = leftovers
        for (let player=0;player<newLeftovers.length;player++){
            for (let group=0;group<groups.length;group++){
                if (leftovers.length < 1 || groups[group].length >= groupMax) continue
                if (playerIsAlreadyInGroup(groups[group], newLeftovers[player]) || playerIsInPreviousGroup(groups[group-1], newLeftovers[player])) continue

                groups[group].push(newLeftovers[player])
                let elIdx = leftovers.findIndex(c => c.name === newLeftovers[player].name && c.playerName === newLeftovers[player].playerName)
                leftovers.splice(elIdx, 1)
                break
            }
        }
    // }

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

export default autoAssignParallel