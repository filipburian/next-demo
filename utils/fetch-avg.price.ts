const dApiURL = process.env.NEXT_PUBLIC_MONGO_DAPI_URL;
const dApiKey = process.env.NEXT_PUBLIC_MONGO_DAPI_KEY;
const dApiCollection = process.env.NEXT_PUBLIC_MONGO_DAPI_COLLECTION;
const dApiDatabase = process.env.NEXT_PUBLIC_MONGO_DAPI_DB;
const dApiDataSource = process.env.NEXT_PUBLIC_MONGO_DAPI_DS;

const fetchAvgPrice = async ({ long, lat, radiusKm }: {long: number, lat: number, radiusKm: number}) => {
    const response = await fetch(
      dApiURL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key':
            dApiKey,
          Accept: 'application/json',
        },
        // !
        mode: 'no-cors',
        body: JSON.stringify({
          collection: dApiCollection,
          database: dApiDatabase,
          dataSource: dApiDataSource,
          pipeline: [
            {
              $match: {
                location: {
                  $geoWithin: {
                    $centerSphere: [[long, lat], radiusKm / 6378.1],
                  },
                },
              },
            },
            {
              $group: {
                _id: null,
                avg_price: {
                  $avg: '$price_native',
                },
              },
            },
            {
              $project: {
                _id: '$_id',
                avg_price: {
                  $round: ['$avg_price', 2],
                },
              },
            },
          ],
        }),
      },
    );
  
    return response.json();
  };
  