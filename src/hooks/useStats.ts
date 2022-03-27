import { useEffect, useState } from 'react';
import { api } from '../api';

export const useStats = () => {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        api.get('stats').then(setStats);
    }, []);

    return stats;
};
