'use client'
import { useState } from 'react'
import { FaPlay, FaStop, FaSpinner } from 'react-icons/fa'

export default function Home() {
  const [status, setStatus] = useState('Idle')
  const [loading, setLoading] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  const startIndexer = () => {
    if (isRunning) {
      setStatus('Indexer already running...');
      return;
    }

    setStatus('Starting...')
    setIsRunning(true)  // Marcamos que el indexer está corriendo

    // Realizamos la petición sin await, usando then para manejar la respuesta
    fetch('/api/indexer', { method: 'GET' })
      .then(res => {
        if (res.ok) {
          setStatus('Indexer started...')
          setLoading(false)

          // Polling para obtener el estado
          pollIndexerStatus()
        } else {
          setStatus('Error: ' + 'Unknown error')
          setLoading(false)
          setIsRunning(false)
        }
      })
      .catch(error => {
        setStatus('Failed to start indexer')
        setIsRunning(false)
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
        setLoading(false)
      })
  }

  const stopIndexer = () => {

    setLoading(true)
    setStatus('Stopping...')
    setIsRunning(false)
    // Realizamos la petición sin await, usando then para manejar la respuesta
    fetch('/api/indexer', { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'stopped') {
          setStatus('Indexer stopped')
          setIsRunning(false)
        } else {
          setStatus('Error: ' + (data.error || 'Unknown error'))
        }
      })
      .catch(error => {
        setStatus('Failed to stop indexer')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const pollIndexerStatus = () => {
    const interval = setInterval(() => {
      if (!isRunning) {
        clearInterval(interval);
        return;
      }

      // Realizamos la petición sin await, usando then para manejar la respuesta
      fetch('/api/indexer/status', { method: 'GET' })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'running') {
            setStatus('Indexer is running...')
            
          } else if (data.status === 'stopped') {
            setStatus('Indexer stopped')
            setIsRunning(false)
            clearInterval(interval)
          }
        })
        .catch(error => {
          setStatus('Failed to get indexer status')
          setIsRunning(false)

        })
    }, 2000)  // Polling cada 2 segundos
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900 p-8">
      <div className="bg-gray-800 text-white shadow-lg rounded-2xl p-12 max-w-lg w-full">
        <h1 className="text-3xl font-semibold mb-8 text-center">Supra Chain Indexer</h1>

        <div className="flex justify-center gap-8 mb-6">
          <button 
            onClick={startIndexer}
            className={`py-4 px-8 rounded-lg text-lg font-medium transition-all duration-200 ${
              loading || isRunning ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800'
            }`}
          >
            {loading ? (
              <FaSpinner className="animate-spin mr-2 inline" />
            ) : (
              <FaPlay className="mr-2 inline" />
            )}
            {loading ? 'Starting...' : 'Start'}
          </button>

          <button 
            onClick={stopIndexer}
            className={`py-4 px-8 rounded-lg text-lg font-medium transition-all duration-200 ${
              loading || !isRunning ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-700 hover:bg-red-800'
            }`}
          >
            {loading ? (
              <FaSpinner className="animate-spin mr-2 inline" />
            ) : (
              <FaStop className="mr-2 inline" />
            )}
            {loading ? 'Stopping...' : 'Stop'}
          </button>
        </div>

        <div className="mt-6 text-lg font-medium">
          <span className={`py-2 px-6 rounded-full inline-block w-full text-center ${
            status.includes('Failed') ? 'bg-red-600' :
            status.includes('Stopping') ? 'bg-yellow-600' :
            status.includes('Starting') ? 'bg-blue-600' :
            status.includes('running') ? 'bg-green-600' :
            'bg-gray-600'
          }`}>
            {status || 'Idle'}
          </span>
        </div>
      </div>
    </main>
  )
}
