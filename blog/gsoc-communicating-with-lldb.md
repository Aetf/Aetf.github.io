---
Title: "GSoC 2016: Communicating with LLDB"
Tags: [GSoC2016, c++, LLDB, KDE, KDevelop, OpenSource]
Date: Sat Apr 23 02:07:21 EDT 2016
Slug: gsoc-communicating-with-lldb
Status: draft
---

It has been a few weeks since the announcement of accepted projects. And I've been working on finding the most suitable solution to communicate with LLDB in KDevelop. In this article, I'd first give various choices to talk to LLDB, then evaluate these methods based on the current KDevelop debugger support and finally conclude with my final decision about which way to go.

### Available communication methods

As mentioned in my [proposal](gsoc-kdevelop-lldb-support), there are mainly three ways to talk to LLDB in a debug session.

- Use [GDB Machine Interface](https://sourceware.org/gdb/onlinedocs/gdb/GDB_002fMI.html#GDB_002fMI)
	* LLDB-MI implementation which exists in LLDB source tree
	* LLDBMI2, which is a third party implementation that has a simpler and smaller code base
- Use C++ interface directly

Yes, I meant the *GDB* Machine Interface, and here's a little background.

> MI is a line-based machine-oriented text interface to a debugger. The Gnu GDB debugger offers a reference implementation of MI emission. The MI interface is quickly becoming a de facto standard for integrating debuggers into a variety of environments.  *(From [Debugger Machine Interface Wiki](https://wiki.linuxfoundation.org/en/Debugger_Machine_Interface_(DMI))*


Being said that, the design decision about how we talk to LLDB is critical that affects the stability, maintainability and extensibility of the KDevelop debugger support. Thus it deserves careful assessment about the advantages and disadvantages.

### Advantages and disadvantages

Currently, KDevelop is using the MI to talk to GDB to provide debugging support in IDE. So one advantage using the same method talking to LLDB is that a large portion of code can be reused.

On the other hand, Neither choices (LLDB-MI, LLDBMI2) is a comprehensive nor complete implementation, which might lead to difficulties if we must use something not yet implemented.

Link directly to the C++ API avoids this problem completely, as it is the official API supported from the beginning. The drawback of direct linking is also non-negligible, however, as we can't easily protect ourselves from debugger crashes. This can be a problem, because one reason we are debugging a program is to find why it crashes, and it's un-rare to see the debugee also turns the debugger into a unstable state.

The following is a table summarizing the pros and cons of each choices.

Method | Advantages | Disadvantages
:---: | :---: | :---:
C++ API | Official support, Feature complete | Can't reuse code with GDB, Debugger crash also crashes the IDE
LLDB-MI | Official support, Code reuse with GDB | Feature incomplete, only support remote debugging
LLDBMI2 | Actively developed | Only works on OSX, only support local debugging