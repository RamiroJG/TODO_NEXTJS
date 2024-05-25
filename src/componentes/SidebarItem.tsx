'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CiBookmarkCheck } from 'react-icons/ci'

interface Props{
    icon: React.ReactNode,
    title: string,
    path: string
}

const SidebarItem = ({ icon, title, path }: Props) => {

    const pathName = usePathname()

    return (
        <>
            <li>
                <a href={path} className={`px-4 py-3 flex items-center space-x-4 rounded-md group hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white ${path === pathName ? 'bg-gradient-to-r from-sky-600 to-cyan-400 text-white' : ''}`}>
                    {icon}
                    <span className="group-hover:text-white-700">{title}</span>
                </a>
            </li>
        </>
    )
}

export default SidebarItem