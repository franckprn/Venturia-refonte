---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines.

## How It Works

1. Read the guidelines from the local file below
2. Read the specified files (or prompt user for files/pattern)
3. Check against all rules in the guidelines
4. Output findings in the terse `file:line` format

## Guidelines Source

The guidelines are vendored locally, pinned to a reviewed commit:

```
command.md   (in this skill's own directory)
```

Pinned from `vercel-labs/web-interface-guidelines` at commit
`434b7f91364665f2f733b310ec54809bf8f37937` (see `.claude/skills/SOURCES.md`).

Read that local file with the Read tool. Never fetch the guidelines from the
network (no WebFetch, no curl): an update goes through a new review of the
upstream file, then a replacement of `command.md`.

## Usage

When a user provides a file or pattern argument:
1. Read `command.md` in this skill's directory
2. Read the specified files
3. Apply all rules from the guidelines
4. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.
