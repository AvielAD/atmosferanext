'use client'
import useSWR from "swr"
const fetcher = (url: string) => fetch(url).then(r => r.json())


const Page = () => {
    const { data: ServiciosData, error, mutate } = useSWR('/api/workline/servicios', fetcher)

    return (
        <>
            <h1>Caja</h1>



        </>
    )
}

export default Page