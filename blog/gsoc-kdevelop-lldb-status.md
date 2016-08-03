---
Title: "GSoC 2016: Current Status of LLDB Plugin for KDevelop"
Tags: [GSoC2016, c++, LLDB, KDE, KDevelop, OpenSource]
Slug: gsoc-kdevelop-lldb-status
Status: draft
---

After several months working, LLDB plugin is now usable for basic debugging use cases. There are less than two weeks left, and it's time to do a overall status update for the LLDB plugin.

### Functionality List

###### Things that work
- Basic execution control: start, continue, step etc.
- Break points
- Frame stack list
- Symbol info when hover
- Variables & Expressions (still have caveats)
- Multi-threaded debugee (must use LLDB trunk version)
- Debugger console
- Remote debugging (only tested on localhost)

###### Things not working yet
- Disassembly/Register view
- Memory view
- Pending break points and anything requires pending break points
- Watch points
- Attach to process (works internally, no UI to access it)

###### Not tested
- Examine core file
- Drkonqi support

###### Known issues
- Debugger console
    + debugger CLI stdout isn't shown, due to [bug 28026](https://llvm.org/bugs/show_bug.cgi?id=28026)
- Remote debugging
    + When using 'lldb-server gdbserver' as remote server, server exits once debug session ended.
    + When using 'gdbserver' as remote server
        - Remote work path can't contain space
        - Can't actually start inferior
* Breakpoints
    + Pending breakpoints doesn't work, which also causes break on start not function
        - Can still manually set pending breakpoints
    + Breakpoint hit count is not updated timely (limitation in lldb-mi)
    + No watchpoint support
        - Can still manually add watch point
* Threads
    + lldb-mi crashes when break on a point where multiple threads running. (Fixed in latest lldb trunk version)
* Attach to process
    + works internally, but there's no way to access it in the UI currently.

### Upstream Bugs
Actually most non-working issues are due to some kind of upstream bugs in `lldb-mi`. There's a `debugers/lldb/TODO.txt` in the repo which contains more detailed description of current limitations and link to related LLDB bug reports. But here's a quick list of opening bugs.

- [BUG 28026 - LLDB-MI doesn't properly output CLI command response using console-stream-output stream](https://llvm.org/bugs/show_bug.cgi?id=28026)
- [Bug 28702 - LLDB-MI: pending break point set with command break-insert -f doesn't get resolved](https://llvm.org/bugs/show_bug.cgi?id=28702)
- [Bug 28698 - [lldb-mi] -break-insert with -f (pending flag) requires additional parameter](https://llvm.org/bugs/show_bug.cgi?id=28698)
- [Bug 28703 - LLDB-MI: break-insert command flag -d (disabled) has no effect when combined with -f (pending)](https://llvm.org/bugs/show_bug.cgi?id=28703)
- [Bug 25000 - lldb-mi does not receive broadcasted notification from Core/Process about process stopped if StopAtEntry was requested ("process launch -s" OR "-exec-run --start")](https://llvm.org/bugs/show_bug.cgi?id=25000)
- [Bug 28718 - LLDB-MI: disassembly-flavor not supported by gdb-set and gdb-show](https://llvm.org/bugs/show_bug.cgi?id=28718)
- [Bug 28621 - lldb-mi can't get variables of a frame (-stack-list-* MI-commands) if the thread didn't cause the stop event](https://llvm.org/bugs/show_bug.cgi?id=28621)

