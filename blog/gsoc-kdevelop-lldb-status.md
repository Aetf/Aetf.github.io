---
Title: "GSoC 2016: Current Status of LLDB Plugin for KDevelop"
Tags: [GSoC2016, c++, LLDB, KDE, KDevelop, OpenSource]
Slug: gsoc-kdevelop-lldb-status
---
!!! info "Updated on 2016.9.2"
    Update known issues and upstream bugs

!!! info "Updated on 2016.8.22"
    Update known issues
    
!!! info "Updated on 2016.8.14"
    Feature matrix and known issues
    

After several months' working, LLDB plugin is now usable for basic debugging use cases. There are less than two weeks left, and it's time to do a overall status update for the LLDB plugin.

### Config Page

Using LLDB as the debugger backend is as easy as using the good old GDB debugger. Simply selecting `LLDB` in the combox at the top-right corner when editing the debug launch configuration should get things work in most normal cases.

[![LLDB Config Page]({filename}/assets/img/gsoc-kdevelop-lldb-status-lldbconfigpage.png)]({filename}/assets/img/gsoc-kdevelop-lldb-status-lldbconfigpage.png)

Additionally, you can set `Debugger Executable` pointing to a specific version of `LLDB`. Note that this path should point to the `lldb-mi` executable, which is usually in the same folder as the normal `lldb` executable. Should you need any special configuration, `Arguments` and `Environment` let you fine tune the running environmnet of `LLDB`.

For common options, `Config script` lets you execute almost any command right after the debugger starts up. `Break on start` and `Start debugger with` (the same as `GDB`) options also come in handy.

The remote debugging part has been reworked and is largely simplified compared to the `GDB` one. You only need to start the remote debugging server (`lldb-server gdbserver`) and set hostname and port in the config page along with a writable folder on the remote machine. KDevelop will take care of uploading and starting your program.

### Debugging

After started the debug session, you will be taken to the familiar KDevelop debug mode, with similar tool views available, backed by `LLDB`.

Variables and Framestack tool views should work as expected. In case you need to execute some complex command directly in `LLDB`, there's the reworked Debugger Console.

[![Debug Session using LLDB]({filename}/assets/img/gsoc-kdevelop-lldb-status-debugging.png)]({filename}/assets/img/gsoc-kdevelop-lldb-status-debugging.png)

!!! info "Tips"
    There's a "repeat" mode in the Debugger Console. If you check the small button left to the command edit, you can press enter directly to repeat the last command.

## Feature Implementation Status

| Feature | Working | Note |
|:-------:|:------:|:----:|
| Execution control | Yes | - |
| Break points | Partial | With caveats, see [Known Issues](#known-issues) |
| Frame stack list | Yes | - |
| Symbol info when hover | Yes | - |
| Variables & Expressions | Yes | see [Known Issues](#known-issues) |
| Pretty Printer & Unicode | Yes | - |
| Multi-threaded debugee | Yes | With `LLDB` latest trunk version, (svn265858, at the time of writting) |
| Debugger console | Yes | See [Known Issues](#known-issues) |
| Remote debugging | Yes | Only tested on localhost, see [Known Issues](#known-issues) |
| Disassembly/Register view | No | Missing necessary command in `lldb-mi`: [Bug 28718][], [Bug 28859][] |
| Memory view | No | - |
| Watch points | No | - |
| Attach to process | No | Due to [Bug 28858][] |
| Examine core file | No | Implemented, not accessible from UI, not tested yet |
| Drkonqi support | No | Implemented, not tested yet|

### Known Issues
- Debugger console
    + Debugger CLI stdout isn't shown, due to [Bug 28026] []
- Remote debugging
    + When using `lldb-server gdbserver` as remote server, server exits once debug session ended.
    + When using `gdbserver` as remote server
        - Remote work path can't contain space
        - Can't actually start inferior
- Variables view
    + ~~Variables and expression won't get updated when their values change, possibly due to `lldb-mi` doesn't report them in the `changelist` result.~~
    + Variables may not be updated when jumping between frames and threads, due to [Bug 28621][]
- Breakpoints
    + Pending breakpoints doesn't work ([Bug 28702][], [Bug 28703][]), as well as anything relies on it, i.e. ~break on start~ (break on start is fixed to work even without pending breakpoint support) .
        - Can still manually set pending breakpoints
    + Breakpoint hit count is not updated timely ([Bug 28860][])
    + No watchpoint support
        - Can still manually add watch point
- Changing working directory has no effect ([Bug 30265][])

### Upstream Bugs
Actually most non-working issues are due to some kind of upstream bugs in `lldb-mi`. There's a `debugers/lldb/TODO.txt` in the repo which contains more detailed description of current limitations and link to related LLDB bug reports. But here's a quick list of opening bugs.

Some of these bugs already have patch available, so be sure to check out their bugzilla page.

- [Bug 25000][] - lldb-mi does not receive broadcasted notification from Core/Process about process stopped if StopAtEntry was requested ("process launch -s" OR "-exec-run --start")
- (Patch available) [Bug 28026][] - LLDB-MI doesn't properly output CLI command response using console-stream-output stream
- [Bug 28621][] - lldb-mi can't get variables of a frame (-stack-list-* MI-commands) if the thread didn't cause the stop event
- [Bug 28698][] - [lldb-mi] -break-insert with -f (pending flag) requires additional parameter
- [Bug 28702][] - LLDB-MI: pending break point set with command break-insert -f doesn't get resolved
- [Bug 28703][] - LLDB-MI: break-insert command flag -d (disabled) has no effect when combined with -f (pending)
- (Patch available) [Bug 28718][] - LLDB-MI: disassembly-flavor not supported by gdb-set and gdb-show
- [Bug 28857][] - LLDB-MI: break-enable doesn't enable specified breakpoints
- [Bug 28858][] - LLDB-MI: no notification about process stopped if attaching to a process
- [Bug 28859][] - LLDB-MI: data-disassemble command doesn't accept "$pc" as start and end address parameter
- [Bug 28860][] - LLDB-MI: no breakpoint-modified notification when a breakpoint is hit
- (Patch available) [Bug 30265][] -  LLDB-MI: environment-cd doesn't change working directory for inferior

[Bug 25000]: https://llvm.org/bugs/show_bug.cgi?id=25000 "lldb-mi does not receive broadcasted notification from Core/Process about process stopped if StopAtEntry was requested ("process launch -s" OR "-exec-run --start")"
[Bug 28026]: https://llvm.org/bugs/show_bug.cgi?id=28026 "LLDB-MI doesn't properly output CLI command response using console-stream-output stream"
[Bug 28621]: https://llvm.org/bugs/show_bug.cgi?id=28621 "lldb-mi can't get variables of a frame (-stack-list-* MI-commands) if the thread didn't cause the stop event"
[Bug 28698]: https://llvm.org/bugs/show_bug.cgi?id=28698 "[lldb-mi] -break-insert with -f (pending flag) requires additional parameter"
[Bug 28702]: https://llvm.org/bugs/show_bug.cgi?id=28702 "LLDB-MI: pending break point set with command break-insert -f doesn't get resolved"
[Bug 28703]: https://llvm.org/bugs/show_bug.cgi?id=28703 "LLDB-MI: break-insert command flag -d (disabled) has no effect when combined with -f (pending)"
[Bug 28718]: https://llvm.org/bugs/show_bug.cgi?id=28718 "LLDB-MI: disassembly-flavor not supported by gdb-set and gdb-show"
[Bug 28857]: https://llvm.org/bugs/show_bug.cgi?id=28857 "LLDB-MI: break-enable doesn't enable specified breakpoints"
[Bug 28858]: https://llvm.org/bugs/show_bug.cgi?id=28858 "LLDB-MI: no notification about process stopped if attaching to a process"
[Bug 28859]: https://llvm.org/bugs/show_bug.cgi?id=28859 "LLDB-MI: data-disassemble command doesn't accept "$pc" as start and end address parameter"
[Bug 28860]: https://llvm.org/bugs/show_bug.cgi?id=28860 "LLDB-MI: no breakpoint-modified notification when a breakpoint is hit"
[Bug 30265]: https://llvm.org/bugs/show_bug.cgi?id=30265 "LLDB-MI: environment-cd doesn't change working directory for inferior"
