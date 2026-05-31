---
title: "Sliding Window Pattern"
description: "Maintaining a moving window over a sequence to compute running aggregates in linear time."
topic: dsa
subtopic: arrays
roles:
  - backend
experience:
  - junior
  - mid
difficulty: medium
tags:
  - arrays
  - sliding-window
  - two-pointer
status: complete
last_updated: 2026-05-10
---

## What it is

A sliding window keeps a contiguous range `[left, right)` over the input and
adjusts its bounds as it scans, reusing work from the previous position instead
of recomputing from scratch.

## Fixed vs. dynamic windows

- **Fixed size** — the window width is constant (e.g. "max sum of k elements").
- **Dynamic size** — the window grows/shrinks to satisfy a constraint
  (e.g. "smallest subarray with sum ≥ target").

## Example

```py
def max_sum_window(nums: list[int], k: int) -> int:
    window = sum(nums[:k])
    best = window
    for i in range(k, len(nums)):
        window += nums[i] - nums[i - k]
        best = max(best, window)
    return best
```

> Sample seed content — real content syncs from the `dsa` repo.
