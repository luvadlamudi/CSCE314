export const questions = [
  // ── PATTERN MATCHING GOTCHAS ──────────────────────────────────────────
  {
    type: 'mcq',
    text: 'Which definition of (&&) is valid Haskell?\n\nA: b && b = b\nB: False && _ = False\n   True  && b = b',
    options: [
      'A only',
      'B only',
      'Both are valid',
      'Neither is valid',
    ],
    answer: 1,
    explanation: 'A is INVALID — patterns may not repeat variables. `b && b = b` uses `b` twice in one pattern. B is valid and is also more efficient: `False && _` avoids evaluating the second argument entirely.',
  },
  {
    type: 'mcq',
    text: 'Why is this definition of (&&) more efficient than listing all four cases?\n\nFalse && _ = False\nTrue  && b = b',
    options: [
      'It uses fewer lines of code',
      'The wildcard _ avoids evaluating the second argument when the first is False',
      'Haskell compiles pattern matching faster than guards',
      'It avoids boxing the Bool values',
    ],
    answer: 1,
    explanation: 'Because Haskell is lazy, `False && _` never evaluates the second argument — the `_` pattern means it is discarded. This is impossible when listing all four Bool combinations explicitly.',
  },
  {
    type: 'tf',
    text: 'The pattern `head x:_ = x` correctly extracts the head of a list.',
    options: ['True', 'False'],
    answer: 1,
    explanation: 'False. `x:xs` patterns MUST be parenthesized. Without parens, function application has higher priority than (:), so `head x:_ = x` is parsed as `(head x) : _ = x`, which is a type error. Correct: `head (x:_) = x`.',
  },
  {
    type: 'mcq',
    text: 'What does `f (_: (_, x):_) = x` pattern match?',
    options: [
      'A list of at least one element',
      'A list whose second element is a pair, binding x to its second component',
      'A nested list of booleans',
      'This pattern is invalid',
    ],
    answer: 1,
    explanation: 'This matches a list where the second element is a pair `(_, x)`. The first `_` ignores the list head, `(_, x)` destructures the second element\'s pair ignoring the first component, and the trailing `_` ignores the rest.',
  },
  // ── CONDITIONALS ─────────────────────────────────────────────────────
  {
    type: 'tf',
    text: 'In Haskell, the `else` branch of an `if` expression is optional.',
    options: ['True', 'False'],
    answer: 1,
    explanation: 'False. The else branch is ALWAYS required in Haskell. Both branches must also be of the same type. This differs from imperative languages where if-without-else is a statement.',
  },
  // ── OPERATOR SECTIONS ────────────────────────────────────────────────
  {
    type: 'mcq',
    text: 'What does `(1/) 4` evaluate to?',
    options: ['4.0', '0.25', '3.0', '-3.0'],
    answer: 1,
    explanation: '`(1/)` fixes the LEFT argument to 1. So `(1/) 4 = 1/4 = 0.25`. This is the reciprocation function. Compare: `(/1)` would be division BY 1.',
  },
  {
    type: 'mcq',
    text: 'What are `(#)`, `(x#)`, and `(#y)` called in Haskell?',
    options: ['Lambdas', 'Sections', 'Guards', 'Curried operators'],
    answer: 1,
    explanation: 'They are called SECTIONS. Sections allow operators to be partially applied: `(#)` is the full operator as a function, `(x#)` fixes the left argument to x, `(#y)` fixes the right argument to y.',
  },
  // ── LAMBDA ───────────────────────────────────────────────────────────
  {
    type: 'mcq',
    text: 'The definition `add x y = x + y` is formally equivalent to which lambda expression?',
    options: [
      '\\x y -> x + y',
      '\\x -> \\y -> x + y',
      '\\(x, y) -> x + y',
      'add = \\x -> x + x',
    ],
    answer: 1,
    explanation: 'A curried function `add x y = x + y` means `add = \\x -> (\\y -> x + y)`. Each argument is taken one at a time via nested lambdas. `\\x y -> x + y` is syntactic sugar for the same thing.',
  },
  // ── FOLDR DETAILS ────────────────────────────────────────────────────
  {
    type: 'mcq',
    text: 'What is the type of `foldr`?',
    options: [
      '(b -> a -> b) -> b -> [a] -> b',
      '(a -> b -> b) -> b -> [a] -> b',
      '(a -> a -> a) -> a -> [a] -> a',
      '(a -> b) -> [a] -> b',
    ],
    answer: 1,
    explanation: '`foldr :: (a -> b -> b) -> b -> [a] -> b`. The combining function takes the current LIST ELEMENT (a) first, then the ACCUMULATOR (b), and returns a new accumulator (b). Note foldl has the order swapped: (b -> a -> b).',
  },
  {
    type: 'mcq',
    text: 'What is the correct `foldr` definition of `reverse`?',
    options: [
      'foldr (:) []',
      'foldr (\\x xs -> x : xs) []',
      'foldr (\\x xs -> xs ++ [x]) []',
      'foldr (++) []',
    ],
    answer: 2,
    explanation: '`reverse = foldr (\\x xs -> xs ++ [x]) []`. Each element x is appended to the END of the accumulator xs, building the list backwards. `foldr (:) []` is the identity — it just copies the list.',
  },
  {
    type: 'mcq',
    text: 'What is the `foldl` definition of `length`?',
    options: [
      'foldl (\\_ n -> 1 + n) 0',
      'foldl (\\n _ -> n + 1) 0',
      'foldl (\\n x -> n + x) 0',
      'foldl (\\x n -> 1 + n) 0',
    ],
    answer: 1,
    explanation: 'With foldl, the ACCUMULATOR comes FIRST in the lambda: `\\n _ -> n + 1`. The element is ignored with `_`, and n (the count) is incremented. Compare foldr length: `\\_ n -> 1+n` where element is first.',
  },
  {
    type: 'mcq',
    text: 'What does `foldr (+) 0 [1,2,3]` expand to?',
    options: [
      '((0+1)+2)+3',
      '1+(2+(3+0))',
      '(1+2)+3+0',
      '0+(1+(2+3))',
    ],
    answer: 1,
    explanation: 'foldr is RIGHT-associative — it replaces each (:) with (+) and [] with 0. So `1:(2:(3:[]))` becomes `1+(2+(3+0)) = 6`. The right-most operation happens first.',
  },
  {
    type: 'mcq',
    text: 'What does `foldl (*) 1 [4,2,3]` expand to?',
    options: [
      '4*(2*(3*1))',
      '((1*4)*2)*3',
      '(4*2)*3*1',
      '1*(4*(2*3))',
    ],
    answer: 1,
    explanation: 'foldl is LEFT-associative — it builds up from the left: `((1*4)*2)*3 = (4*2)*3 = 8*3 = 24`. The accumulator starts at 1 and is updated left to right.',
  },
  // ── takeWhile / dropWhile ─────────────────────────────────────────────
  {
    type: 'mcq',
    text: 'What does `takeWhile even [2,4,7,8,10]` return?',
    options: ['[2,4,8,10]', '[2,4]', '[7,8,10]', '[2,4,7,8,10]'],
    answer: 1,
    explanation: 'takeWhile stops IMMEDIATELY when the predicate fails — it does NOT skip and continue. 7 fails `even`, so it stops there. Result: [2,4].',
  },
  {
    type: 'mcq',
    text: 'What does `dropWhile (<3) [1,2,3,4,1]` return?',
    options: ['[3,4]', '[3,4,1]', '[4,1]', '[1,2]'],
    answer: 1,
    explanation: '`dropWhile` drops elements while the predicate holds, then returns the ENTIRE remaining list including the element that failed. 3 fails (<3), so the result is [3,4,1] — not just [4,1].',
  },
  // ── FUNCTION COMPOSITION ─────────────────────────────────────────────
  {
    type: 'mcq',
    text: 'What is the type of `(.)`?',
    options: [
      '(a -> b) -> (a -> b) -> (a -> b)',
      '(b -> c) -> (a -> b) -> (a -> c)',
      '(a -> c) -> (a -> b) -> (b -> c)',
      '(a -> b) -> (b -> c) -> (a -> c)',
    ],
    answer: 1,
    explanation: '`(.) :: (b -> c) -> (a -> b) -> (a -> c)`. The FIRST argument is applied SECOND (to the result of g). So `(f . g) x = f (g x)` — g runs first, then f.',
  },
  {
    type: 'mcq',
    text: 'In `sumSquaresOfPos = sum . mapSquare . keepPos`, which function is applied first to the input list?',
    options: ['sum', 'mapSquare', 'keepPos', 'They all apply simultaneously'],
    answer: 2,
    explanation: 'Function composition applies RIGHT to LEFT. `(f . g . h) x = f (g (h x))`. So keepPos runs first (filtering), then mapSquare (squaring), then sum (totalling).',
  },
  // ── CLASSES & INSTANCES ──────────────────────────────────────────────
  {
    type: 'mcq',
    text: 'In the `Eq` class, what is the "minimal complete definition"?',
    options: [
      'You must define both == and /=',
      'You must define at least == or /=; the other has a default',
      'You must define == only; /= cannot be overridden',
      'You must define compare, from which == and /= are derived',
    ],
    answer: 1,
    explanation: 'The Eq class provides `x /= y = not (x == y)` and `x == y = not (x /= y)` as defaults. Defining just ONE of them breaks the mutual recursion. In practice you define `==` and get `/=` for free.',
  },
  {
    type: 'mcq',
    text: 'What does `instance Show a => Show [a] where ...` mean?',
    options: [
      'Lists are always showable regardless of element type',
      '[a] is an instance of Show only when a is also an instance of Show',
      'This makes the type variable a an instance of Show',
      'This only applies to lists of integers',
    ],
    answer: 1,
    explanation: '`Show a =>` is a CLASS CONSTRAINT on the instance. [a] is showable ONLY IF the element type a has a Show instance. Without this constraint, you could not call `show` on elements inside the list.',
  },
  {
    type: 'tf',
    text: 'When you `deriving Ord`, the ordering of constructors follows their order of declaration in the `data` statement.',
    options: ['True', 'False'],
    answer: 0,
    explanation: 'True. `deriving Ord` assigns ordering based on the order constructors appear in the declaration. For `data Weekday = Mon | Tue | ... | Sun`, Mon < Tue < ... < Sun.',
  },
  {
    type: 'mcq',
    text: 'What does `deriving Ord` require that must already be satisfied?',
    options: [
      'Nothing — Ord is standalone',
      'Show must be derived first',
      'Eq must be derived or implemented first',
      'Both Eq and Bounded',
    ],
    answer: 2,
    explanation: '`class (Eq a) => Ord a` — Ord is a SUBCLASS of Eq. You cannot have Ord without Eq. The class declaration enforces this dependency.',
  },
  // ── data vs type ─────────────────────────────────────────────────────
  {
    type: 'mcq',
    text: 'Which of these is ILLEGAL in Haskell?',
    options: [
      'type Pos = (Int, Int)',
      'type Trans = Pos -> Pos',
      'type Tree = (Int, [Tree])',
      'data Tree a = Leaf | Node a (Tree a) (Tree a)',
    ],
    answer: 2,
    explanation: '`type Tree = (Int, [Tree])` is ILLEGAL — type synonyms cannot be recursive because it would require infinite expansion at compile time. `data` declarations CAN be recursive because constructors act as stopping points.',
  },
  {
    type: 'tf',
    text: 'A value of type `Pos` (where `type Pos = (Int,Int)`) CANNOT be used where an `(Int,Int)` is expected.',
    options: ['True', 'False'],
    answer: 1,
    explanation: 'False. `type` creates a SYNONYM — Pos IS (Int,Int). They are completely interchangeable and the compiler treats them identically. No new type is created.',
  },
  // ── Maybe ─────────────────────────────────────────────────────────────
  {
    type: 'mcq',
    text: 'What is the type of `Nothing`?',
    options: ['Maybe', 'Maybe Int', 'Maybe a', 'Nothing has no type'],
    answer: 2,
    explanation: '`Nothing :: Maybe a` — it is POLYMORPHIC. The type variable `a` is unconstrained, so Nothing can be used as `Maybe Int`, `Maybe Bool`, or any `Maybe` type depending on context.',
  },
  // ── RECURSIVE DATA ───────────────────────────────────────────────────
  {
    type: 'mcq',
    text: 'Given `data Nat = Zero | Succ Nat`, what does `add (Succ Zero) (Succ Zero)` reduce to?',
    options: [
      'Succ (Succ Zero)',
      'Succ Zero',
      '2',
      'Zero',
    ],
    answer: 0,
    explanation: 'add (Succ m) n = Succ (add m n). So add (Succ Zero) (Succ Zero) = Succ (add Zero (Succ Zero)) = Succ (Succ Zero). This represents 1+1=2 in unary.',
  },
  {
    type: 'mcq',
    text: 'Given `treeFold f g Tnil = f` and `treeFold f g (Node x l r) = g x (treeFold f g l) (treeFold f g r)`, what does `treeFold 0 (\\x y z -> x + y + z)` compute on a tree?',
    options: [
      'The depth of the tree',
      'The number of nodes',
      'The sum of all node values',
      'The product of all node values',
    ],
    answer: 2,
    explanation: 'The combining function adds the node value x to the results from both subtrees y and z. The base case is 0. So treeFold 0 (\\x y z -> x+y+z) sums all values in the tree.',
  },
]
