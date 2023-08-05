export default {
    files: ['tests/**', '!tests/**/{data,helpers,snapshots}/**'],
    ignoredByWatcher: ['{coverage,docs,media,test-d,test-tap}/**'],
    // Worker threads causes ava to segfault on GitHub CI
    workerThreads: false
};
