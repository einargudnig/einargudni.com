---
title: Gigover landing page
slug: gigover
date: 2024-06-28
---

Last month I finished rebuilding the [Gigover](https://gigover.com/) landing page.

Like with most projects there comes a time when it needs to be updated.
I have worked as a free-lance developer for Gigover for a year and a half
and most spent most time on the system, so now it was time to give the landing
page some well-deserved love.

I got the design from a designer in a figma file and got to work.
The old page was written in Next.js and used styled components. The first step
was to update packages and versions.

I wanted to update the project and use Chakra-UI, since the system is using
that ui library. And I think it's good to have it be the same in both
projects.

My first instinct was to rewrite it from scratch. It's wasy, it's fun, and who
doesn't like starting a new shiny project. No old code, no need to refactor,
no need to updated packages, APIs or anything!

This is still a double-edged sword. The old webpage had been in produciton
since mid 2021 and to my best knowledge never had any problems.

The old version of the homepage used [styled component](https://styled-components.com/) but most of the
system it self uses [Chakra-UI](https://v2.chakra-ui.com/)I wanted to
make the styling consistent between projects. It's easier and quicker to jump
between projects when it uses the same technique.

One drawback is that Chakra-UI doesn't wokr well with Next.js
Chakra does not work with server components so instead of using Next.js only
with client components I decided to use [vite](https://vitejs.dev/) and react.

Since vite + react don't have built in routing like the app router in Next.js
I had to add in some routing capability.
I wanted to test [tanstack-router](https://tanstack.com/router/latest)
but refrained against it after some thought.

I wanted something well known, easy
to use, and something that had been around and will be around. I chose [react-router](https://reactrouter.com/en/main/start/overview)
and created a simple easy to use router.

I had to do some extra steps to make the react vite project perform similar for
SEO. Since a big reason for why I wanted to use Nextjs was improved SEO
I added [react-snap](https://github.com/stereobooster/react-snap)
to pre-render the SPA and help with SEO.

The new webpage looks well with the new design.

It's harder to read code than write it. So it was easier to start a new
project rather than updating a project that has not been updated in two
years.

I advise you to think twice before you decide to start a new project from
scratch. At least take things into consideration
