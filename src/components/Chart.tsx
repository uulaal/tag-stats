import React, { useEffect, useRef } from 'react';
import * as LovelyChart from '../lib/lovely-chart/LovelyChart';

interface Props {
    data: any;
}

export const Chart: React.FC<Props> = ({ data }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current?.innerHTML) ref.current.innerHTML = '';
        LovelyChart.create(ref.current, data);
    }, [data]);

    return <div ref={ref} />;
};
