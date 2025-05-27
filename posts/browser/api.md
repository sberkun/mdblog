


# Modules

## Bootstrap

Basics, loading other modules, etc

 - load a built in module
 - load another file from origin
 - print to console


## BasicDisplay

Primary display window. Assumed to be rectangular RGB. 

Events:
 - size_change: indicate that the window was resized
 - buffer_refresh: indicate that the buffer has been read, and should be filled
   with the next frame 


Functions:
 - TODO
 - buffer_ready
 - get_size: 
 - get_preferences: light/dark mode, font, whether the user would prefer text


## BasicKeyInput

Applies to desktop/laptop keyboards, but also mobile devices where an
onscreen keyboard should pop up. May apply to more esoteric input methods,
such as handwriting tablets.

Events:
 - keydown, keyup: similar to https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent,
   keypress is deprecated. Repeat typically fires multiple keydown events.
 - keyboard_opened, keyboard_closed: on-screen keyboards may fire events for when they turn on or off

Functions:
 - open_keyboard, close_keyboard: control over onscreen keyboard, if desired. No
   guarantees.

Open questions:
 - should open_keyboard / close_keyboard / related events even exist? Arguably,
   a website could recreate an onscreen keyboard by itself 


## BasicPointerInput

Primary pointer device. Usually a mouse, or touch on a touchscreen.

Events:
 - appear, disappear, buttondown, buttonup, scroll

Functions:
 - get_preferences: whether mouse or touchscreen 


## TextDisplay

Main purposes:
 - screen readers / accessibility. 
 - terminal / serial / low powered devices. 

Open questions:
 - Allow colored text, bolding, italics? Lean towards no, because don't want to
   re-invent HTML. Useful for terminals, but I consider that fringe. 





