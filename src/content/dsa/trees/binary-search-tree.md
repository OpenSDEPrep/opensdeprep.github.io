---
title: "Binary Search Tree"
description: "Ordered binary tree supporting O(log n) search, insert, and delete on balanced inputs."
topic: dsa
subtopic: trees
roles:
  - backend
experience:
  - junior
  - mid
  - senior
difficulty: medium
tags:
  - trees
  - binary-search-tree
  - recursion
status: draft
last_updated: 2026-05-12
---

## What it is

A binary search tree (BST) is a binary tree where, for every node, all keys in
the left subtree are smaller and all keys in the right subtree are larger. This
ordering invariant is what enables logarithmic search on balanced trees.

## Caveat

Worst-case operations degrade to **O(n)** when the tree becomes a linked list
(e.g. inserting sorted input). Self-balancing variants (AVL, Red-Black) restore
the O(log n) guarantee.

> Marked `status: draft` to exercise the draft banner in the scaffold.
