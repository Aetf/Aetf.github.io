---
title: "GSoC 2016: Mid-term Evaluation"
tags: [GSoC2016, KDE, OpenSource]
---

Time ticks away really fast if you keep yourself busy. I always thought there
are planty of time for GSoC, but now half of it has already passed. With my university research, I'm actually more occupied and productive than I was in the last semester :P

## Code, and more code

Lots of code, that's what GSoC means, at least in my opinion. That's exactly something I love. From time to time, I just feel like writing some code, for a somewhat big project, for something useful.

So that I can dig into the large code base, figuring out the relationships among classes, and then learn about the differences between the current design and the one I would architect, were I making the decision. This is definitely something I'm eager to experience.

In addition, the version history itself would tell good stories. Tracking down one particular file and seeing it evolves over the years, you'll be surprised to find out that the code isn't static anymore and there're others' efforts behind the scene continuously improving it, especially when reading through commit logs.

That's the amazing feeling GSoC gives me, plus the additional benefit to contribute to the open source community.

## Community, and more communication

While I did submit a few patches to open source projects previously, I never deeply involved in any related communities, just floated around and feeling afraid of talking to others. With GSoC, one is forced to interact with the community and get more involved. The best part of this is that I don't fear talking to the public anymore, and only then did I meet many nice people.

My mentor Aleix has been so patient and kindly reviewed my sometimes large RR. When my commit broke the master branch, René and Kevin helped me debug and fix the issue. Big thanks to all of you!

Only when you are actually participate in the workflow, could you begin to know how it's different from what you have learnt from textbook. The way working with the community is really a valuable experience for my study and work.

The most challenging part of communicating with others is that, as a non-native English speaker, it takes time to be familiar with and accustomed to various conventions used in communication, like mailing list, IRC and review boards. And I have to double check every time to make sure I'm using appropriate words and being polite. However, this is also a great practice for me to learn English. After all, you can only learn a language by using it.

## Test, with more coverage
Enough words about non technical things. I really had a hard time coming up this many words. Let's talk about something _technical_.

Unit testing, this is what I'm doing for a week or so. The basic infrastructure for lldb plugin was finished a few weeks ago, and I'm in a stage fixing various failing parts due to lldb-mi not conforming to the specification. There are some commands not implemented, and some others incorrectly implemented. I have to find ways to workaround these before it's in a good shape to have a UI, not too far away though.

There are about two months left as the second-half of summer. And it's good to know I'm not running late too much behind my initial schedule XD. Will keep working anyway. Let's enjoy the summer and coding!
