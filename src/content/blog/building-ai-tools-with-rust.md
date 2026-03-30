---
title: "Building AI Developer Tools with Rust"
description: "Why Rust is my go-to for CLI tools that sit between developers and AI models — and what I've learned shipping tkn, pane, and canaveral."
date: 2026-03-28
tags: ["rust", "ai", "tooling"]
---

There's something satisfying about writing tools that other developers use every day. Over the past year I've been building a handful of CLI tools in Rust — [tkn](https://github.com/lucasilverentand/tkn), [pane](https://github.com/lucasilverentand/pane), and [canaveral](https://github.com/lucasilverentand/canaveral) — and the pattern that keeps emerging is: **AI assistants are only as good as the context you feed them.**

## The token problem

When you pipe terminal output into an AI assistant, you're paying for every byte. Most of that output is noise — ANSI escape codes, repeated headers, progress bars that don't matter after the fact.

That's why I built `tkn`. It sits between your shell and your AI, stripping the noise and compressing the signal. The result: fewer tokens, faster responses, lower cost.

## Why Rust

I keep reaching for Rust for these tools because:

- **Startup time matters.** These tools run on every command. A 200ms JIT warmup is unacceptable when you're proxying shell output.
- **Single binary distribution.** No runtime, no node_modules, no "install Python 3.11 first." Just download and run.
- **Correctness at the edges.** When you're parsing terminal escape sequences or managing daemon processes, Rust's type system catches the bugs that would bite you at 2am.

## What's next

I'm working on tighter integration between `pane` (the TUI agent manager) and Claude Code. The goal is a workflow where you can spin up multiple AI agents, each with their own context and task, managed from a single terminal interface.

If you're building developer tools and haven't tried Rust yet — give it a shot. The ecosystem for CLI tools (`clap`, `ratatui`, `tokio`) is genuinely excellent.
