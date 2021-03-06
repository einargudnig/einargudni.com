import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { USES } from '../data/usesData'
import UsesTech from '@/components/Uses'

export default function Uses() {
  return (
    <>
      <PageSEO
        title={`Uses - ${siteMetadata.author}`}
        description={`Uses - ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/uses`}
      />
      <div className="mb-4">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          What I use
        </h1>
        <div className="text-gray-500 dark:text-gray-400 mt-5">
          I've seen similar lists flying around and I like the idea.
          <br />
          This is also a nice way to see how my setup changes over time.
        </div>
        <div className="text-gray-500 dark:text-gray-400 mt-5 mb-3 text-xs">
          Note: This page contains affiliate links. If you click through and purchase, I may receive
          compensation for that purchase.
        </div>
        <span className="text-lg font-semibold mt-3">Software&nbsp;&&nbsp;gear</span>
        <div className="mt-3">
          {USES.map((d) => (
            <UsesTech key={d.name} name={d.name} description={d.description} link={d.link} />
          ))}
        </div>
        <div className="mt-3">
          <span className="text-sm">
            Note: this is since I started using wakatime in june 2021.
          </span>
          <figure>
            <embed
              className="w-3/5 h-3/5"
              src="https://wakatime.com/share/@082e14f7-c718-4327-85f4-28e803bdaa80/05162f53-5527-4b7d-979d-c8c3a56814df.svg"
            ></embed>
          </figure>
          <div className="pt-10">
            <span className="text-sm">
              I am planning on remaking this site in the future, so stay around to see what I come
              up with.
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
