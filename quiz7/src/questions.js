export const questions = [

  // ══════════════════════════════════════════════════════════════
  // CHAPTER 1 — BASICS
  // ══════════════════════════════════════════════════════════════
  {
    type: 'mcq',
    text: 'Haskell\'s ________ is what helps guarantee referential transparency.',
    options: ['Lazy evaluation', 'Immutability / purity', 'Static typing', 'Type inference'],
    answer: 1,
    explanation: 'Referential transparency means an expression always produces the same value. This is guaranteed by PURITY — no side effects, no mutable state. Immutability prevents destructive assignment, so `a = 1; a = 2` is illegal.',
  },
  {
    type: 'mcq',
    text: 'Which language was the first PURE functional language (no variable assignments)?',
    options: ['Lisp', 'ML', 'ISWIM', 'Miranda'],
    answer: 2,
    explanation: 'ISWIM (Peter Landin, 1960s) was the first PURE functional language — no assignments. Lisp (McCarthy, 1950s) had variable assignments. ML introduced type inference. Miranda was a later lazy language.',
  },
  {
    type: 'mcq',
    text: 'Given `omit x = 0` and `keep_going x = keep_going (x+1)`, what does `omit (keep_going 1)` return?',
    options: ['Loops forever', 'Error', '1', '0'],
    answer: 3,
    explanation: 'Haskell is LAZY — it only evaluates arguments when their value is needed. `omit` ignores its argument entirely, so `keep_going 1` is never evaluated. Result: 0.',
  },
  {
    type: 'mcq',
    text: 'What does `take (double 2) [1,2,3,4,5,6]` evaluate to, given `double x = x + x`?',
    options: ['[1,2,3,4,5,6]', '[1,2,3]', '[1,2,3,4]', '[1,2]'],
    answer: 2,
    explanation: '`double 2 = 4`. Then `take 4 [1,2,3,4,5,6] = [1,2,3,4]`.',
  },
  {
    type: 'mcq',
    text: 'What does `average ns = sum ns `div` length ns` return for `average [1,2,3,4,5]`?',
    options: ['2', '3', '2.5', '15'],
    answer: 1,
    explanation: '`sum [1,2,3,4,5] = 15`. `length [1,2,3,4,5] = 5`. `15 `div` 5 = 3`. Note: `div` is INTEGER division.',
  },
  {
    type: 'tf',
    text: 'Function application has the LOWEST precedence in Haskell, so `square 2 + 3` means `square (2+3)`.',
    options: ['True', 'False'],
    answer: 1,
    explanation: 'False. Function application has the HIGHEST precedence. So `square 2 + 3` means `(square 2) + 3 = 4 + 3 = 7`, NOT `square 5 = 25`.',
  },
  {
    type: 'mcq',
    text: 'What does the `$` operator do?',
    options: [
      'String concatenation',
      'Lowest-precedence function application — eliminates right-side parentheses',
      'Highest-precedence function application — forces evaluation',
      'Integer division',
    ],
    answer: 1,
    explanation: '`$` has the LOWEST precedence. `sum $ [1..5] ++ [6..10]` is equivalent to `sum ([1..5] ++ [6..10])`. It lets you avoid wrapping the right side in parentheses.',
  },
  {
    type: 'mcq',
    text: 'What is wrong with this Haskell script?\n\nN = a `div` length xs\n where\n  a = 10\n  xs = [1,2,3,4,5]',
    options: [
      'N must be lowercase: `n`',
      'Backtick is wrong — use single quotes',
      'Nothing is wrong',
      'xs cannot be a list in a where clause',
    ],
    answer: 0,
    explanation: 'Function and variable names must begin with a LOWERCASE letter. `N` is uppercase — that\'s reserved for type/constructor names. Fix: `n = a `div` length xs`.',
  },
  {
    type: 'mcq',
    text: 'Which two GHCi commands reload a previously loaded script?',
    options: [':refresh and :reload', ':r and :reload', ':reload and :load', ':reset and :r'],
    answer: 1,
    explanation: '`:reload` (full) and `:r` (abbreviated) both reload the current script. GHCi does NOT auto-detect file changes — you must reload manually.',
  },
  {
    type: 'mcq',
    text: 'Which of these is a valid way to define `last` using library functions?',
    options: [
      'last xs = tail (reverse xs)',
      'last xs = head (reverse xs)',
      'last xs = xs !! (length xs)',
      'last xs = drop (length xs) xs',
    ],
    answer: 1,
    explanation: '`last xs = head (reverse xs)`. Reversing puts the last element first, then head grabs it. The `!!` version needs index `length xs - 1` (0-indexed), not `length xs`.',
  },

  // ══════════════════════════════════════════════════════════════
  // CHAPTER 2 — TYPES
  // ══════════════════════════════════════════════════════════════
  {
    type: 'mcq',
    text: 'What is the type of `("Howdy,":"all":[])`?',
    options: ['(String, String)', '[Char]', '[[Char]]', '(Char, Char)'],
    answer: 2,
    explanation: '"Howdy," and "all" are both Strings, which are [Char]. A list of Strings is [[Char]]. The cons operator (:) and [] confirm this is a list: `["Howdy,", "all"] :: [[Char]]`.',
  },
  {
    type: 'mcq',
    text: 'What is the type of `f` where `f x = x `div` 2`?',
    options: ['Int -> Int', 'Num a => a -> a', 'Integral a => a -> a', 'Float -> Float'],
    answer: 2,
    explanation: '`div` requires the `Integral` type class (works on Int, Integer, etc. but NOT Float). So `f :: Integral a => a -> a`. It\'s polymorphic over all integral types, not just Int.',
  },
  {
    type: 'mcq',
    text: 'What is the type of `\\x y -> x <= y`?',
    options: [
      'a -> a -> Bool',
      'Eq a => a -> a -> Bool',
      'Ord a => a -> a -> Bool',
      'Num a => a -> a -> Bool',
    ],
    answer: 2,
    explanation: '`<=` is defined in the `Ord` class (not `Eq`). So the type is `Ord a => a -> a -> Bool`. It works on any ordered type.',
  },
  {
    type: 'mcq',
    text: 'What are the types of `['a','b','c']`, `('a','b','c')`, and `[(False,\'0\'),(True,\'1\')]`?',
    options: [
      '[Char], (Char,Char,Char), [(Bool,Char)]',
      'String, (Char,Char,Char), [[Bool]]',
      '[Char], [Char], [(Bool,Char)]',
      'String, (Char,Char,Char), [(Char,Bool)]',
    ],
    answer: 0,
    explanation: '`[\'a\',\'b\',\'c\'] :: [Char]` (a list). `(\'a\',\'b\',\'c\') :: (Char,Char,Char)` (a tuple — type encodes size). `[(False,\'0\'),(True,\'1\')] :: [(Bool,Char)]` (list of pairs).',
  },
  {
    type: 'mcq',
    text: 'What is the type of `[tail, init, reverse]`?',
    options: [
      '[[a] -> a]',
      '[[a] -> [a]]',
      '[a -> a]',
      'This expression is a type error',
    ],
    answer: 1,
    explanation: '`tail :: [a] -> [a]`, `init :: [a] -> [a]`, `reverse :: [a] -> [a]`. All three have the SAME type `[a] -> [a]`, so they can form a list: `[[a] -> [a]]`.',
  },
  {
    type: 'mcq',
    text: 'What is the type of `twice f x = f (f x)`?',
    options: [
      '(a -> b) -> a -> b',
      '(a -> a) -> a -> a',
      'a -> a -> a',
      '(a -> b) -> b -> a',
    ],
    answer: 1,
    explanation: '`f` is applied twice to `x`, so the OUTPUT of `f` must be the same type as the INPUT. Therefore f :: a -> a. twice :: (a -> a) -> a -> a.',
  },
  {
    type: 'mcq',
    text: 'What is the type of `pair x y = (x, y)`?',
    options: [
      'a -> a -> (a,a)',
      'a -> b -> (b,a)',
      'a -> b -> (a,b)',
      '(a,b) -> (a,b)',
    ],
    answer: 2,
    explanation: '`pair :: a -> b -> (a,b)`. x and y can be different types, so two separate type variables a and b are needed. Result is a tuple pairing them.',
  },
  {
    type: 'tf',
    text: 'The type of a list encodes its length.',
    options: ['True', 'False'],
    answer: 1,
    explanation: 'False. `[Bool]` could be [], [True], [False,True], etc. The list type only encodes the ELEMENT type. Contrast with tuples: `(Bool,Bool,Bool)` always has exactly 3 elements.',
  },
  {
    type: 'mcq',
    text: 'How does `->` associate in Haskell type signatures?',
    options: ['Left', 'Right', 'Neither — it is non-associative', 'Depends on context'],
    answer: 1,
    explanation: '`->` associates to the RIGHT. So `Int -> Int -> Int` means `Int -> (Int -> Int)`. This reflects currying: a two-argument function returns another function.',
  },
  {
    type: 'mcq',
    text: 'What does `sum [\'a\',\'b\',\'c\']` produce?',
    options: ['A runtime error', '294', 'A type error at compile time', '"abc"'],
    answer: 2,
    explanation: '`sum :: Num a => [a] -> a`. Char is NOT a numeric type (not in the Num class). This is a TYPE ERROR caught at compile time, not a runtime error.',
  },

  // ══════════════════════════════════════════════════════════════
  // CHAPTER 3 — FUNCTIONS (safetail, list patterns, comprehensions)
  // ══════════════════════════════════════════════════════════════
  {
    type: 'mcq',
    text: 'Define `safetail` using a conditional expression (using `null` and `tail`):',
    options: [
      'safetail xs = if xs == [] then xs else tail xs',
      'safetail xs = if null xs then [] else tail xs',
      'safetail xs = if xs then [] else tail xs',
      'safetail [] = []; safetail xs = tail xs',
    ],
    answer: 1,
    explanation: '`safetail xs = if null xs then [] else tail xs`. Using `null` (not `== []`) is more general. The else branch calls tail which is safe since we know the list is non-empty.',
  },
  {
    type: 'mcq',
    text: 'Define `safetail` using guarded equations (using `null` and `tail`):',
    options: [
      'safetail xs\n  | xs == [] = []\n  | otherwise = tail xs',
      'safetail xs\n  | null xs = []\n  | otherwise = tail xs',
      'safetail\n  | null = []\n  | otherwise = tail',
      'safetail xs = null xs -> [] | tail xs',
    ],
    answer: 1,
    explanation: '`safetail xs | null xs = [] | otherwise = tail xs`. Guards test conditions top-to-bottom. `null xs` checks if empty, `otherwise` (= True) catches all other cases.',
  },
  {
    type: 'mcq',
    text: 'Define `safetail` using pattern matching:',
    options: [
      'safetail xs = if xs == [] then xs else tail xs',
      'safetail [] = []\nsafetail xs = tail xs',
      'safetail [] = []\nsafetail (_:xs) = xs',
      'safetail (x:xs) = xs\nsafetail _ = []',
    ],
    answer: 2,
    explanation: '`safetail [] = []` handles the empty case. `safetail (_:xs) = xs` handles non-empty — the head is ignored with `_` and xs (the tail) is returned directly. Option B also works but C is more precise.',
  },
  {
    type: 'mcq',
    text: 'Given `xs = [3,2,1]`, what does `zip xs (tail xs)` return?',
    options: [
      '[(3,2),(2,1),(1,?)]',
      '[(3,2),(2,1)]',
      '[(2,3),(1,2)]',
      '[(3,3),(2,2),(1,1)]',
    ],
    answer: 1,
    explanation: '`tail [3,2,1] = [2,1]`. `zip [3,2,1] [2,1]` stops at the shorter list: `[(3,2),(2,1)]`. This is the classic "adjacent pairs" pattern.',
  },
  {
    type: 'mcq',
    text: 'What does `[x^2 | x <- [1..6], even x]` return?',
    options: ['[1,4,9,16,25,36]', '[4,16,36]', '[1,9,25]', '[2,4,6]'],
    answer: 1,
    explanation: 'The guard `even x` keeps only x = 2, 4, 6. Squaring: 4, 16, 36. Result: [4,16,36].',
  },
  {
    type: 'mcq',
    text: 'What does `concat [[1,2],[3],[4,5,6]]` return, given `concat xss = [x | xs <- xss, x <- xs]`?',
    options: ['[[1,2],[3],[4,5,6]]', '[1,3,4]', '[1,2,3,4,5,6]', 'Error'],
    answer: 2,
    explanation: 'The outer generator iterates sub-lists, the inner generator iterates elements within each. Together they flatten: [1,2,3,4,5,6].',
  },

  // ══════════════════════════════════════════════════════════════
  // CHAPTER 4 — HIGHER-ORDER FUNCTIONS
  // ══════════════════════════════════════════════════════════════
  {
    type: 'mcq',
    text: 'Given `g = (filter even) . (map (+1))`, what is the type of `g`?',
    options: [
      '[Int] -> [Int]',
      'Num a => [a] -> [a]',
      'Integral a => [a] -> [a]',
      'Ord a => [a] -> [a]',
    ],
    answer: 2,
    explanation: '`map (+1)` requires Num. `filter even` requires Integral (even :: Integral a => a -> Bool). The stricter constraint wins: `g :: Integral a => [a] -> [a]`.',
  },
  {
    type: 'mcq',
    text: 'Given `g = (filter even) . (map (+1))`, what does `g [1..5]` return?',
    options: ['[2,4]', '[2,4,6]', '[1,3,5]', '[2,3,4,5,6]'],
    answer: 1,
    explanation: '`map (+1) [1..5] = [2,3,4,5,6]`. Then `filter even [2,3,4,5,6] = [2,4,6]`.',
  },
  {
    type: 'mcq',
    text: 'What is `foldr (:) [] [1,2,3]`?',
    options: ['[3,2,1]', '[1,2,3]', '[]', 'Error'],
    answer: 1,
    explanation: 'foldr replaces each (:) with (:) and [] with []. So the list is unchanged: [1,2,3]. This is the list identity — `foldr (:) []` copies a list.',
  },
  {
    type: 'mcq',
    text: 'What is `foldl (\\acc x -> acc ++ [x]) [] [1,2,3]`?',
    options: ['[3,2,1]', '[1,2,3]', '[[1],[2],[3]]', 'Error'],
    answer: 1,
    explanation: 'foldl builds left-to-right appending each element: ([] ++ [1]) = [1], then ([1] ++ [2]) = [1,2], then ([1,2] ++ [3]) = [1,2,3].',
  },
  {
    type: 'mcq',
    text: 'What does `all even [2,4,7,8]` return?',
    options: ['True', 'False', 'Error', '[2,4,8]'],
    answer: 1,
    explanation: '`all` returns True only if EVERY element satisfies the predicate. 7 is odd, so `even 7 = False`. `all even [2,4,7,8] = False`.',
  },

  // ══════════════════════════════════════════════════════════════
  // CHAPTER 5 — DATA TYPES
  // ══════════════════════════════════════════════════════════════
  {
    type: 'mcq',
    text: 'Given `data Person = Person String Int`, what is the type of the constructor `Person`?',
    options: [
      'Person',
      'String -> Int -> Person',
      'Person -> String -> Int',
      '(String, Int) -> Person',
    ],
    answer: 1,
    explanation: 'Constructors with arguments act as functions. `Person :: String -> Int -> Person`. It takes a String (name) and Int (age) and constructs a Person value.',
  },
  {
    type: 'mcq',
    text: 'What does `eval (Add (Val 2) (Mul (Val 3) (Val 4)))` return?',
    options: ['20', '14', '24', '9'],
    answer: 1,
    explanation: '`eval (Mul (Val 3) (Val 4)) = 12`. Then `eval (Add (Val 2) ...) = 2 + 12 = 14`.',
  },
  {
    type: 'mcq',
    text: 'Given `data Weekday = Mon|Tue|Wed|Thu|Fri|Sat|Sun deriving (Ord, Enum, Bounded)`, what does `[Wed .. Fri]` return?',
    options: ['[Wed,Thu,Fri]', '[Mon,Tue,Wed,Thu,Fri]', '[Wed,Fri]', 'Error'],
    answer: 0,
    explanation: 'Deriving Enum enables range syntax. The range [Wed..Fri] generates constructors in declaration order from Wed to Fri: [Wed,Thu,Fri].',
  },
  {
    type: 'tf',
    text: '`data` declarations CAN be recursive but `type` declarations CANNOT.',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'True. `data Nat = Zero | Succ Nat` is valid — constructors act as base cases stopping infinite expansion. `type Tree = (Int, [Tree])` is ILLEGAL because type synonyms expand infinitely at compile time.',
  },
  {
    type: 'mcq',
    text: 'What is the purpose of `Maybe a` in Haskell?',
    options: [
      'To allow functions to have optional arguments',
      'To represent computations that may fail, making the failure explicit in the type',
      'To create lazy values that are evaluated only when needed',
      'To allow polymorphic functions to skip type checking',
    ],
    answer: 1,
    explanation: '`Maybe a` makes failure explicit: `Nothing` signals failure, `Just x` signals success with value x. This turns partial functions (that crash) into total functions that return `Maybe`. The caller is forced to handle both cases.',
  },

  // ══════════════════════════════════════════════════════════════
  // CHAPTER 6 — MODULES
  // ══════════════════════════════════════════════════════════════
  {
    type: 'mcq',
    text: 'What are the TWO main purposes of modules in Haskell?',
    options: [
      'To speed up compilation and enable parallel execution',
      'To control namespaces and to create abstract data types',
      'To define type classes and to manage IO',
      'To enable lazy evaluation and handle exceptions',
    ],
    answer: 1,
    explanation: 'Modules serve two key purposes: (1) NAMESPACE CONTROL — avoid name conflicts between different parts of a program; (2) ABSTRACT DATA TYPES — hide implementation details by only exporting an interface.',
  },
  {
    type: 'mcq',
    text: 'In this module declaration: `module Tree (Tree(Leaf,Branch), fringe) where` — what does `Tree(..)` mean as a shorthand?',
    options: [
      'Export only the type, not the constructors',
      'Export the type and ALL its constructors',
      'Import everything from Tree',
      'Make Tree an abstract type with hidden constructors',
    ],
    answer: 1,
    explanation: '`Tree(..)` is shorthand for exporting the type name AND all its constructors. It\'s equivalent to `Tree(Leaf,Branch)` if those are the only two constructors.',
  },
  {
    type: 'mcq',
    text: 'What does `import Prelude hiding (length, sum)` do?',
    options: [
      'Imports only length and sum from Prelude',
      'Imports everything EXCEPT length and sum from Prelude',
      'Hides the Prelude module from other imports',
      'Creates local definitions for length and sum',
    ],
    answer: 1,
    explanation: '`hiding` excludes specific names. This imports everything from Prelude EXCEPT length and sum — useful when you want to define your own versions of those functions.',
  },
  {
    type: 'mcq',
    text: 'Why use `import qualified Fringe (fringe)`?',
    options: [
      'To import fringe without its type constraints',
      'To resolve a name conflict — access it as `Fringe.fringe` to distinguish from another `fringe`',
      'To make fringe lazy',
      'To prevent fringe from being exported',
    ],
    answer: 1,
    explanation: 'Qualified imports prefix imported names with the module name (e.g. `Fringe.fringe`). This resolves conflicts when two modules export the same name.',
  },
  {
    type: 'mcq',
    text: 'In the Stack ADT: `module Stack (StkType, push, pop, top, empty) where` — why are the internal constructors NOT exported?',
    options: [
      'Constructors can never be exported from modules',
      'Information hiding — users cannot depend on the internal representation, so it can change freely',
      'It saves compilation time',
      'Constructors are always automatically private',
    ],
    answer: 1,
    explanation: 'This is INFORMATION HIDING — the core benefit of ADTs. By not exporting constructors, the internal representation (list vs recursive type) can change without breaking any code that uses the Stack module.',
  },
  {
    type: 'mcq',
    text: 'Given the Stack ADT, what does `push 3 . push 4 . push 2 $ empty` produce?',
    options: [
      'A stack with 2 on top, then 4, then 3',
      'A stack with 3 on top, then 4, then 2',
      'A stack with 4 on top',
      'An empty stack',
    ],
    answer: 1,
    explanation: 'Function composition applies right to left. First: `push 2 empty` (2 on stack). Then: `push 4 (...)` (4 on top). Then: `push 3 (...)` (3 on top). Final stack top-to-bottom: 3, 4, 2.',
  },

  // ══════════════════════════════════════════════════════════════
  // CHAPTER 7 — IO
  // ══════════════════════════════════════════════════════════════
  {
    type: 'mcq',
    text: 'What are the three basic IO actions, and what do they do?',
    options: [
      'getChar (reads char, echoes it, IO Char), putChar (writes char, IO ()), return (wraps pure value, no effect, IO a)',
      'getChar (reads char, IO Char), putChar (writes char, IO Char), return (exits the action)',
      'getLine (reads line, IO String), putStr (writes string, IO ()), return (wraps value, IO a)',
      'readIO (reads value, IO a), writeIO (writes value, IO ()), pureIO (wraps value, IO a)',
    ],
    answer: 0,
    explanation: 'The three primitives: `getChar :: IO Char` (reads one char, echoes to screen), `putChar :: Char -> IO ()` (writes one char, returns nothing), `return :: a -> IO a` (wraps a pure value, no side effects).',
  },
  {
    type: 'mcq',
    text: 'Given this act:\n\ndo putStr "Enter a string: "\n   xs <- getLine\n   putStrLn (show (length xs))\n\nWhat happens if the user types "hello"?',
    options: [
      'Prints: Enter a string: hello5',
      'Prints: Enter a string: \\nhello\\n5',
      'Prints: Enter a string: \\n then 5',
      'Prints: 5',
    ],
    answer: 2,
    explanation: 'putStr prints "Enter a string: " (no newline). User types "hello" and presses Enter. xs = "hello". `length xs = 5`. `show 5 = "5"`. `putStrLn "5"` prints "5" then a newline.',
  },
  {
    type: 'mcq',
    text: 'What is the type of `main` in a Haskell program?',
    options: ['IO String', 'IO Int', 'IO ()', '() -> IO ()'],
    answer: 2,
    explanation: '`main :: IO ()`. Every Haskell program is a single IO action called main. It performs effects but has no meaningful return value (the () empty tuple).',
  },

  // ══════════════════════════════════════════════════════════════
  // CHAPTER 8/12 — FUNCTORS, APPLICATIVES, MONADS
  // ══════════════════════════════════════════════════════════════
  {
    type: 'mcq',
    text: 'Given `data Tree a = Leaf a | Node (Tree a) (Tree a)`, write the Functor instance for Tree. What does `fmap g (Node l r)` return?',
    options: [
      'Node l r',
      'Node (fmap g l) (fmap g r)',
      'fmap g (Node l r)',
      'Node (g l) (g r)',
    ],
    answer: 1,
    explanation: '`fmap g (Node l r) = Node (fmap g l) (fmap g r)`. The function is applied recursively to both subtrees. The base case is `fmap g (Leaf x) = Leaf (g x)`.',
  },
  {
    type: 'mcq',
    text: 'What does `pure (+) <*> [1,3] <*> [2,5]` produce?',
    options: ['[3,8]', '[3,6,5,8]', '[1,3,2,5]', '[6,15]'],
    answer: 1,
    explanation: 'List `<*>` is Cartesian product. `pure (+) = [(+)]`. `[(+)] <*> [1,3] = [(+1),(+3)]`. `[(+1),(+3)] <*> [2,5] = [3,6,5,8]` — each function applied to each value.',
  },
  {
    type: 'mcq',
    text: 'Given the Tree Monad: `(Leaf x) >>= f = f x` and `(Node l r) >>= f = Node (l >>= f) (r >>= f)`, what does `Node (Leaf 2) (Leaf 3) >>= (\\x -> Leaf (even x))` return?',
    options: [
      'Node (Leaf True) (Leaf True)',
      'Node (Leaf True) (Leaf False)',
      'Leaf False',
      'Node (Leaf False) (Leaf True)',
    ],
    answer: 1,
    explanation: '`Leaf 2 >>= f = f 2 = Leaf (even 2) = Leaf True`. `Leaf 3 >>= f = f 3 = Leaf (even 3) = Leaf False`. Combined: `Node (Leaf True) (Leaf False)`.',
  },
  {
    type: 'mcq',
    text: 'Which monad law says: `return x >>= f = f x`?',
    options: ['Right Identity', 'Left Identity', 'Associativity', 'Composition'],
    answer: 1,
    explanation: 'LEFT Identity: `return x >>= f = f x`. Wrapping x in return then immediately binding has NO effect — same as just calling f on x directly.',
  },
  {
    type: 'mcq',
    text: 'What is the key difference between `fmap`, `<*>`, and `>>=`?',
    options: [
      'fmap works on lists, <*> works on Maybe, >>= works on IO',
      'fmap applies a pure function to wrapped value; <*> applies wrapped function to wrapped value; >>= lets the result of one computation determine the next',
      'fmap is lazy, <*> is strict, >>= is both',
      'They are all equivalent — just different syntax',
    ],
    answer: 1,
    explanation: 'fmap: `(a->b) -> f a -> f b` — pure function, wrapped value. <*>: `f(a->b) -> f a -> f b` — BOTH function and value are wrapped. >>=: `m a -> (a->m b) -> m b` — the VALUE inside determines what COMPUTATION comes next.',
  },

  // ══════════════════════════════════════════════════════════════
  // CROSS-CUTTING CONCEPTS
  // ══════════════════════════════════════════════════════════════
  {
    type: 'mcq',
    text: 'What is the type of `second xs = head (tail xs)`?',
    options: ['[a] -> a', '[a] -> [a]', 'a -> a', '[a] -> Maybe a'],
    answer: 0,
    explanation: '`tail :: [a] -> [a]` returns a list. `head :: [a] -> a` returns the first element. So `second :: [a] -> a`. It extracts the second element of a list.',
  },
  {
    type: 'mcq',
    text: 'What is the type of `palindrome xs = reverse xs == xs`?',
    options: [
      '[a] -> Bool',
      'Eq a => [a] -> Bool',
      'Ord a => [a] -> Bool',
      'String -> Bool',
    ],
    answer: 1,
    explanation: '`==` requires `Eq`. `reverse :: [a] -> [a]` is fine, but comparing two lists with `==` requires the elements to be in `Eq`. So `palindrome :: Eq a => [a] -> Bool`.',
  },
  {
    type: 'mcq',
    text: 'What is the Haskell class hierarchy order from most general to most specific?',
    options: [
      'Monad -> Applicative -> Functor',
      'Functor -> Applicative -> Monad',
      'Eq -> Ord -> Num',
      'Num -> Ord -> Eq',
    ],
    answer: 1,
    explanation: 'Functor is most general (just fmap). Applicative extends Functor (adds pure and <*>). Monad extends Applicative (adds >>= and return). Every Monad is also an Applicative and Functor.',
  },
  {
    type: 'mcq',
    text: 'Which of the following best describes the purpose of `treeFold f g`?',
    options: [
      'Sorts the tree by applying f to leaves and g to nodes',
      'Replaces every Leaf constructor with f and every Node constructor with g',
      'Folds the tree into a list using f and g as generators',
      'Applies g to the root and f to all other nodes',
    ],
    answer: 1,
    explanation: 'treeFold is the tree equivalent of foldr. It replaces every `Leaf x` with `f x` (or just `f` for the Tnil variant) and every `Node x l r` with `g x l r`. This is the uniform fold pattern for recursive types.',
  },
  {
    type: 'mcq',
    text: 'What does `read "[1,2,3]" :: [Int]` return?',
    options: [
      '"[1,2,3]"',
      '[1,2,3]',
      'Error — read does not work on lists',
      '[\'1\',\'2\',\'3\']',
    ],
    answer: 1,
    explanation: '`read :: Read a => String -> a` parses a String into a value. With the type annotation `:: [Int]`, it parses "[1,2,3]" into the actual list [1,2,3] :: [Int].',
  },
  {
    type: 'tf',
    text: 'In Haskell, `x `f` y` is syntactic sugar for `f x y` for any two-argument function f.',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'True. Backtick syntax turns any two-argument function into an infix operator. `5 `div` 2 = div 5 2`. Conversely, any infix operator can be used as a function in parentheses: `(+) 5 2 = 7`.',
  },
  {
    type: 'mcq',
    text: 'What is the result of step-by-step evaluation: `f [3,2,4,1,5]` using quicksort `f [] = []; f (x:xs) = f ys ++ [x] ++ f zs where ys = [a|a<-xs,a<=x]; zs = [b|b<-xs,b>x]`?',
    options: ['[5,4,3,2,1]', '[3,2,4,1,5]', '[1,2,3,4,5]', '[1,3,2,4,5]'],
    answer: 2,
    explanation: 'pivot=3, ys=[2,1], zs=[4,5]. f [2,1] = [1,2], f [4,5] = [4,5]. Result: [1,2] ++ [3] ++ [4,5] = [1,2,3,4,5]. Quicksort sorts ascending.',
  },
]
