---
title: barf
slug: barf
date: 2025-08-08
---

## Big Ass Refactoring

Large Language Models have kicked down the door in all our lives and they are
moving fast!

Every single week there is a new app, a new model or some new stuff built on it.
I have been trying to tag along and play around with it
as much as I can. I'm not a power user but I'll share some of the ways I've been
using those models to help me.

### Refactoring

I've been maintaining a software project for couple of years as a freelancer.
I took over the maintainance from some other guys who did great a job.

However I felt like I was somewhat stuck in place. Multiple packages had not
been updated for many years, some npm package not being maintained. I was in
this constant limbo of adding new features or should I try to update packages.

I tried a few times to update few packages and it worked,
but sooner or later I ran into dependency conflicts and bigger updates were
needed.

Here came a LLM to my rescue!

I could ask it to refactor the code for me, update the
packages and even write tests for it.

It was much quicker than doing it manually. I powered through the whole codebase
in couple of weeks.

I even managed to update build tool to vite after
updating all the packages.

This would have taken me months to do manually.

::CaptionedImage{src="/images/blog/barf/commits.png" alt="Refactor example showing commit history" width="521" height="200.5" caption="146 commits during the refactoring process"}

As you can see this, refactor was 146 commits, I commited every time I updated a
package or refactored a file.

::CaptionedImage{src="/images/blog/barf/files.png" alt="Statistics showing files refactored" width="521" height="200.5" caption="336 files were changed during the refactoring process"}

I changed 336 files. Some had minor changes, other major changes. Some of it was
a part of this new vite setup

::CaptionedImage{src="/images/blog/barf/numbers.png" alt="Statistics showing number of lines changed" width="521" height="200.5" caption="Significant reduction in lines of code after refactoring"}

As you can see, I managed to remove a lot of lines of code.

I think the biggest win was removing all use of styled
components and replaced it with Chakra UI. Chakra UI was already used widely in
the codebase so it made sense to use a single styling system.

These Large Language Models are great for tasks like this. I did not expect to
be so productive with this refactor.

There are multiple sources on what are good ways to leverage these models.

I simply gave it my package.json and asked for a todo list to upgrade packages
or find a replacement.

After that it was a quick feedback loop of telling it upgrade and test, see if
things worked, and if they did, commit to git 🤖
