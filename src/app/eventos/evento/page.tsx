'use client'
import useSWR from "swr"
const fetcher = (url: string) => fetch(url).then(res => res.json())


const Evento = () => {
    const { data, error } = useSWR('/api/user', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    console.log(data)
    return (<>
        <div>
            prueba eventos
        </div>
    </>)
}

export default Evento