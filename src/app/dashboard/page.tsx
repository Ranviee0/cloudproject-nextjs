'use client'

import ProcessedImages from './images'; // Adjust the path if necessary
import Graph from './graph';
import Edit from './edit';

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'


export default function Page() {
  const searchParams = useSearchParams()
  const user = searchParams.get('user')

  if (!user) {
    return <h3>Error: No user provided in the URL</h3>;
  }

  return (
  <div>
    <Suspense>
    <h3>Username: {user}</h3>
    <Edit username={user}/>
    <Graph username={user}/>
    <ProcessedImages username={user}/>
    </Suspense>
  </div>)
}