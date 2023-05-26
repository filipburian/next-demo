'use client';
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/map/Map.tsx"), { ssr:false, loading: () => <p>Loading...</p>, })
export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <div>
         <Map />
      </div>
    </main>
  )
}
