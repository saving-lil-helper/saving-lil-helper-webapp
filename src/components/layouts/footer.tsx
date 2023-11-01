import Link from 'next/link'
export default function Footer() {
  return (
    <footer className='border-t py-6 md:px-8 md:py-0'>
      <div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
        <p
          className={
            'text-center text-sm leading-loose text-muted-foreground md:text-left'
          }
        >
          built by{' '}
          <Link
            className={'font-medium underline underline-offset-4'}
            href={'mailto:niskan516.dev@gmail.com'}
            target={'_blank'}
            rel={'noreferrer'}
          >
            niskan516.dev
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}
