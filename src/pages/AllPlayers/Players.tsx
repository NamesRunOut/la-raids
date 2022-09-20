import React, {useEffect, useState, PureComponent} from "react";
import {getPlayers} from "../../firebase/utils";
import {db} from "../../firebase/init";
import {PlayersGrid, StatsGrid, Wrapper} from "./styles";
import {sortByName} from "../../utils/sortByName";
import Player from "./components/Player";
import {rawPlayerI} from "../../interfaces/rawPlayerI";
import {Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import countStats from "./utils/countStats";

const Players = () => {
    const [players, setPlayers] = useState<Array<rawPlayerI>>([])
    const [stats, setStats] = useState<any>({
        classDistribution: [],
        specializationDistribution: [],
        ilvlDistribution: []
    })

    useEffect(() => {
        getPlayers(db)
            .then(r => {
                // @ts-ignore
                setPlayers(r.sort(sortByName))

                let stats = countStats(r)
                setStats({
                    classDistribution: stats.classDistribution,
                    specializationDistribution: stats.specializationDistribution,
                    ilvlDistribution: stats.ilvlDistribution
                })
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Wrapper>
            <StatsGrid>
                <BarChart width={500} height={250} data={stats.classDistribution}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>

                <ResponsiveContainer width={400} height={300}>
                    <PieChart width={400} height={300}>
                        <Tooltip />
                        <Pie data={stats.classDistribution} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" stroke="black">
                            {stats.classDistribution.map((el: any, i: number) => <Cell key={i} fill={el.color} style={{filter: "brightness(2.69) grayscale(0.5)"}} />)}
                        </Pie>
                        <Pie data={stats.specializationDistribution} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label stroke="black">
                            {stats.specializationDistribution.map((el: any, i: number) => <Cell key={i} fill={el.color} style={{filter: "brightness(2.69) grayscale(0.5)"}} />)}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <ResponsiveContainer width={400} height={300}>
                    <PieChart width={400} height={300}>
                        <Tooltip />
                        <Legend verticalAlign="top" height={30}/>
                        <Pie data={stats.ilvlDistribution} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label labelLine={false} stroke="black">
                            {stats.ilvlDistribution.map((el: any, i: number) => <Cell key={i} fill={el.color}/>)}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </StatsGrid>

            <PlayersGrid>
                {players.map(player => <Player key={player.name} player={player}/>)}
            </PlayersGrid>
        </Wrapper>
    );
}

export default Players