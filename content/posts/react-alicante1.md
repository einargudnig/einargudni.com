---
title: React Alicante 2023 day 1
slug: react-alicante-1
date: 2023-09-29
---

### Day one of React Alicante 2023

Me and Ástráður my co-worker are on React Alicante, I'll add my own take aways from the talks and tell you more about this conference

::CaptionedImage{src="/images/blog/react-alicante/reactalicante.png" alt="React Alicante conference logo" width="542" height="201" caption="React Alicante 2023 Conference"}

### Venue

The conference took place at _Palacio de Congresso de Alicante_. It's nice venue, The chairs where nice and comfortable, the stage was big enough and the sound was good.

### Take aways

I'm going to add my take aways from the talks here, I'll try to keep it short and sweet. At times I forgot to write my take aways down, hence why there are not take aways from all the talks.
These take aways are not a description of the talk, and some of them might even be from me mis-understading things.
So read them with a grain of salt.

### React - The good parts

_Speaker: Tejas Kumar_

:::Callout{type="tip" title="Takeaway"}
React is and has fundamentally been a developer health tool. In this talk, we
will dive deep into some of the niceties React delivers for us with live code,
and understand why the common conventionality of React is to move closer to
server-side application.

React is not perfect, but the mental model for React is good, it's easy to understand and it's easy to get started with. All of the React frameworks have pros and cons.
:::

### SolidJS for react developers

_Speaker: Erik Rasmussen_

In 2023, Solid JS is poised to be the next big frontend framework. Its underlying fundamentals are fundamentally different from React's.

This talk will expose my learnings as I have approached Solid from the perspective of a React developer.

:::Callout{type="tip" title="Takeaway"}
Solid is very interesting!

Couple of take aways from this talk:

Signals are cool, signal values are getter functions, component function is **only called once**, you can only use the signal getters in the JSX.
:::

### Playing your tests wright

_Speaker: Debbie O'Brien_

It's time to play your tests wright. Let's take a look at how to write good tests and cover some of the best practices for testing, choosing the right locators and more.

Let's make testing easy and fun by generating tests on user actions.

Then lets explore some cool tips and tricks to help you write better tests.

:::Callout{type="tip" title="Takeaway"}
I think we will use Playwright to do our end-to-end testing. It looks like a great tool!

Testing best practices:

Write end to end tests, test closer to the user, use locators in Playwright, avoid testing 3rd party dependencies, use the codegen in Playwright
:::

### Building text containers in canvas

_Speaker: Aakansha Doshi_

Text Containers are one of the most widely used features when it comes to whiteboard, isn't it?

In my talk, we will be diving into how these text containers work under the hood in Canvas and I will also be sharing my experience building text containers in [excalidraw](https://excalidraw.com/)

A virtual free Open-Source collaborative end-to-end encrypted canvas based editor for sketching hand-drawn diagrams.

The textarea is inside the container in Excalidraw, hence why it can be moved around with its container.

:::Callout{type="tip" title="Takeaway"}
Word wrapping is hard.

Each element on the Canvas has a JSON where various attributes are stored, like the text, the position, the size, etc.
:::

Before the conference this was one of the talks that I was the most excited for. I use excalidraw quite a lot and I'm curious to know more about it.

### Pushing boundaries to the edge

_Speaker: Facundo Giuliani_

While the technology goes further and further, web development tries to get closer to the user. CDNs and web servers are evolving, and they now offer us the possibility to execute server-side logic without depending on a unique data center located in aspecific place in the world.

Let’s present the concept of The Edge. We will see how it works, and we’ll talk about Edge Functions. We’ll discuss why the main hosting providers are introducing this technology, and why different JavaScript frameworks are modeling their approaches based on Edge computing.

:::Callout{type="tip" title="Takeaway"}
The biggest take away here is that it matters a lot to have good talk. This
talk was great! Facundo had a great analogy to compare the Edge with
breweries. When you can connect easily to the audience the talk will sit
longer in their mind!
:::

### Practical guide to building accessible forms in React

_Speaker: Kateryna Porshnieva_

Web forms are crucial for user interaction on the web, and to ensure our products provide an inclusive experience for all, we need to build them with accessibility in mind. In this talk, we'll dive into best practices and practical tips for crafting accessible forms that won't leave anyone behind

We’ll start by diving into what accessibility is and how assistive technology works on the web. With this foundation, we’ll go through common patterns in forms and how to implement them accessibly.

We’ll talk about: labelling, providing instructions, errors and validation, testing, managing focus, and more – all backed by practical examples in React.

:::Callout{type="tip" title="Takeaway"}
Accessibility is important! And it's not that hard to get started with, but
note that it's also not black & white. Make sure you are honest and think
about the user.
:::
