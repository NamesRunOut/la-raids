import React, {useEffect, useState} from "react";
import {db} from "../../firebase/init";
import {Header, LogsTable, Row, Td, Wrapper} from "./styles";
import {collection, Firestore, getDocs, limit, orderBy, query} from "firebase/firestore";

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