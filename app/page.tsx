'use client'
import { useState } from 'react'
import prisma from '@/lib/prismadb'

export default function Home() {
  const [status, setStatus] = useState('')

  const startIndexer = async () => {
    try {
      const res = await fetch('/api/indexer')
      const data = await res.json()
      setStatus(data.status)
    } catch (error) {
      setStatus('Failed to start indexer')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Indexer Status</h1>
      <button 
        onClick={startIndexer}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Start Indexer
      </button>
      <div>Status: {status}</div>
    </main>
  )
}
