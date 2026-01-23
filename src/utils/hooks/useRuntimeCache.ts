import { useState } from 'react';

const useRuntimeCache = <T extends object>(cacheKey: string, cacheLimit = 20) => {
    const [cache, setCache] = useState<Map<string, T>>(new Map());

    const setCurrentCacheSlice = (newCacheSlice: T) => {
        setCache((prevState) => {
            const lastPrevStateKeys = [...prevState.keys()].slice(-cacheLimit + 1);
            const newCache = new Map<string, T>();

            for (const key of lastPrevStateKeys) {
                const prevData = prevState.get(key);

                if (prevData && key !== cacheKey) {
                    newCache.set(key, prevData);
                }
            }

            newCache.set(cacheKey, {
                ...(prevState.get(cacheKey) || {}),
                ...newCacheSlice,
            });

            return newCache;
        });
    };

    const invalidateCache = () => {
        setCache((prevState) => {
            const lastPrevStateKeys = prevState.keys();
            const newCache = new Map();

            for (const key of lastPrevStateKeys) {
                if (key !== cacheKey) {
                    newCache.set(key, prevState.get(key));
                }
            }

            return newCache;
        });
    };
    return { cacheSlice: cache.get(cacheKey) || null, setCache: setCurrentCacheSlice, invalidateCache };
};

export default useRuntimeCache;
