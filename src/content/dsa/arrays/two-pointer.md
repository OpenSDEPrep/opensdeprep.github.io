---
title: "Two Pointer Pattern"
description: "Using two indices moving through an array or string to solve problems in O(n) time and O(1) space."
topic: dsa
subtopic: arrays
roles:
  - backend
  - frontend
experience:
  - junior
  - mid
difficulty: easy
tags:
  - arrays
  - two-pointer
  - strings
status: complete
last_updated: 2026-05-01
---

## What it is

The two-pointer pattern uses two indices that move through a sequence — either
toward each other from both ends, or in the same direction at different speeds —
to replace a brute-force nested loop with a single linear pass.

## When to use it

- The input is **sorted**, or sorting it first is acceptable.
- You're looking for a **pair / triple** that satisfies a condition (sum, difference).
- You need to **partition or dedupe in place** without extra memory.

## Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Brute force | O(n²) | O(1) |
| Two pointers | O(n) | O(1) |

## Example

```py
def two_sum_sorted(nums: list[int], target: int) -> tuple[int, int] | None:
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        total = nums[lo] + nums[hi]
        if total == target:
            return lo, hi
        if total < target:
            lo += 1
        else:
            hi -= 1
    return None
```

> This is sample seed content so the render pipeline is verifiable. Real content
> syncs in from the `dsa` topic repo.
