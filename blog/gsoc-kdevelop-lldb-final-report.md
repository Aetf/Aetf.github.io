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
### Config Page
As already covered in my [previous post]({filename}/gsoc-kdevelop-lldb-status.md), the LLDB plulgin provides the same configuration interface as the good old GDB one. When editing a Debug configuration, the combox at the top-right corner in the Edit Launch Configuration dialog lets you select either GDB or LLDB as backend.

[![LLDB Config Page]({filename}/assets/img/gsoc-kdevelop-lldb-status-lldbconfigpage.png)]({filename}/assets/img/gsoc-kdevelop-lldb-status-lldbconfigpage.png)

While the defaults should work in most cases, the LLDB backend is configurable in many aspects. Options are grouped into three categories.

- __Debugger__: settings about where to find the debugger executable and how to launch it.
- __Options__: settings that control various behaviors during a debugging session.
- __Remote Debugging__: settings specific to remote debugging.

| __Setting name__ | __Default value__ | __What does it do?__ |
|:-----------------|:------------------|:---------------------|
| `Debugger executable` | `lldb-mi` in PATH | The LLDB MI Driver executable[^1] |
| `Arguments` | Empty | Command line arguments passed to the LLDB MI Driver when launching |
| `Environment` | Default Profile | Environment variables for the LLDB MI Driver (__not__ for the inferior) |
| `Inherit system environment` | Yes | Whether inherit system environment variables when launching the LLDB MI Driver |
| `Config script` | Empty | This script is sourced by LLDB right before launching the inferior[^2]|
| `Break on start` | No | Whether stop at the entry point of the program when launching the inferior |
| `Start debugger with` | `Application Output` | Which tool view should be raised up when staruing the debugging session. Available options are `Application Output`, `Framestack`, `LLDB Console`. |
| `Remote Debugging` | No | Do remote debugging or not |
| `Remote server` | Empty | The address of the remote debugging server, in the form `host:port`[^3] |
| `Remote work path` | Empty | A writable directory on the remote machine. Compiled inferior would be put into this directory for executing on the remote machine |

[^1]: The executable for the LLDB MI Driver is `lldb-mi`, which usually can be found in the same directory as the main `lldb` executable. 
[^2]: This happens after all internal commands issued by KDevelop, so you have chance to change every settings available in LLDB. But be careful because KDevelop relies on several settings to work properly.
[^3]: While LLDB uses GDB Remote Protocol, it's only compatible with LLDB's own implementation, which can be launched by the command line `lldb-server gdbserver`. See [Known Issues]({filename}/gsoc-kdevelop-lldb-status.md#known-issues) for more information.

///Footnotes Go Here///

### Breakpoints

### framestack

### variables
- unicode handling

### debugger console

### remote debugging

Known limitations

## The Design
- communication between KDevelop and `LLDB`
- common vs gdb vs lldb

## Roadmap
- finish data formatter unit tests
- global config for attach to process and examine core file
- get bugs in lldb-mi fixed
- ...