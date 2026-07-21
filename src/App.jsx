import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { SiteLayout } from './layouts/SiteLayout'

const HomePage = lazy(() => import('./pages/HomePage'))

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<SiteLayout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<PageSkeleton />}>
                <PageTransition>
                  <HomePage />
                </PageTransition>
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-charcoal">
      <div className="container-premium grid min-h-screen place-items-center">
        <div className="glass-panel h-24 w-full max-w-md animate-pulse rounded-[2rem]" />
      </div>
    </div>
  )
}
