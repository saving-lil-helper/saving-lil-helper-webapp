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
import React from 'react'
import { cn } from '@/lib/utils'

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
      {
        title: '信銀國際inMotion大富翁存款',
        href: '/demand-deposit/inmotion',
        description: '活期存款預測表',
      },
    ],
  },
]

export default function HeaderMenu() {
  return (
    <header
      className={
        'supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur'
      }
    >
      <div className={'container flex h-14 items-center '}>
        <div className='mr-10'>
          <Link
            className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-2xl font-bold text-transparent'
            href={'/'}
          >
            {process.env.NEXT_PUBLIC_APP_NAME}
          </Link>
        </div>
        <NavigationMenu>
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
                        <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
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