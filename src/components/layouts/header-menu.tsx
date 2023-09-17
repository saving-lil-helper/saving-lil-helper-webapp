'use client'

import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

const navList = [
  {
    name: '定期存款',
    href: '/',
  },
  {
    name: '活期存款',
    href: '/demand-deposit',
    subMenu: [],
  },
]

export default function HeaderMenu() {
  return (
    <header
      className={
        'supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur'
      }
    >
      <div className={'container flex h-14 items-center'}>
        <NavigationMenu>
          <NavigationMenuList>
            {navList.map((navItem, navIdx) => {
              return (
                <NavigationMenuItem key={navIdx}>
                  <Link href={navItem.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {navItem.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}
