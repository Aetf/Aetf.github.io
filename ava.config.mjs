export default {
    files: ['tests/**', '!tests/**/{data,helpers,snapshots}/**'],
    ignoredByWatcher: ['{coverage,docs,media,test-d,test-tap}/**'],
    utilizeParallelBuilds: false,
    concurrency: 1,
    workerThreads: false
};
