"use client"
import { trpc } from "~/trpc/client"

export default function Home() {

  const { data } = trpc.chaicode.useQuery({ email: 'p@a.com', name: 'prathamesh' })
  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl">TRPC-monorepo-project</h1>
        <h2>Server Status: {data?.message} </h2>
      </div>
    </main>
  );
}
