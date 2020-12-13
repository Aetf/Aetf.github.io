---
title: "GSoC 2016: LLDB Support for KDevelop - Final Report"
tags: [GSoC2016, c++, LLDB, KDE, KDevelop, OpenSource]
date: 2016-08-20T16:51:45-04:00
updated: 2016-08-27T16:27:01-04:00
---

## Introduction
The aim of this post is to provide an insight into various aspects of the LLDB plugin, so that it is better understood, and can be used by more people. Should anyone want to improve it or add more features, he/she will also find useful technical details here.

In general, the LLDB plugin teaches KDevelop to talk to the standalone LLDB MI Driver (`lldb-mi`), so that it's possible to use LLDB as an alternative debugger backend for KDevelop.

The rest of the post is orgainzed as follow

- [Setting Up](#setting-up) provides necessary information on how to get everything work from source code
- [Features](#features) gives a detailed description of available features implemented in the LLDB plugin
- [Roadmap](#roadmap) lists some future works.

## Setting Up

### Custom Build of LLDB
First thing first, you need a working LLDB before you can use it inside KDevelop. For the LLDB MI Driver (`lldb-mi`), while it's a standalone executable, its code is inside the LLDB repository and thus should come with a normal `LLDB` installation.

However, as the current release of LLDB MI Driver contains several bugs, you have to build LLDB from source, with patches applied. Please refer to [Building LLDB](https://lldb.llvm.org/resources/build.html) for more detailed information on how to compile.

To apply patches, after checking out the source code, run
```bash preset=shell
cd llvm/tools/lldb/tools/lldb-mi
patch -i /path/to/patch.patch
```

Right now, only the patch for [Bug 28026][] is mandatory for stable reason, but there are patches fixing other minor problems available, too, please refer to {% post_link gsoc-kdevelop-lldb-status Current Status of LLDB Plugin for KDevelop %}
for a complete list.

[Bug 28026]: https://llvm.org/bugs/show_bug.cgi?id=28026 "LLDB-MI doesn't properly output CLI command response using console-stream-output stream"

### Build KDevelop From Source
While the LLDB plugin has been merged into the master branch in [KDevelop repository](https://invent.kde.org/kdevelop/kdevelop), it is not included in any release yet, so you need to build KDevelop from source. You can find step-by-step guides on [the community wiki](https://community.kde.org/KDevelop/HowToCompile_v5) and [Kevin's blog](http://kfunk.org/2016/02/16/building-kdevelop-5-from-source-on-ubuntu-15-10/). Also, if you don't want to use `kdesrc-build`, be sure to refer to {% post_link build-kdevelop-against-custom-kdevplatform my post%} for how to avoid messing up with system installed KDevelop.

## Features
This section gives a detailed introduction for important features.

### Config Page
As already covered in my {% post_link gsoc-kdevelop-lldb-status previous post %}, the LLDB plulgin provides the same configuration interface as the good old GDB one. When editing a Debug configuration, the combox at the top-right corner in the Edit Launch Configuration dialog lets you select either GDB or LLDB as backend.

[![LLDB Config Page](/assets/img/body_gsoc-kdevelop-lldb-status-lldbconfigpage.png "LLDB Config Page")](/assets/img/body_gsoc-kdevelop-lldb-status-lldbconfigpage.png)

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
[^3]: While LLDB uses GDB Remote Protocol, it's only compatible with LLDB's own implementation, which can be launched by the command line `lldb-server gdbserver`. See {% post_link gsoc-kdevelop-lldb-status#known-issues Known Issues %} for more information.

### Breakpoints
Breakpoints is a must for any debugging tool to be useful. And the LLDB-powered debugging backend also provides good breakpoint support. Apart from setting breakpoints by clicking on the left side of the source file, the breakpoints tool view shows all breakpoints in the project as usual.

[![Breakpoints Tool view](/assets/img/body_gsoc-kdevelop-lldb-breakpoints.png "Breakpoints Tool view")](/assets/img/body_gsoc-kdevelop-lldb-breakpoints.png)

### Framestack
Easily getting lost when debugging multi-threaded program? Framestack tool view comes to rescue. Navigating among threads and frames is as easy as clicking the corresponding item. A little difference from GDB is, low level functions like `_start` and `__libc_start_main` are also shown in the list.

[![Framestack tool view](/assets/img/thumbnail_gsoc-kdevelop-lldb-framestack.png "Framestack tool view")](/assets/img/thumbnail_gsoc-kdevelop-lldb-framestack.png)

### Variables
The variables tool view shows local variables in the current frame, as well as values of manually set watches. Thanks to the newly written data formatter (equivalent to pretty printers in GDB), the LLDB backend understands common `STL` and `Qt` types, as well as a few `KDE` types. This means, `std::string` and `QString` are shown as string. Array-like types (various list/vector) and dictionary-like types (various map/set) are also shown in a human readable format.

{% note info %}
#### Unicode values and byte array
Unicode values are safely escaped and unescaped when transfered between KDevelop and the LLDB MI Driver, this means they can be correctly displayed in the UI, rather than showing garbage symbols as the case for pretty printers in GDB.
{% endnote %}

[![Variables tool view](/assets/img/thumbnail_gsoc-kdevelop-lldb-variables.png "Variables tool view")](/assets/img/thumbnail_gsoc-kdevelop-lldb-variables.png)

By hovering mouse on a variable name in the source file, it's value is revealed in a popup, correctly formatted. Clicking `Watch this` adds this variable as a manually set watch. Unfortunately, `Stop on change` doesn't work yet, due to the lack of necessary commands in the LLDB MI Driver.

[![Hover over a symbol](/assets/img/body_gsoc-kdevelop-lldb-hover.png "Hover over a symbol")](/assets/img/body_gsoc-kdevelop-lldb-hover.png)

{% note info  %}
#### Using data formatter scripts outside KDevelop
The data formatter scripts bundled are not specific to KDevelop, and can actually be used directly in plain LLDB CLI. Just import the corresponding script `command script import /path/to/formatter/qt.py`, and you'll get the same pretty formatted variables in plain command line.

The scripts usually can be found in `/usr/share/kdevlldb/formatters` after the installation of KDevelop, or you can get the latest git version in the [repository](https://invent.kde.org/kdevelop/kdevelop), they are in `plugins/lldb/formatters`.
{% endnote %}

### Debugger Console
The debugger console is totally reworked. The new 'repeat' mode can save you a few types if you want to resend the last command.

[![Debugger console](/assets/img/body_gsoc-kdevelop-lldb-debuggerconsole.png "Debugger console")](/assets/img/body_gsoc-kdevelop-lldb-debuggerconsole.png)

### Remote Debugging
Remote debugging has also been redesigned and should be easier to use. The configuration is largely simplified. After specifying the address to the remote debugging server and a writable working directory, KDevelop will take care of uploading and starting the inferior.

### Known limitations
However, there are {% post_link gsoc-kdevelop-lldb-status#known-issues a few limitations %} in this version.
That post also has a comprehensive list of {% post_link gsoc-kdevelop-lldb-status#upstream-bugs related bug reports %} in LLDB.

## Roadmap
Other than finishing up missing functionalities in the LLDB plugin, the TODO list is as follow:

- Get bugs in lldb-mi fixed
- Global debug config for attach to process and examine core file

For a comprehensive technical TODO list, please refer to `plugins/lldb/TODO.txt` in the [repository](https://invent.kde.org/kdevelop/kdevelop/-/blob/master/plugins/lldb/TODO.txt)
