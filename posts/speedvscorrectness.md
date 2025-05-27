# Stop Making Shiny Prototypes

If you write software a lot, you likely make this choice pretty often:
 - do I do this quickly?
 - or, do a spend more time to do this right?

Different tools you work with might lean more towards one side or the other. Python
famously prioritizes iteration speed, while Rust tends to prioritize correctness.
Different domains also tend to have their own lean: i.e. web development tends to
prioritize iteration speed, while banking or automotive code tends to prioritize
correctness.

Doing things quickly is great, because it means you can test out many ideas, and
failures don't cost much. But doing things quickly is also a great way to end
up with a tangled buggy mess as your final product. Conversely, doing things
"right" allows you to build robust, scalable systems, but you sacrifice iteration
speed and failures are very expensive.

However, there's a way to eat your cake and have it too: build prototypes. You
can work fast and break things with your prototypes, then work slowly and get it
right for the final product. There's no downsides!

...except that more often, you end up with the worst of both worlds. Building
a prototype means you need to write twice as much code, which takes twice as
long. This makes it very tempting to skip the "do it right" step, and just ship the
prototype as the final product. Or maybe you'll just postpone it...then postpone
it again, then forget about it.

So how do we prevent this? **Make your prototypes as ugly as possible**.

## The danger

It's very tempting to make the user-facing side of a prototype "shiny". Everyone
likes shiny things, and its easier to convince yourself that you're making good
progress if the UI sparkles. But making a pretty UI for a prototype is like
painting a car with no engine. You are wasting your time making something nice.
The point is to see if the concept works, test drive it, and crash it.

If you show something shiny to other people, they'll ooh and ahh and you'll feel
good about yourself and maybe polish up the UI a bit more. You'll develop
attachment to it; soon you'll be reluctant to throw the prototype away. Eventually,
you stop thinking of it as a prototype. If this is a corporate environment, as
soon as you show the prototype to someone non-technical, they'll convince
themselves that it's "almost done". After all, it looks good, so how hard could it
be to just finish up the backend?

## The solution

Counterintuitively, you could invest a little bit of effort into making the
prototype intentionally ugly. If there's duct tape on the inside, there should be
duct tape on the outside. Put debugging logs in obnoxious, user-facing places.
Turn the entire screen red when something goes wrong.

If you show something ugly to other people, it'll be easier for them to understand
that its unfinished. They won't ooh and ahh, but they'll give you _useful_ feedback.
They'll say "I need a button to download the data" instead of "I think the font
should be slightly larger", because if the website is green and purple with
squared-off borders, nobody cares what the font size is.

Eventually, you'll start making the final version. You won't polish up your
prototype, because it'll be so ugly that you'll be glad to throw it away. 









When you need to write code, there are two almost inversely correlated properties:
 - iteration speed: how fast can you get new code out the door
 - correctness: how few bugs do you want

Obviously, both are good, and in a perfect world we would have both in large quantities. But different problem domains tend to prioritize them in different amounts:
 - website frontend: get it out the door! make these ui changes yesterday! bugs are just unexpected features
 - website backend: can we get these features out next week? we _probably_ don't want to be throwing 500s at the frontend.
 - OS: we have a release in 6 months, and need to be pretty sure that we won't crash the users computer
 - Automotive: we have a car hitting the market in 5 years, and need to be _very_ sure that we don't crash the car.
 - Space: if there's a bug


