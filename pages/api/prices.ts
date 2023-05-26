import {fetchAvgPrice} from "@/utils/fetch-avg.price";

export default async function handler(req: any, res: any) {
    const body = JSON.parse(req.body)

    const prices = await fetchAvgPrice(body.data);

    res.status(200).json(prices);
}