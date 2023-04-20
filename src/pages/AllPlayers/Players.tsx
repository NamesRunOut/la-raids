import React, {useEffect, useState, PureComponent} from "react";
import {getPlayers} from "../../firebase/utils";
import {db} from "../../firebase/init";
import {PlayersGrid, StatsGrid, Wrapper} from "./styles";
import {sortByName} from "../../utils/sortByName";
import Player from "./components/Player";
import {rawPlayerI} from "../../interfaces/rawPlayerI";
import {Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import countStats from "./utils/countStats";
import {classfilter} from "../../styles/palette";

const Players = () => {
    const [players, setPlayers] = useState<Array<rawPlayerI>>([])
    const [stats, setStats] = useState<any>({
        classDistribution: [],
        specializationDistribution: [],
        ilvlDistribution: []
    })

    const SpecLabel: React.FC <{ cx: any, cy: any, midAngle: any, innerRadius: any, outerRadius: any, percent: any, index: any }> = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5 + 30;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill={stats.specializationDistribution[index].color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" style={{filter: classfilter, textShadow: "0px 2px 1px rgba(0, 0, 0, 0.69)"}}>
                {stats.specializationDistribution[index].name}
            </text>
        )
    }

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
                <ResponsiveContainer width={455} height={300}>
                <BarChart data={stats.classDistribution}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8">
                        {stats.classDistribution.map((el: any, i: number) => (<Cell key={i}  style={{filter: classfilter}} fill={el.color} />))}
                    </Bar>
                </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width={400} height={300}>
                    <PieChart>
                        <Tooltip />
                        <Pie data={stats.classDistribution} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" stroke="black">
                            {stats.classDistribution.map((el: any, i: number) => <Cell key={i} fill={el.color} style={{filter: classfilter}} />)}
                        </Pie>
                        <Pie data={stats.specializationDistribution} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label={SpecLabel} stroke="black">
                            {stats.specializationDistribution.map((el: any, i: number) => <Cell key={i} fill={el.color} style={{filter: classfilter}} />)}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <ResponsiveContainer width={400} height={300}>
                    <PieChart>
                        <Tooltip />
                        <Legend verticalAlign="top" height={30} />
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