import { startIndexer } from '@/app/indexer'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await startIndexer()
    return NextResponse.json({ status: 'Indexer started' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to start indexer' }, { status: 500 })
  }
}