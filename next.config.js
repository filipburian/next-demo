/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const dApiURL = process.env.NEXT_PUBLIC_MONGO_DAPI_URL;

// const nextConfig = module.exports = () => {
//     const rewrites = () => {
//         return [
//             {
//                 source: "/result",
//                 destination: dApiURL,
//             },
//         ];
//     };
//     return {
//         rewrites,
//     };
// };
//
// module.exports = nextConfig
