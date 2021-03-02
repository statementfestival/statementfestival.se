import { useState, useLayoutEffect } from 'react'
import nanoraf from 'nanoraf'

import { getScrollPosition, vh } from '../utils'

export const useProgress = () => {
  const [progress, setProgress] = useState(0)

  useLayoutEffect(() => {
    /**
     * Sets progress to a value between 0 and 1 depending on how far user
     * has scrolled
     */
    const handleScroll = nanoraf(() => {
      const total = window.document.documentElement.scrollHeight
      const { y } = getScrollPosition({ useWindow: true })
      const viewportHeight = vh()
      setProgress(y / (total - viewportHeight))
    })

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return [progress]
}
