import React, {useEffect, useState, PureComponent} from "react";
import {getPlayers} from "../../firebase/utils";
import {db} from "../../firebase/init";
import {PlayersGrid, StatsGrid, Wrapper} from "./styles";
import {sortByName} from "../../utils/sortByName";
import Player from "./components/Player";
import {rawPlayerI} from "../../interfaces/rawPlayerI";
import {Pie, PieChart, ResponsiveContainer} from "recharts";
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
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                        <Pie data={stats.classDistribution} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
                        <Pie data={stats.specializationDistribution} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
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