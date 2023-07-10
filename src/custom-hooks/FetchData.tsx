import { useState, useEffect } from 'react';
import { server_calls } from '../api/server';


export const useGetData = () => {
    const [ cragData, setData ] = useState<[]>([])

    async function handleDataFetch(){
        const result = await server_calls.get();
        setData(result)
    }

    useEffect( () => {
        handleDataFetch();
    }, [])

    return { cragData, getData:handleDataFetch}
}
