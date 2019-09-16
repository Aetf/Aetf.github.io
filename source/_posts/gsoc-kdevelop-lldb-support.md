---
title: "GSoC 2016: LLDB Support for KDevelop"
tags: [GSoC2016, c++, LLDB, KDE, KDevelop, OpenSource]
date: Sat Apr 23 02:07:21 EDT 2016
updated: 2016-12-15T01:51:47-05:00
---

I've always wanted to participate in the [Google Code of Summer](http://summerofcode.withgoogle.com/). It's cool and an super legitimate experience to put on CV, isn't it? Anyway, what's more exciting is that my first time proposal was accepted!

So I think it might be a good chance to also post this on the blog, which may probably keeps me writing more things and make the blog more... I mean, make it less like unmaintained XD

The big plan is, writing a series of articles as the project goes on and making them kind of status updates. Let see how far I can go though :P

## Introduction
Enabling KDevelop to use LLDB as a debugging backend, which would be especially useful on Max OS X and Windows, where gdb support is rather scarce, and it can also help people that want to switch to lldb on linux (like me!) by adding decent IDE support.

## Project Goals
LLDB support in similar feature-completeness as current GDB support. The user should be able to select what debugger to use intuitively on a per launch configuration base. The following function should be supported.

- Debug session management: begin, kill, restart
- Set breakpoints
    * breakpoint list
    * enable/disable breakpoints
    * conditional breakpoints
- Information inspection
    * Frame Stack: threads, call stack
    * Local variables
    * Symbol info when hovering mouse over the symbol
    * Disassembler
    * Register
- Debug commands: next, step, jump, run to the end of function, arbitrary lldb command
- Attach to a running process
- Examine core file
- Remote debug
- Drkonqi support

## Implementation
The whole work can be broken down to three major parts.

- __Communication with LLDB__: Implement a wrapper class that hides all hassles communicating with LLDB and provide a consistent api that is agnostic to specific communication methods, be it inter-processes or direct library link.
- __LLDB Specific Classes__: Implementation of LLDB specific controllers and manager classes. This includes `DebugSession` and friends, `*Controller` classes and config page factories. This part is higher level than the first one, but still remains LLDB specific, thus must be implemented separately from GDB variants.
- __UI and Other__: Hook the UI with the LLDB backend built from the above two parts. This part has the potential to share a large amount of code with GDB. However, currently all UI widgets are bounded to GDB backend. Thus refactors on these classes are needed to split common code out.

### Relation with current GDB Plugin
Right now the debugger code in kdevplatform only provides very basic facilities to build a debug plugin. Most heavey works are still done in `GDBDebugger::CppDebuggerPlugin`. An investigation into the code shows that there are planty part of code that is debugger backend agnostic, and could be reused by LLDB plugin.

The ideal/desired design would be extract all debugger backend agnostic into kdevplatform and let GDB and LLDB plugin built on top of that. But we risk breaking the existing GDB plugin which already does a good job. Therefore, I plan to first focus on implementation of LLDB plugin with a copy of all needed classes in kdevplatform, and only after the LLDB plugin reaches a rather mature state, shall we begin port GDB to use the new infrastructure.

### Communication with LLDB
This can be done by expose a interface class with all available lldb commands and internally delegate the command execution to one of the LLDB interface mentioned below. Other parts of the LLDB debugger plugin will rely solely on the interface class to post lldb commands/jobs. This design is similar to what is used in `GDBDebugger::CppDebuggerPlugin`. This is the foundation of all other parts of the plugin, so I plan to make this part solid by my best effect before moving on to the next part.

#### Possible LLDB Interface to Use
LLDB released LLDB-MI on 2014, and there is another project LLDBMI2 that does the same thing. Along with those, there is the good old C++ API. Further investigation and evaluation is needed to finally determine on which one to use. Here just list a brief description of each choise.

- [LLDB-MI](https://www.codeplay.com/portal/lldb-mi-driver---part-1-introduction)
    * Included in the LLDB source code, which means better support
    * A good separation of input/factory/output
    * Seems only support remote debugging
    * Limited command implemented at the time of the blog written (might have been changed since then)
- [LLDBMI2](https://github.com/freedib/lldbmi2)
    * Seems to be a simple MI interface to LLDB, which is more lightweight than LLDB-MI
    * Not official but actively maintained
    * Only support local debugging and only support Mac OS X
- [C++ API](https://lldb.llvm.org/cpp_reference/index.html)
    * Directly link to LLDB, which should be fast and the API is mature
    * Must find a way to protect ourselves from debugger crashes
    * Write from scratch, can't reuse MI code for GDB

### Implement LLDB Specific Classes
These classes is higher level than the above, and is the major classes that teach KDevelop how to use LLDB to debug.

`IDebugSession` represents a specific debug session with a debugger of some type. Currently GDBDebugger provides an implementation `DebugSession`, but it contains GDB specific code. The same applies to other classes such as `BreakpointController` and `FrameStackModel`.

LLDB of course should be configured differently than GDB. Currently, the user can tune various options for GDB in the launcher configuration page. This should be extended to let the user change the debugger used for a particular debug launcher and configure separately.

Here is a brief list of related classes

- DebugSession
    + BreakpointController
    + VariableController
    + FrameStackModel
- ConfigPageFactory
- Launcher and jobs
    + DebugJob

### Move non GDB Specific Classes to KDevPlatform
As said above, the GDBDebugger plugin contains many non GDB specific code. Rather than rewrite the same thing for LLDB debugger plugin, I plan to reuse these code as much as possible. This includes UI widgets for different tool views, context menu items and dialogs. Drkonqi and the glue code between user action and `IDebugSession` methods are other parts that can be potentially reused.

- UI
    * ToolViews
        + RegisterView
        + DisassembleWidget
        + GDBOutputWidget
        + MemoryViewDlg
    * Context Menu
    * Dialogs
        + DebugTracingDialog
        + SelectCoreDialog
        + ProcessSelection
- Drkonqi
- DebugSession management

### PretteyPrinters
These scripts are used to make C++/STL and Qt objects easier for the user to read. Currently I'm not sure if they are still needed for LLDB. If so, this might need to be ported to LLDB data formatters.

### Tests
The importance of tests can never be over emphasized. I'm going to start with the same unit tests as GDB when applicable and add other tests when find problems during the implementation.

## Timeline

### Milestones
- __April 22__ (2 weeks): If accepted, I will start by contributing little bug fixes to KDevelop to get familiar with the code base. Besides that, the most work for this period will be investigating and playing with different ways to talk with lldb. It is important to have this period before actually starting coding, as the decision of which LLDB interface to use would affect the overall stability and quality of the plugin, and it deserves some careful thought.
- __May 6__ (3.5 weeks): Around this time, I should have done some demos on talking to LLDB. Use this experience gained from previous weeks, I will start actually build the communication infrastructure with LLDB. This could be a totally rewrite from stratch or an extension of the previous demo depends on what method I choose.
- __May 31__ (3 weeks): We should have a final communication infrastructure with LLDB (part 1) now. And based on that, I can start implement most of the important controllers and managers for the plugin, including `IPlugin`, `IDebugSession` and friends.
- __June 21__ (4 weeks): Most of the important controllers and mangers (part 2) should have been implemented at this time. Although they may still contain stub methods which are related to UI setups and Drkonqi. I give this period the longest time because in my opinion, it is the UI that actually talks to users, and any small bug in it will frustrate them. Thus I not only need to implement them, but also polish them to some extent.
- __July 19__ (4 weeks): The whole plugin should work for simple use cases by then. And the last 4 weeks are used to revise and finialize the code to fix any remaining bugs as well as move non GDB specific classes into kdevplatform.git. This period also serves as a buffer as we are always optimistic in estimating works and it always turns out to take longer!
- __Augest 15__: Fine tune and bug fixes done, project finish.

### Availability
I will stay at the university for research during the summer break, which basically is another project to do. However, the time schedule for the research is flexible, and two project at the same time is the regular workload for a normal semaster. So I believe I can manage my time accrodingly and there shouldn't be a problem.

## About me
My name is Peifeng Yu, a master student at the University of Michigan majoring in Computer Science. I've been using KDE as my major desktop for years and really enjoy the amount of customization it allows. As a programmer, I use KDevelop for most of my projects because of its better support for CMake based projects (and yes, sometimes QtCreator if I'm using qmake ;-) ). I was excited when it first announced the integration with clang compiler. Now here's opportunity to integrate further with llvm toolchain and it would be exciting if I can contribute to it.

As for the skills, I've been programming in C++ for about 5 years and it's my favorite language. I consider myself an experienced C++ programmer thanks to my experience on ACM/ICPC during my undergraduate, which sharpened my program skills and helped me gain more insight in algorithms.

And I love Qt, which makes coding a pleasure. Although not worked on very big projects (That's why GSoC!), I have several little programs written in C++/Qt including my graduate project, which are all hosted on Github. Apart from that, I'm always curious about language implementation details and have read a lot about C++ and Qt internals. These knowledge seems unnecessary on the first sight, but they do help me handle tricky situations when the code goes wrong. CMake and Git are also my friends, which I use on a daily basis.

Besides that, I have a strong background on all basic software related fields, such as algorithm, data structure, compiler, computer archetecture and operating systems, as learnt in my undergraduate (Software Engineering, Xi'an Jiaotong University) and graduate (Computer Science, University of Michigan) study.
