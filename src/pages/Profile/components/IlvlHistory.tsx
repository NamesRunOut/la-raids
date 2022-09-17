import React, {useContext, useEffect, useState, PureComponent} from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import formatCharacterData from "../utils/formatCharacterData";
import {classData} from "../../../data/classData";
import { IlvlHistory } from "../styles";

const Profile:React.FC <{player: any, ilvlData: Array<any>}> = ({player, ilvlData}) => {

    return (
        <IlvlHistory>
            <div style={{ width: "100%", height: 400 }}>
                <ResponsiveContainer>
                    <LineChart
                        data={ilvlData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" style={{filter: `brightness(300%)`}} />
                        <XAxis dataKey="name" style={{filter: `brightness(300%)`}} />
                        <YAxis type="number" domain={['dataMin - 15', 'dataMax + 15']} style={{filter: `brightness(300%)`}} />
                        <Tooltip />
                        {/*@ts-ignore*/}
                        {player.characters.map((char: any) => <Line key={char.name} style={{filter: `brightness(300%)`}} type="monotone" strokeWidth={2} dataKey={char.name} stroke={classData[char.class].color} fill={classData[char.class].color} />)}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </IlvlHistory>
    )
}

export default Profile