---
title: "GSoC 2016: Communicating with LLDB"
tags: [GSoC2016, c++, LLDB, KDE, KDevelop, OpenSource]
date: Tue May 17 12:17:38 EDT 2016
updated: 2016-08-03T08:04:49-04:00
---

It has been a few weeks since the announcement of accepted projects. And I've been working on finding the most suitable solution to communicate with LLDB in KDevelop. In this article, I'd first give various choices to talk to LLDB, then evaluate these methods based on the current KDevelop debugger support and finally conclude with my final decision about which way to go.

### Available communication methods

As mentioned in my {% post_link gsoc-kdevelop-lldb-support proposal %}, there are mainly three ways to talk to LLDB in a debug session.

- Use [GDB Machine Interface](https://sourceware.org/gdb/onlinedocs/gdb/GDB_002fMI.html#GDB_002fMI)
	* LLDB-MI implementation which exists in LLDB source tree
	* LLDBMI2, which is a third party implementation that has a simpler and smaller code base
- Use C++ interface directly

Yes, I meant the *GDB* Machine Interface, and here's a little background.

> MI is a line-based machine-oriented text interface to a debugger. The Gnu GDB debugger offers a reference implementation of MI emission. The MI interface is quickly becoming a de facto standard for integrating debuggers into a variety of environments.  *(From Debugger Machine Interface Wiki)*

Being said that, the design decision about how we talk to LLDB is critical that affects the stability, maintainability and extensibility of the KDevelop debugger support. Thus it deserves careful assessment about the advantages and disadvantages.

### Advantages and disadvantages

Currently, KDevelop is using the MI to talk to GDB to provide debugging support in IDE. So using the same MI method talking to LLDB has the advantage of large percentage of code reusing.

On the other hand, Neither choices (LLDB-MI, LLDBMI2) is a comprehensive nor complete implementation, which might lead to difficulties if we must use something not yet implemented.

Linking directly to the C++ API avoids this problem completely, as it is the official API supported from the beginning. The drawback of direct linking is also non-negligible, however, as we can't easily protect ourselves from debugger crashes. This can be a problem, because one reason we are debugging a program is to find why it crashes, and it's not rare to see the debugee also turns the debugger into a unstable state.

The following table summarizes the pros and cons of each choices.

Method | Advantages | Disadvantages
:---: | :---: | :---:
C++ API | Official support, Feature complete | Can't reuse code with GDB, Debugger crash also crashes the IDE
LLDB-MI | Official support, Code reuse with GDB | Feature incomplete, only support remote debugging
LLDBMI2 | Actively developed | Only works on OSX, only support local debugging


Let's talk about each of these. For the C++ API, it's the most promising one if we can somehow figure out how to do crash protection. The problem with that is, the most reliable way to protect ourselves is to move the library out-of-process. That is exactly what the Machine Interface does, and I don't feel like reinventing the wheel.

The biggest issue with LLDB-MI is that only basic MI commands are implemented. However, the MI specification accepts arbitrary normal user commands to address this problem and fortunately LLDB-MI supports this feature. Except for the incomplete feature, LLDB-MI only supports remote debugging. For those not familiar with remote debugging,

> Remote debugging refers to the act of debugging a process which is running on a different system, than the debugger itself. We shall refer to the system running the debugger as the local system, while the system running the debugged process will be the remote system.  *(From [Remote debugging with LLDB](http://lldb.llvm.org/remote.html))*

While this sounds like a serious problem, it isn't. Because **LLDB on Linux and OSX uses the remote debugging stub even when debugging a process locally**.
The support for Windows is unclear though. And I don't know whether it's easy or not to launch a remote debugging session on Windows.

The actively developed LLDBMI2 is a third party implementation of the MI specification, while it seems promising, the hard limitation of only support OSX makes it not suitable for a cross-platform IDE like KDevelop.

### Final decision
All these three methods talking to LLDB have their own pros and cons. However the LLDB-MI implementation seems providing most benefits while there are solutions to its short comes. Thus I'll go with the LLDB-MI. As this blog is written, I already have a preliminary implementation of LLDB-MI parser, which shares a large portion of code with the existing GDB/MI parser. There are issues though, as the LLDB-MI doesn't correctly output debugger output using stream. But I'm working on it and should be able to solve these later.

That all about it. I'll keep you posted once I have something working and see you next time!