---
title: React Alicante 2023 day 2
slug: react-alicante-2
date: 2023-09-30
---

### Day two of React Alicante 2023

We go again!
This is the second day of the conference, the first day was great. Met a lot of great people, shout-out to Malik, Edward and Emil for the dinner.

::CaptionedImage{src="/images/blog/react-alicante/reactalicante.png" alt="React Alicante conference logo" width="542" height="201" caption="React Alicante 2023 Conference"}

Again, I will share my take aways below. These take aways are not a description of the talk, and some of them might even be from me mis-understading things.
So read them with a grain of salt.

Talks

### Server-side rendering react natively with reason

_Speaker: David Sancho_

Server-reason-react is an implementation of react-dom/server and some of React's internals in OCaml. Its purpose is to render HTML markup from the server for a Reason React application natively.

This talk provides an overview of some of the concepts of the library, what it means to render React in OCaml, how we use it at Ahrefs.com, a benchmark against a Node equivalent, and the future of all of this.

:::Callout{type="tip" title="Takeaway"}
Reason is strongly typed functional programming language. It's Immutable, fast
and has inferred types.
:::

### Bye-bye, weeds! Digital gardening with astro & mdx

_Speaker: Kathleen McMahon_

Has your once-thriving digital garden become overgrown with weeds? Has your framework of choice changed from a suite of landscaping tools to a warehouse of industrial farming equipment? What if you're three versions behind? Do you upgrade and continue with complexity, or choose a new stack that meets your static site needs?

This talk will teach you to weed out site complexity with Astro, SolidJS, and MDX. Pair this with accessibility best practices, and breathe new life into your digital garden.

:::Callout{type="tip" title="Takeaway"}
There is not always the need to do things in the complex way. Just keep it
simple! It can be hard to fo major version upgrades. So try to keep up to
date.
:::

### Rendering dilemma, Reacting to state change

_Speaker: Atile Fassina_

React has exploded in popularity thanks to the performance and unrivaled developer experience the virtual DOM and reconciliation could offer. But as our apps grew, we started pushing the boundaries of managing client state in a performant way. Recently Signals have caught attention and curious eyes of developers that wish by default fine-grained control of how their applications re-render based on user actions.

Let's have a look at the difference and how to achieve similar results with each paradigm.

:::Callout{type="tip" title="Takeaway"}
Signals handle data, not rendering.
Ensuring consistency can make the DOM slow.

We can't destructure in Solid -> Likely footgun for react developers.
:::

### Making state management intelligent

_Speaker: David Khoursid_

Managing state is complicated. Humans are even more complicated. As developers, it's our job to deliver seamless and intuitive user experiences, but the sheer complexity of human behavior and the real world can make this a daunting task. In this talk, we'll explore a radical new approach to app development where language models (LLMs) and reinforcement learning (RL) can be used to handle app logic in a more intelligent and human-centric way. We're bringing artificial intelligence to state management in ways that go much, much further than existing methods.

You will learn how you can leverage AI in your existing code to create the best UX possible, and peer into the future of AI and the path to AGI.

:::Callout{type="tip" title="Takeaway"}
His example was so cool! I had not thought about how much AI can help with
state machines.
:::

### Building machine learning models on the edge with React

_Speaker: Shivay Lamba_

Ever got frustrated typing the `as` prop in React components? How about this in combination with `forwardRef`? To put it short: It's not easy

Let's delve into strategies for constructing Compound Components, Polymorphic Components, and Components wrapped in forwardRef, while avoiding the use of type casts and ensure precise TypeScript typings.

:::Callout{type="tip" title="Takeaway"}
TensorFlow is a library that I want to try! It's nice to be able to use
machine learning only on the client side. Web workers are underused
:::

### Imperative vs Declerative, weathering the storm

_Speaker: Kyle Simpson_

You've no doubt heard the terms imperative and declarative before, and you probably know that developers strongly prefer the latter whenever possible. But just how clear are you on what these really mean, when it comes to writing lines of code in your app? Most of us probably just wing it or feel I know it when I see it. Debates have raged for decades on this topic.

In this talk, I'll drive straight into the eye of the storm and try to sift through what it all means for our apps. We'll look at how these concepts play out in a variety of webdev technologies, from HTML, to CSS, to JS, to (yes!) React... and more along the way. I hope you've brought your raincoat!

:::Callout{type="tip" title="Takeaway"}
Code is for human, not for computers, code must first be read before it can be
written, separation of concerns is a good thing, mental models need to be
simple.
:::
