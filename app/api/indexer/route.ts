import { startIndexer, stopIndexer, checkIndexerStatus } from '@/app/indexer'
import { NextResponse } from 'next/server'

// Iniciar el indexador
export async function GET() {
  try {
    const status = await checkIndexerStatus()
    if (status === 'running') {
      return NextResponse.json({ status: 'Indexer is already running' }, { status: 200 })
    }

    await startIndexer()
    return NextResponse.json({ status: 'Indexer started successfully' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: `Failed to start indexer: ${error}` }, { status: 500 })
  }
}

// Verificar el estado del indexador
export async function POST() {
  try {
    const status = await checkIndexerStatus()
    return NextResponse.json({ status }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch indexer status' }, { status: 500 })
  }
}

// Detener el indexador
export async function DELETE() {
  try {

    await stopIndexer()
    return NextResponse.json({ status: 'Indexer stopped successfully' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: `Failed to stop indexer: ${error}` }, { status: 500 })
  }
}
