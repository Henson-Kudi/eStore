import { dehydrate, DehydratedState, FetchQueryOptions, QueryClient, QueryFunction, QueryKey } from "@tanstack/react-query"


export async function dehydrateQuery<T = unknown>(options: FetchQueryOptions<T, Error, T, QueryKey, never>): Promise<DehydratedState | null> {
    const qc = new QueryClient()

    await qc.prefetchQuery(options)

    let dehydratedState: DehydratedState | null = null

    try {
        const state = dehydrate(qc)
        dehydratedState = JSON.parse(JSON.stringify(state))
    } catch (err) {
        console.log(err)
    }

    return dehydratedState

}