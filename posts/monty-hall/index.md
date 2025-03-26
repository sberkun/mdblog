---
layout: post
title:  "You Don't Understand the Monty Hall Problem"
---



The Monty Hall Problem is usually presented like this:

> Suppose you're on a game show, and you're given the choice of three doors: Behind one door is a car; behind the others, goats. You pick a door, say No. 1, and the host, who knows what's behind the doors, opens another door, say No. 3, which has a goat. He then says to you, "Do you want to pick door No. 2?" Is it to your advantage to switch your choice?

(source: [wikipedia](https://en.wikipedia.org/wiki/Monty_Hall_problem) and [marilynvossavant.com](https://web.archive.org/web/20130121183432/http://marilynvossavant.com/game-show-problem/))

You can play the game below, which tracks with the most common interpretation of the problem:


<link rel="stylesheet" href="game.css">
<div class="game normal-game"></div>

<br>

The game makes a few key assumptions:
 1. You'd prefer a car over a goat
 2. The host always opens a goat door.


You'll notice that over a large number of games, the probability of winning the car when you switch doors is around 2/3rds (67%), while the probability of winning the car when you keep the same door is around 1/3rd (33%).

Let's play a slightly different interpretation of the game:

<div class="game evil-game"></div>

<br>

This version of the game makes a few key assumptions:
 1. You'd prefer a car over a goat
 2. The host sometimes opens a goat door, but sometimes opens a car door.

If you re-read the original problem statement, you might think that the second assumption contradicts it. But the problem statement only says that the host reveals a goat _this round_. It says nothing about what the host does during other rounds of the same game show.

So obviously, the answer to the Monty Hall Problem is entirely dependent on what assumptions you make about the host. We can formalize the problem with the following flowchart:

![diagram](diagram.png)

In the above flowchart, each arrow is labelled with a probability, with q being unknown. The Monty Hall Problem is essentially asking "Is it more likely that you're in situation A (where switching would win the game), or situation B (where switching would lose the game)?"  

You could assume that q = 1 (the host always opens a goat door), which lets you calculate that the probability of A is 2/3rds and the the probability of C is 1/3rd. Or, you could assume that q = 0 (the host hates you), which lets you calculate that the probability of A is 0, so you should never switch doors. In general, switching is beneficial when p > 1/2.

## A Note on History

The original version of the problem (quoted at the beginning of this blog post) appeared in the Parade magazine in 1990. In its [first appearance](https://web.archive.org/web/20130121183432/http://marilynvossavant.com/game-show-problem/) the assumption that the host always chooses a goat door is not stated. Marilyn clarifies it in her solution, but the line is easy to miss:

> Yes; you should switch. The first door has a 1/3 chance of winning, but the second door has a 2/3 chance. Here’s a good way to visualize what happened. Suppose there are a million doors, and you pick door #1. Then the host, who knows what’s behind the doors and __will always avoid the one with the prize__, opens them all except door #777,777. You’d switch to that door pretty fast, wouldn’t you?

(emphasis mine) She has to re-clarify it later:

> So let’s look at it again, remembering that the original answer defines certain conditions, the most significant of which is that __the host always opens a losing door on purpose__. (There’s no way he can always open a losing door by chance!) Anything else is a different question.

(again, emphasis mine)

Many modern retellings omit the assumption altogether; hence this blog post.






<script src="game.js"></script>