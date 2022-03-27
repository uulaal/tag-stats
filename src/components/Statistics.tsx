import React, { useMemo } from 'react';
import { Chart } from './Chart';
import { useStats } from '../hooks/useStats';

const graphTitles = {
    growthGraph: 'ChannelStats.Graph.Growth',
    followersGraph: 'ChannelStats.Graph.Followers',
    muteGraph: 'ChannelStats.Graph.Notifications',
    topHoursGraph: 'ChannelStats.Graph.ViewsByHours',
    viewsBySourceGraph: 'ChannelStats.Graph.ViewsBySource',
    newFollowersBySourceGraph: 'ChannelStats.Graph.NewFollowersBySource',
    languagesGraph: 'ChannelStats.Graph.Language',
    interactionsGraph: 'ChannelStats.Graph.Interactions'
};
const graphs = Object.keys(graphTitles);

export const Statistics: React.FC = (props) => {
    const stats = useStats();
    const charts = useMemo(() => {
        if (!stats) return [];

        const allCharts = graphs.map((name) => {
            const graph = stats[name];
            const isAsync = typeof graph === 'string';

            if (!graph || isAsync) {
                return;
            }

            const { zoomToken } = graph;

            return {
                title: graphTitles[name as keyof typeof graphTitles].split('.').at(-1),
                ...(zoomToken && {
                    // onZoom: (x: number) => callApi('fetchStatisticsAsyncGraph', { token: zoomToken, x, dcId }),
                    zoomOutLabel: 'Zoom out'
                }),
                ...graph
            };
        });

        return allCharts.filter(Boolean);
    }, [stats]);

    return (
        <>
            {charts.map((chart) => (
                <div key={chart.title}>
                    <Chart data={chart} />
                    <br />
                </div>
            ))}
        </>
    );
};
