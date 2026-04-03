import { useState } from 'react';

const useLinkRoute = (initial: { path: string; label: string }[] = [], homeLabel = 'Головна') => {
    const [route, setRoute] = useState([{ path: '/', label: homeLabel }, ...initial]);

    const addLink = (link: { path: string; label: string }) => {
        setRoute((prevState) => {
            return [...prevState, link];
        });
    };

    return { addLink, route };
};

export default useLinkRoute;
