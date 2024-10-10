'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Caixa de Erro 404 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="bg-white text-gray-900 shadow-lg rounded-lg p-10 z-10 text-center max-w-md mx-auto"
      >
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <p className="text-lg mb-6">
          Oops! Parece que você se perdeu na pista.
        </p>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.2 }}
        >
          <Link href="/">
            <div className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
              Voltar para a Página Inicial
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
