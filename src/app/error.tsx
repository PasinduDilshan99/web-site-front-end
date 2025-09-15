'use client'

import Link from "next/link"
import { JSX } from "react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 mb-4">
          Oops!
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-4">An error occurred in Felicita. Please try again.</p>
        {process.env.NODE_ENV === 'development' && (
          <details className="mb-8 text-left bg-gray-100 p-4 rounded-lg max-w-md mx-auto">
            <summary className="cursor-pointer font-semibold text-red-600">Error Details</summary>
            <p className="mt-2 text-sm text-gray-700">{error.message}</p>
          </details>
        )}
        <div className="space-x-4">
          <button 
            onClick={() => reset()}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
            type="button"
          >
            Try Again
          </button>
          <Link 
            href="/" 
            className="inline-block bg-gray-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}