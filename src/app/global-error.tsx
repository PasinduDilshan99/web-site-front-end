'use client'

import { JSX } from "react"

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps): JSX.Element {
  return (
    <html lang="en">
      <body>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4">💥</h1>
            <h2 className="text-2xl font-semibold mb-4">Global Error</h2>
            <p className="mb-4">Something went very wrong with Felicita.</p>
            {process.env.NODE_ENV === 'development' && (
              <details className="mb-8 text-left bg-gray-800 p-4 rounded-lg max-w-md mx-auto">
                <summary className="cursor-pointer font-semibold text-red-400">Error Details</summary>
                <p className="mt-2 text-sm text-gray-300">{error.message}</p>
              </details>
            )}
            <button 
              onClick={() => reset()}
              className="bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all"
              type="button"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}