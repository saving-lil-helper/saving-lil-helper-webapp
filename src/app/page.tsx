'use client'

import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

export default function Home() {
  const { setTheme } = useTheme()

  return (
    <div>
      <Button onClick={() => setTheme('light')}>Click me</Button>
    </div>
  )
}
