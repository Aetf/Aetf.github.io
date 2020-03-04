#! /usr/bin/env ruby
require 'html-proofer'

options = {
  allow_hash_href: true,
  check_favicon: true,
  check_opengraph: true,
  check_html: true,
  internal_domains: ['unlimitedcodeworks.xyz', 'unlimited-code.works'],
  # cache timeframe
  timeframe: '6w',
  # LinkedIn denies requests
  http_status_ignore: [999],
  # XXX: remove this after hexo-excerpt implements link rewrite in excerpt
  file_ignore: [Regexp.new('/blog/page/'), Regexp.new('/blog/index\\.html')],
  parallel: { in_processes: 3 }
}
HTMLProofer.check_directory("/repo/build/output", options).run
