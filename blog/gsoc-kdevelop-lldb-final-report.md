---
Title: "GSoC 2016: LLDB Support for KDevelop - Final Report"
Tags: [GSoC2016, c++, LLDB, KDE, KDevelop, OpenSource]
Slug: gsoc-kdevelop-lldb-final-report
---

!!! warning "Under Construction"
    Still working on this.

## Introduction
The aim of this post is to provide an insight into various aspects of the LLDB plugin, so that it is better understood, and can be used by more people. Should anyone want to improve it or add more features, he/she will also find useful technical details here. 

In general, the LLDB plugin teaches KDevelop to talk to the standalone LLDB MI Driver (`lldb-mi`), so that it's possible to use LLDB as an alternative debugger backend for KDevelop.

The rest of the post is orgainzed as follow

- [Setting Up](#setting-up) provides necessary information on how to get everything work from source code
- [Features](#features) gives a detailed description of available features implemented in the LLDB plugin
- [The Design](#the-design) and [Roadmap](#roadmap) provide technical information on the implementation for those who are interested.

## Setting Up

### Custom Build of LLDB
First thing first, you need a working LLDB before you can use it inside KDevelop. For the LLDB MI Driver (`lldb-mi`), while it's a standalone executable, its code is inside the LLDB repository and thus should come with a normal `LLDB` installation.

However, as the current release of LLDB MI Driver contains several bugs, you have to build LLDB from source, with patches applied. Please refer to [Building LLDB](http://lldb.llvm.org/build.html) for more detailed information on how to compile.

To apply patches, after checking out the source code, run
```bash classes=command-line user=aetf host=localhost
cd llvm/tools/lldb/tools/lldb-mi
patch -i /path/to/patch.patch
```

Right now, only the patch for [Bug 28026][] is mandatory for stable reason, but there are patches fixing other minor problems available, too, please refer to [Current Status of LLDB Plugin for KDevelop]({filename}/gsoc-kdevelop-lldb-status.md) for a complete list.

[Bug 28026]: https://llvm.org/bugs/show_bug.cgi?id=28026 "LLDB-MI doesn't properly output CLI command response using console-stream-output stream"

### Build KDevelop From Source
While the LLDB plugin has been merged into the master branch in [KDevelop repository](https://quickgit.kde.org/?p=kdevelop.git), it is not included in any release yet, so you need to build KDevelop from source. You can find step-by-step guides on [the community wiki](https://community.kde.org/KDevelop/HowToCompile_v5) and [Kevin's blog](http://kfunk.org/2016/02/16/building-kdevelop-5-from-source-on-ubuntu-15-10/). Also, if you don't want to use `kdesrc-build`, be sure to refer to [my post]({filename}/build-kdevelop-against-custom-kdevplatform.md) for how to avoid messing up with system installed KDevelop.

## Features
- the config page
- breakpoints
- framestack
- variables
    + unicode handling
- debugger console
- remote debugging

Known limitations

## The Design
- communication between KDevelop and `LLDB`
- common vs gdb vs lldb

## Roadmap
- finish data formatter unit tests
- global config for attach to process and examine core file
- get bugs in lldb-mi fixed
- ...