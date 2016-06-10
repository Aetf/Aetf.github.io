---
Title: "Build KDevelop Against Custom KDevPlatform"
Tags: [c++, KDE, KDevelop, OpenSource, cmake]
Slug: build-kdevelop-against-custom-kdevplatform
---

KDevelop is tightly coupled with KDevPlatform and from time to time you need to hack them both when developing. But then without caution, you'll link against the system bundled KDevPlatform libraries and spend the whole day trying to find out why the hall the code you wrote didn't have any effects.

That's annoying and here's how to make sure you are linking to the right copy.

#### Compile & Install KDevPlatform
Your awesome super hacked KDevPlatform need to be compiled and installed to somewhere first, say `~/stage`. Don't install it to any standard path like `/usr` or `/usr/local` just to avoid messing with the rest of the system. As a rule of thumb, if you need sudo privilege when doing `make install`, then you probably should consider somewhere else.

```bash classes=command-line user=aetf host=localhost
mkdir build && cd build
cmake -DCMAKE_BUILD_TYPE=Debug -DCMAKE_INSTALL_PREFIX=~/stage ..
make install
```

This should give you bunch of files in `~/stage`, like `bin`, `include`, `lib64` and `share`, somewhat similar to your system root.

#### Compile & Install KDevelop
cmake makes life easier by its `find_package` mechanism that automatically find required libraries for you. But sometime you need more control over that.

What `find_package` actually does is to find a cmake file provided by the library you required that can configure itself. (read the [doc](https://cmake.org/cmake/help/latest/command/find_package.html) if you are interested in the exact detailed procedure). In our case, the files are:

```bash classes=command-line user=aetf host=localhost output=2-7
tree ~/stage/lib64/cmake/KDevPlatform
                   ~/stage/lib64/cmake/KDevPlatform
                   ├── KDevPlatformConfig.cmake
                   ├── KDevPlatformConfigVersion.cmake
                   ├── KDevPlatformMacros.cmake
                   ├── KDevPlatformTargets.cmake
                   └── KDevPlatformTargets-debug.cmake
```

We just need a way to tell cmake where they are by appending that path to `CMAKE_PREFIX_PATH` when configure KDevelop.

```bash classes=command-line user=aetf host=localhost output=2-5
mkdir build && cd build
cmake -DCMAKE_PREFIX_PATH=~/stage/lib64/cmake \
                         -DCMAKE_BUILD_TYPE=Debug \
                         -DCMAKE_INSTALL_PREFIX=~/stage \
                         ..
make install
```

This way cmake will find your newly built KDevPlatform.

__Hint__: you can locally change KDevPlatform version to a higher number than the one in the system and modify KDevelop to require at least that number. Then you can be sure that you are building against the custom build of KDevPlatform.

#### Run Newly Built KDevelop
In order to run KDevelop built this way, you have to specify various paths so that system can load correct version of dynamic libraries and kdevelop itself can find its data in correct place.

```bash classes=command-line user=aetf host=localhost output=2-4
env QT_PLUGIN_PATH=~/stage/lib64/plugins \
                       LD_LIBRARY_PATH=~/stage/lib64 \
                       XDG_DATA_DIRS=~/stage/share:$XDG_DATA_DIRS \
                       ~/bin/kdevelop
```
