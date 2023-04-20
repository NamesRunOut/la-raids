import React, {useEffect, useState} from "react";
import {db} from "../../firebase/init";
import {Header, LogsTable, Row, Td, Wrapper} from "./styles";
import {collection, Firestore, getDocs, limit, orderBy, query} from "firebase/firestore";
import {players, logs as logs1} from "./tmp";
import {data as dlogs} from './data'

const getLogs = async (db: Firestore, start: number, plimit: number) => {
    const logsPath = collection(db, 'logs')
    const q = query(logsPath, orderBy("timestamp", "desc"), limit(plimit))

    const querySnapshot = await getDocs(q)
    let result: any = []
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data())
        result.push(doc.data())
    });

    // console.log(result)
    return result
}

const Logs = () => {
    const [logs, setLogs] = useState([])
    const [page, setPage] = useState(0)
    const limit = 10

    useEffect(() => {
        getLogs(db, page, limit)
            .then(r => {
                setLogs(r)
            })
            .catch(err => console.log(err))
    }, [page])

    useEffect(() => {
        for (let i=0;i<dlogs.length;i++){
            for (let p of dlogs[i]){
                //@ts-ignore
                // p.raidId = i
                if (p.pName === undefined) continue
                // console.log(p)
                console.log(`${i},${p.cName},${p.boss},${p.classType},${p.group},${p.ilvl},${p.pName},${p.spec}`)
            }
        }
    }, [])

    useEffect(() => {
        return
        let p = players
        let l = logs1
        let result = []

        for (let log of l) {
            interface itemI {
                classType: number, // 0 - dps, 1 - supp
                spec: string,
                pName: string,
                cName: string,
                ilvl: number,
                group: number, // <- predict this
                boss: string
            }
            let items: Array<itemI> = []

            let regex = new RegExp("raid: \\w+")
            log.text = log.text.toLowerCase()
            if (!log.text.includes("raid:")) continue
            let raidName = log.text.match(regex)?.[0]
            if (raidName === null || raidName === undefined) continue
            //@ts-ignore
            raidName = raidName.slice(6, raidName.length)
            if (raidName === "Brelshaza_2") raidName = "Brelshaza"

            let r1 = new RegExp("signedup: \\[.*\\], group1", "g")
            //@ts-ignore
            let g: any = log.text.match(r1)[0]
            g = g.slice(11, g.length-9)
            g = g.split(", ")
            g = g.filter((el: string) => el !== "")
            for (let cn of g){
                items.push({
                    cName: cn,
                    group: 0,
                    //@ts-ignore
                    boss: raidName
                })
            }

            let gcopy = log.text
            for (let i=15;i>=0;i--){
                r1 = new RegExp(`group${i}: \\[.*, \\],`)
                g = gcopy.match(r1)
                if (g === null) continue
                g = g[0]
                gcopy = gcopy.slice(0, gcopy.length-g.length)

                g = g.slice(8+i.toString().length, g.length-4)
                g = g.split(", ")
                g = g.filter((el: string) => el !== "")

                for (let cn of g){
                    items.push({
                        cName: cn,
                        group: i,
                        //@ts-ignore
                        boss: raidName
                    })
                }
            }

            for (let i=0;i<items.length;i++){
                for (let player of p){
                    for (let ch of player.characters){
                        if (ch.name.toLowerCase() === items[i].cName) {
                            items[i].classType = (ch.class === "Paladin" || ch.class === "Bard" || ch.class === "Artist") ? 1 : 0
                            items[i].spec = ch.class
                            items[i].pName = player.name
                            items[i].ilvl = ch.ilvl
                        }
                    }
                }
            }

            result.push(items)
        }

        // const items = Object.entries(result[0])
        // const replacer = (key: any, value: any) => value === null ? '' : value // specify how you want to handle null values here
        // const header = Object.keys(items[0])
        // const csv = [
        //     header.join(','), // header row first
        //     ...items.map(row => header.map((fieldName: any) => JSON.stringify(row[fieldName], replacer)).join(','))
        // ].join('\r\n')
        //
        // console.log(csv)
        console.log(result)
    }, [])

    return (<Wrapper>
        {/*<NextPage onClick={() => setPage(page+limit)}>Next page</NextPage>*/}
        <LogsTable>
            <thead>
            <Row>
                <Header>Source</Header>
                <Header>Action</Header>
                <Header>Date</Header>
            </Row>
            </thead>
            <tbody>
            {logs.map((log: any) => <Row key={log.timestamp.seconds}>
                <Td>{log.player}</Td>
                <Td>{log.text}</Td>
                <Td>{log.timestamp.toDate().toLocaleTimeString()} {log.timestamp.toDate().toDateString()}</Td>
            </Row>)}
            </tbody>
        </LogsTable>
    </Wrapper>);
}

export default Logs