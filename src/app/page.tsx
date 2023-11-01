import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME as string

export const metadata = {
  title: `主頁 ｜ ${APP_NAME}`,
}

export default function Home() {
  return (
    <div className='flex w-full flex-col space-y-5 p-6 lg:flex-row lg:space-x-5 lg:space-y-0'>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>定期存款計數機</CardTitle>
          <CardDescription>
            定期存款計數機是一個幫助你計算定期存款的利息的工具，你可以在此計算定期存款的利息。
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className='font-semibold' asChild>
            <Link href='/time-deposit'>進入</Link>
          </Button>
        </CardFooter>
      </Card>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>活期存款計數機</CardTitle>
          <CardDescription>
            活期存款計數機是一個幫助你計算活期存款的利息的工具，你可以在此計算活期存款的利息。
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className='font-semibold' asChild>
            <Link href='/demand-deposit/sc'>進入</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
