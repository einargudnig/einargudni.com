---
title: tmux
slug: tmux
date: 2024-10-11
---

## What is tmux?

tmux is a [terminal multiplexer.](https://en.wikipedia.org/wiki/Terminal_multiplexer)

It allows multiple terminal sessions to be accessed simultaneously with a single
window.

Conceptually it's pretty simple. You can have all your terminal work done in a
single 'window' and instead of having million tabs open in your terminal you
can scope your tasks to sessions. For example you could have one session for
all of your work tasks, another session for your personal projects, etc.

Or you can use tmux any other way you think it will help you.

You can detach from a session and it will still live on your machine until you
kill-it. So you can detach from a session with your development server running
and it's still running when you re-attach to the same session.

There are many people more knowledgeable and better to tell you about tmux than
me, here is some of the content that I used to get more familiar with it:

[tmux wiki](https://github.com/tmux/tmux/wiki)

[A quick and easy guide to tmux](https://hamvocke.com/blog/a-quick-and-easy-guide-to-tmux/)

[typecraft tmux for noobs](https://www.youtube.com/watch?v=niuOc02Rvrc\&t=394s)

I used this last one above to start setting up my tmux, I like it a lot.

### Why do I use tmux?

It fits my needs and makes my life less complicated. I have couple of
projects. Who doesn't.

For my full time work I have couple of terminal tabs open

:::StylishList
- website for foodies to order
- website for kitchens to receive orders
- backend to connect the stuff
- ad hoc stuff
:::

I have couple of tabs open for my Contract work

:::StylishList
- landing page
- web app
:::

And I also have couple of tabs open for my personal projects

For me personally I find it nice to have my terminal open in each of these
projects. So, one tab for the website for foodies to order, one tab for the
kitchen site, one tab for einargudni.com, etc, etc.

I find this is nice so I can quickly jump between tabs and I know that I'm in
the scope that I need.

Each tab is usually split into two parts, one where I have the server running,
if needed, and the other one to do various terminal things, open vs code in
said project, pull/push git, etc.

This became cumbersom when I had multiple tabs open in my Warp terminal, I
tried to add colors and organize them in a nice way. It was fine. But I
thought I could make it nicer.

I tried to have three warp windows, one for each part (daytime work,
contractor, personal projects).

I stumbled upon tmux at some point on youtube and instantly figured that this
could help me keep me subpar system, but make it easier to work with.

Here I can have only one terminal window, I used the opportunity to try out a
new terminal, went for wezterm, and use tmux to create three sessions. Each
session than accessible in whatever terminal I want to use.

I can easily switch between sessions and in the sessions I have opened tabs
for the projects I need I can easily context switch but still be in the scope
I want to.

::CaptionedImage{src="/images/blog/tmux/tmux.gif" alt="Animated GIF showing tmux in action" width="1042" height="401" caption="My tmux setup with multiple sessions and windows"}

Here is a small GIF of my tmux 'setup'. I have the three session named personal,
maul, and gigover. Each of these sessions has the window that I most use. I
don't want flood this post with images of my terminal 😅. I think the most value
is to look at how people use tmux, and how it can help you. I recomment this one
for example: [typecraft's forever dev environment](https://www.youtube.com/watch?v=_YaI2vDbk0o\&t=182s)

By slowly building your own tmux you can figure out a way how it can help your
daily life 🤝🏼

I have set my leader key to be Control + S, and all of the magic happens from
that. I can switch between panes, sessions and more.

::KeyboardShortcut{keys='["Ctrl","S"]' description="Leader key"}

Here is a link to my dotfiles for [tmux](https://github.com/einargudnig/dotfiles/blob/master/.tmux.conf)

### tmux and neovim

I have wanted to use neovim for quite some time now. Not for any particular
reason other than it's so impressive to see the guys who are efficient at
using it, but also the options of tinkering your own neovim setup is endless.

I set up tmux config using neovim and later decided to build a neovim setup
from this series: [typecraft again](https://www.youtube.com/watch?v=zHTeCSVAFNY\&list=PLsz00TDipIffreIaUNk64KxTIkQaGguqn) and I think it helped me a lot.

I got familiar with the vim key bindings, even added them to tmux, so when I'm
using tmux I'm also exposed to the key bindings.

If you have no prior exposure to neovim I would say that this way, in building
up your own configuration is a good one. You go from literally zero and over
time you get to know various parts of the editor that suit you and not.

I have used my setup in my personal projects for couple of weeks and I have
noticed some improvments that I can make. I'll find some time in the near
future and tinker more.

It was such a joy setting up tmux and neovim,
I will hopefully have started to use neovim as my main editor in a half year or so!
