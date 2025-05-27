# Types for Types

# Part 0: Rewrite planning

fn type doesn't need to refer to compile-time function, no need for compstruct, just use regular struct
real difference is let vs const. As long as the _value_ is known at compile time, can use it in a generic.


let Comparable: type = struct {
    self: type,
    compare: (self, self) -> Order
}





(Warning: the psuedocode in this blog post will be Rust-ish. This is not
because Rust is a good language. It is because I am bad at every other language)


Zig has it mostly right, I think. But missing type inference, relies on throwing errors for constraints

```
struct Tree<N: usize> {

}
```




# Part 1: Structs

At first, there were values:

```
let x = 1;
let y = 2;
let s = "cheese";
```

But then, humankind decided to group them into types:
```
let x: int = 1;
let y: int = 2;
let s: string = "cheese";
```

From which more complex types could emerge:
```
type coordinate = struct {
    x: int;
    y: int;
}
type FileResult = enum {
    Ok(File),
    Err(string)
}
```

Programming languages also have functions; maybe we should give them types, too?

```
type int_function = (int, int) -> int;

let foo: int_function = (x, y) -> {
    return x + y;
}
```

Now, lots of languages _do_ have function types, to describe closures and other
"first-class" functions. Even C has types for function pointers. But most of
these are thin syntactical sugar for runtime objects that masquerade as functions.
For example, in Java, there are function interfaces, and lambda expressions
create anonymous classes that satisfy those interfaces. In contrast, `int_function`
is much closer to a C function pointer type; it refers to a genuine bit of runnable
code, which exists at compile time.

To go a bit further, I would call `int_function` a "compile-time type", because all
the values it can hold must exist at compile time. 



But foo is a compile-time value, not a runtime value. More generally, every value
that could fall into the type "int_function" 


  So "type" is not quite the
right word. For lack of imagination, let's call `(int, int) -> int` a "comptype".

We could also view types as compile-time values. For example, `int` and `string`
are compile-time values of `type`. If we start building structs of comptypes, we
might do the following:

```
type Order = enum {
    Greater,
    Equal,
    Less
}

comptype Comparable = compstruct {
    self: type;
    compare: (self, self) -> Order
}
```

In some languages, `Comparable` would be a "trait" or an "interface". However,
there's an advantage of the "compstruct" approach: you can have multiple values
that implement `Comparable`. For example,

```
let compare_int_natural = Comparable {
    self: int,
    compare: (x, y) -> {
        if (x > y) {
            return Greater;
        } else if (x == y) {
            return Equal;
        } else {
            return Less;
        }
    }
}

let compare_int_abs = Comparable {
    self: int,
    compare: (x, y) -> {
        if (abs(x) > abs(y)) {
            return Greater;
        } else if (abs(x) == abs(y)) {
            return Equal;
        } else {
            return Less;
        }
    }
}
```
The downside, of course, is that if you want to call a generic function, you
need to specify which implementation of `Comparable` you want:

```
let is_equal_to_itself<C: Comparable>: (C::self) -> bool = (x) -> {
    return C::compare(x, x) == Equal;
}

// illegal!
let x: int = 5
let b = is_equal_to_itself(x)

// legal
let y: int = 10
let b = is_equal_to_itself<compare_int_abs>(y)
```

This would quickly become very annoying unless the language has good
generic inference. For example, maybe
`is_equal_to_itself(x)` should be legal if there's only one implementation of
`Comparable` for `int` in scope.

You might want to compose "traits":

```
comptype Add = compstruct {
    self: type;
    add: (self, self) -> self;
}

comptype Multiply = compstruct {
    self: type;
    multiply: (self, self) -> self;
}

comptype Field = compstruct {
    self: type;
    add: Add where add::self == self;
    multiply: Multiple where multiple::self == self:
}
```
You might want to write generic functions with multiple traits:

```
do_math<T: type, A: Add, M: Multiply where A::self == T and M::self == T>:
    (T, T, T) -> T = (a, b, c) -> {
        return A::add(M::multiply(a, b), c); 
    }
```

You might even want to do both:
```
field_implementation<T: type, A: Add, M: Multiply where A::self == T and M::self == T>
    = Field {
        self: T;
        add: A;
        multiply: M;
    }

my_field_impl: Field = field_implementation<int, int_add, int_mul>
```

I do have to admit, this is more verbose than existing languages (some would even
call the above code ugly). But maybe some syntactical sugar would make it more
palatable. For example, you could make `do_math<T: Add + Multiply>` desugar to
the above, and most people would be happy.

# Part 2: Enums

If we can make structs of compile-time types...why not enums?

```
compenum LoadFileMaybeAsync {
    Sync(string -> bytes),
    Async(string -> Future<bytes>)
}
```


