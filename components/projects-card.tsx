"use client"
import Link from 'next/link'
import { FolderIcon, ExternalIcon, GitHubIconOutline } from '../components/icons'


interface CardProps {
  title: string
  description: string
  imgSrc: string
  href: string
  github: string
  tech1: string
  tech2: string
  tech3: string
}

export default function ProjectsCard({ title, description, imgSrc, href, github, tech1, tech2, tech3 }: CardProps) {
  return (
    <div className="p-4 md:w-1/2 md" style={{ maxWidth: '544px' }}>
      <div className="h-full overflow-hidden border border-neutral-500 rounded-md border-opacity-60 dark:border-neutral-400">
        <div className="p-6">
          <div className="flex flex-row justify-between items-center">
            <div className="my-2 hover:dark:text-neutral-900">
              <FolderIcon />
            </div>
            <div className="flex flex-row justify-between">
              <div className="mx-1">
                {href ? <Link href={href}><ExternalIcon /></Link> : null}
              </div>
              <div className="mx-1">
                {github ? <Link href={href}><GitHubIconOutline /></Link> : null}
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-500 dark:text-neutral-400">{title}</h2>

          <p className="prose max-w-none mb-3 text-neutral-500 dark:text-neutral-300">{description}</p>
          <div className="flex flex-row justify-between">
            <div className="text-neutral-400 text-sm font-extralight">
              {tech1} &#8226; {tech2} &#8226; {tech3}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
