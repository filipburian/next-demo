const dApiURL = process.env.NEXT_PUBLIC_MONGO_DAPI_URL;
const dApiKey = process.env.NEXT_PUBLIC_MONGO_DAPI_KEY;
const dApiCollection = process.env.NEXT_PUBLIC_MONGO_DAPI_COLLECTION;
const dApiDatabase = process.env.NEXT_PUBLIC_MONGO_DAPI_DB;
const dApiDataSource = process.env.NEXT_PUBLIC_MONGO_DAPI_DS;


export type Result = {
    avg_price: number;
}
export type Data = {
    documents: Result[];
}

export const fetchAvgPriceLocally = async ({ long, lat, radiusKm }: {long: number, lat: number, radiusKm: number}): Promise<Data> => {
    const response = await fetch(
        '/api/prices',
        {
            method: 'POST',
            body: JSON.stringify({
                data: { long, lat, radiusKm },
            }),
        },
    );

    return response.json();
};
