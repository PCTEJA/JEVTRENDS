---
title: How to read a Jev demo
description: A short checklist for understanding what a classification demo actually shows.
publishedAt: '2026-09-23'
kind: guides
---

A short demo can be a useful starting point, but it rarely describes the whole system. Before adapting one, work out where the decision happens and what surrounds it.

## Find the choice

Write down the input, the available options, and the selected output. In a browser demo, the options might be actions available on the current page. In a formatting tool, they might be document styles. The useful question is whether your own task can expose a similarly clear set of choices.

## Trace the rest of the workflow

Look for preprocessing, other models, databases, and human review. A fast classification step does not tell you the total time or price of a complete application. Keep model latency separate from page loading, network delays, and follow-up actions.

## Check the evidence

Follow the original source and read any linked code. Note the inputs behind a reported result. Try ordinary cases as well as ambiguous or missing inputs before relying on the approach.

For a concrete starting point, compare the [Browser Use flight example](/builds/browser-use-flights) with the [Word formatter](/builds/word-formatter). Both choose among options, but the consequences and surrounding systems are different.

## Keep an escape route

Decide what should happen when no choice is appropriate. A review step, a request for more information, or a safe default may be more useful than forcing a confident-looking answer.
