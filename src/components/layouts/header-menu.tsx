'use client'

import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import React, { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menu, Sun, Moon } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Image from 'next/image'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'

const navList = [
  {
    title: '定期存款',
    href: '/time-deposit',
  },
  {
    title: '活期存款',
    href: '/demand-deposit',
    subMenu: [
      {
        title: '渣打高息馬拉松活期存款',
        href: '/demand-deposit/sc',
        description: '活期存款預測表',
      },
      // {
      //   title: '信銀國際inMotion大富翁存款',
      //   href: '/demand-deposit/inmotion',
      //   description: '活期存款預測表',
      // },
    ],
  },
]

const APP_ICON = '/favicons/android-chrome-512x512.png'

export default function HeaderMenu() {
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()

  return (
    <header
      className={
        'supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur'
      }
    >
      <div className={'container flex h-14 items-center'}>
        <div className='mr-10 min-w-[135px]'>
          <Link
            className='flex items-center text-xl font-bold lg:text-2xl'
            href={'/'}
          >
            <Image
              src={APP_ICON}
              width={32}
              height={32}
              className='mr-2'
              alt='Logo'
            />{' '}
            {process.env.NEXT_PUBLIC_APP_NAME}
          </Link>
        </div>
        <NavigationMenu className={'hidden lg:flex '}>
          <NavigationMenuList>
            {navList.map((navItem, navIdx) => {
              return (
                <NavigationMenuItem key={navIdx}>
                  {navItem.subMenu ? (
                    <>
                      <NavigationMenuTrigger className='text-md font-bold'>
                        {navItem.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className='hidden w-[550px] gap-3 p-4 lg:grid lg:grid-cols-2'>
                          {navItem.subMenu.map((component, cIdx) => (
                            <ListItem
                              key={cIdx}
                              title={component.title}
                              href={component.href}
                            >
                              {component.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={navItem.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle({
                            className: 'text-md font-bold',
                          })
                        )}
                      >
                        {navItem.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>
        <div className={'flex flex-1 justify-end'}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                <span className='sr-only'>Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button className='lg:hidden' variant='ghost' size='icon'>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side={'left'}>
              <SheetHeader className='mb-6'>
                <SheetTitle>
                  <SheetClose asChild>
                    <Link className='flex items-center' href={'/'}>
                      <Image
                        className='mr-2'
                        src={APP_ICON}
                        width={32}
                        height={32}
                        alt='App Logo'
                      />
                      {process.env.NEXT_PUBLIC_APP_NAME}
                    </Link>
                  </SheetClose>
                </SheetTitle>
              </SheetHeader>
              <ScrollArea>
                <div className='flex flex-col items-start space-y-3'>
                  {navList.map((navItem) => {
                    return navItem.subMenu ? (
                      navItem.subMenu.map((subItem) => {
                        return (
                          <SheetClose key={subItem.href} asChild>
                            <Link className='w-full' href={subItem.href}>
                              {subItem.title}
                            </Link>
                          </SheetClose>
                        )
                      })
                    ) : (
                      <SheetClose key={navItem.href} asChild>
                        <Link className='w-full' href={navItem.href}>
                          {navItem.title}
                        </Link>
                      </SheetClose>
                    )
                  })}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className='text-md font-semibold leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
