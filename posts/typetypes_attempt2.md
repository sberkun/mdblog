# Wacky Ideas about Generics

some wacky ideas. buckle in.


# Generics are just functions that take in types

Consider a generic function:
```
fn foo<T>(my_thing: T) -> String {
    ... // do something with my_thing
    return "cheese";
}
```
Doesn't foo take in a type (i.e. `int`), and give you a function (`int -> String`)?
Similarly for a generic type,
```
struct Coordinate<T: Comparable> {
    x: T,
    y: T,
}
```
Isn't this a function that takes in a type (i.e. `int`), and give you a type (in
this case, a pair of ints)? If we were designing a language, we might even go as
far as to make the above syntactical sugar for something like this:
```
fn Coordinate<T: Comparable> -> type {
    return struct {x: T, y: T};
}
```

# Generics are just functions that take in compile-time values

Suppose we want to be generic over other things, not just types. Rust calls this
feature "const generics", and gives this as an example:
```
struct ArrayPair<T, const N: usize> {
    left: [T; N],
    right: [T; N],
}
```
However, in Rust, const generics are limited to fairly simple types (ints and bools).
It would be cool, for example, to be able to take in structs:
```
struct SizeConfig {
    left: usize,
    right: usize,
}

struct ArrayPair<T, const S: SizeConfig> {
    left: [T; S.left],
    right: [T; S.right]
}
```
If we embrace the "generics as functions" thing, we could even change the layout
based on generic parameters:
```
struct SizeConfig {
    left: usize,
    right: usize,
    combine_sides: bool,
}

fn ArrayPair<T, const S: SizeConfig> -> type {
    if (S.combine_sides) {
        struct {
            data: [T; S.left + S.right],
        };
    } else {
        struct {
            left: [T; S.left],
            right: [T; S.right]
        }
    }
}
```


# We should be able to use types in compile-time structs

Take a look at `SizeConfig` above. Wouldn't it be even cooler to have this?
```
struct ArrayPairConfig {
    array_type: type,
    left_size: usize,
    right_size: usize,
    combine_sizes: bool,
}
```
If you're worried because `type` isn't a runtime construct and your language is
too pure to support reflection, that's ok. You can just make a keyword
`compile_time_struct` or something to represent structs that can only exist at
compile time. I'll be happy as long as it's possible to do this:
```
enum Order {Greater, Equal, Less}

compile_time_struct Comparable {
    self: type,
    compare: fn(self, self) -> Order;
}
```
This is tricky to support; your compiler will probably be doing some NP-complete
satisfiability checks. But then, someone could do this:

```
fn find_largest<const C: Comparable>(a: C.self, b: C.self, c: C.self) -> C.self {
    let ab: Order = C.compare(a, b);
    let bc: Order = C.compare(b, c);
    let ca: Order = C.compare(c, a);
    ... // some logic
}
```
# Structs of types in generics are more flexible than Traits/Interfaces

You might notice that we're using the `Comparable` struct much like a trait/interface.
TODO