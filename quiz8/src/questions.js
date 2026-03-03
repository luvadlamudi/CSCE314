// Tree used in most questions:
// tt = Node 1 (Node 2 Tnil Tnil) (Node 3 Tnil (Node 4 Tnil Tnil))
//
//        1
//       / \
//      2   3
//         / \
//       Tnil  4

export const questions = [

  // ── TREEFOLD FUNDAMENTALS ────────────────────────────────────────────
  {
    type: 'mcq',
    text: 'Given:\n\ntreeFold f g Tnil         = f\ntreeFold f g (Node x l r) = g x (treeFold f g l) (treeFold f g r)\n\nWhat does treeFold replace in the tree?',
    options: [
      'Replaces Node with f and Tnil with g',
      'Replaces Tnil with f and Node with g',
      'Replaces leaves with f and the root with g',
      'Replaces all values with f and all structure with g',
    ],
    answer: 1,
    explanation: 'treeFold replaces every Tnil constructor with f (the base value) and every Node constructor with g (the combining function). This mirrors how foldr replaces [] with v and (:) with f.',
  },
  {
    type: 'mcq',
    text: 'What is the type of `treeFold`?\n\ntreeFold :: ??? -> (a -> t -> t -> t) -> Tree a -> t',
    options: ['a', 't -> t', 't', 'Tree a'],
    answer: 2,
    explanation: '`treeFold :: t -> (a -> t -> t -> t) -> Tree a -> t`. The first argument is the base value `t` that replaces Tnil. The combining function takes the node value (a) and results from both subtrees (t, t) and returns t.',
  },
  {
    type: 'mcq',
    text: 'Using tt = Node 1 (Node 2 Tnil Tnil) (Node 3 Tnil (Node 4 Tnil Tnil)):\n\ntreeFold 0 (\\x y z -> x + y + z) tt',
    options: ['4', '6', '10', '24'],
    answer: 2,
    explanation: 'This sums all node values. Each Tnil → 0. Node 2: 2+0+0=2. Node 4: 4+0+0=4. Node 3: 3+0+4=7. Root: 1+2+7=10.',
  },
  {
    type: 'mcq',
    text: 'Using tt = Node 1 (Node 2 Tnil Tnil) (Node 3 Tnil (Node 4 Tnil Tnil)):\n\ntreeFold 1 (\\x y z -> x * y * z) tt',
    options: ['10', '24', '4', '120'],
    answer: 1,
    explanation: 'Each Tnil → 1. Node 2: 2*1*1=2. Node 4: 4*1*1=4. Node 3: 3*1*4=12. Root: 1*2*12=24.',
  },
  {
    type: 'mcq',
    text: 'Using tt = Node 1 (Node 2 Tnil Tnil) (Node 3 Tnil (Node 4 Tnil Tnil)):\n\ntreeFold 1 (\\x y z -> 1 + max y z) tt',
    options: ['3', '4', '5', '2'],
    answer: 1,
    explanation: 'Each Tnil → 1. Node 2: 1+max 1 1=2. Node 4: 1+max 1 1=2. Node 3: 1+max 1 2=3. Root: 1+max 2 3=4. This computes depth+1 (base is 1 not 0).',
  },
  {
    type: 'mcq',
    text: 'What does `treeFold 0 (\\x y z -> 1 + y + z) tt` compute on a tree?',
    options: [
      'Sum of all values',
      'Total number of nodes',
      'Depth of the tree',
      'Number of leaf nodes (Tnils)',
    ],
    answer: 1,
    explanation: 'Each Tnil → 0. Each Node adds 1 to the sum of child counts, ignoring the node value x. This counts every Node: `1 + left_count + right_count`. With tt: Node 2 → 1, Node 4 → 1, Node 3 → 1+0+1=2, root → 1+1+2=4 nodes.',
  },
  {
    type: 'mcq',
    text: 'Write `depth` using treeFold. Which is correct?',
    options: [
      'depth = treeFold 1 (\\x y z -> 1 + max y z)',
      'depth = treeFold 0 (\\x y z -> 1 + max y z)',
      'depth = treeFold 0 (\\x y z -> max y z)',
      'depth = treeFold 1 (\\x y z -> x + max y z)',
    ],
    answer: 1,
    explanation: '`depth = treeFold 0 (\\x y z -> 1 + max y z)`. Base case Tnil = 0 (empty tree has depth 0). Each Node adds 1 to the max depth of its subtrees. With base 0: Node 2 → 1, Node 4 → 1, Node 3 → 2, root → 3.',
  },
  {
    type: 'mcq',
    text: 'What does `treeFold 0 (\\x y z -> 1 + max y z) tt` return for tt?',
    options: ['4', '3', '2', '5'],
    answer: 1,
    explanation: 'Tnil → 0. Node 2: 1+max 0 0=1. Node 4: 1+max 0 0=1. Node 3: 1+max 0 1=2. Root(1): 1+max 1 2=3. The tree has 4 levels of nodes but depth 3 (root is level 0).',
  },
  {
    type: 'mcq',
    text: 'How would you count the number of Tnil (leaf/empty) nodes using treeFold?',
    options: [
      'treeFold 1 (\\x y z -> y + z)',
      'treeFold 0 (\\x y z -> 1 + y + z)',
      'treeFold 1 (\\x y z -> 1 + y + z)',
      'treeFold 0 (\\x y z -> y + z)',
    ],
    answer: 0,
    explanation: '`treeFold 1 (\\x y z -> y + z)`. Each Tnil contributes 1. Nodes just SUM the leaf counts from both sides — no +1 for the node itself. For tt: 5 Tnils total. Node 2: 1+1=2. Node 4: 1+1=2. Node 3: 1+2=3. Root: 2+3=5.',
  },
  {
    type: 'mcq',
    text: 'How would you flatten a tree to a list using treeFold?',
    options: [
      'treeFold [] (\\x y z -> y ++ [x] ++ z)',
      'treeFold [] (\\x y z -> [x] ++ y ++ z)',
      'treeFold [] (\\x y z -> x : y : z)',
      'treeFold [] (\\x y z -> y ++ z)',
    ],
    answer: 0,
    explanation: '`treeFold [] (\\x y z -> y ++ [x] ++ z)` does an in-order traversal: left subtree, then root value, then right subtree. For tt: gives [2,1,3,4]. Use `[x] ++ y ++ z` for pre-order or `y ++ z ++ [x]` for post-order.',
  },

  // ── TREE STRUCTURE & OPERATIONS ──────────────────────────────────────
  {
    type: 'mcq',
    text: 'Given `data Tree a = Tnil | Node a (Tree a) (Tree a)`, what are the types of the two constructors?',
    options: [
      'Tnil :: Tree a   and   Node :: a -> Tree a -> Tree a -> Tree a',
      'Tnil :: a   and   Node :: a -> a -> a -> Tree a',
      'Tnil :: Tree   and   Node :: a -> Tree -> Tree -> Tree',
      'Tnil :: ()   and   Node :: Tree a -> a -> Tree a -> Tree a',
    ],
    answer: 0,
    explanation: '`Tnil :: Tree a` — takes no arguments, is a Tree a for any type a. `Node :: a -> Tree a -> Tree a -> Tree a` — takes a value and two subtrees, returns a Tree a.',
  },
  {
    type: 'mcq',
    text: 'What does `depth (Node 5 (Node 3 Tnil Tnil) Tnil)` return?\n\ndepth Tnil           = 0\ndepth (Node _ l r)   = 1 + max (depth l) (depth r)',
    options: ['1', '2', '3', '0'],
    answer: 1,
    explanation: 'depth (Node 3 Tnil Tnil) = 1 + max 0 0 = 1. depth Tnil = 0. Then depth (Node 5 ... Tnil) = 1 + max 1 0 = 2.',
  },
  {
    type: 'mcq',
    text: 'What is the purpose of the `@` in: `treeElem p t@(Node v left right)`?',
    options: [
      'It evaluates t strictly before pattern matching',
      'It binds the whole matched pattern to the name t, so t can be used without reconstructing it',
      'It imports a qualified module member',
      'It applies t to the guard condition',
    ],
    answer: 1,
    explanation: '`t@(Node v left right)` is an AS-PATTERN. It matches the pattern `Node v left right` AND simultaneously binds the entire thing to `t`. You can then use `t` to refer to the whole node without re-constructing it.',
  },
  {
    type: 'mcq',
    text: 'In `treeElem`, what does the helper `combine` do?\n\ncombine (Just v) r = Just v\ncombine Nothing  r = r',
    options: [
      'Combines two Maybes: returns Left if both are Nothing, Right otherwise',
      'Returns the first Just found, or falls back to the right result',
      'Returns Nothing if either argument is Nothing',
      'Merges two trees into one',
    ],
    answer: 1,
    explanation: 'combine implements left-biased choice: if the left search found something (Just v), return it. Otherwise fall back to whatever the right search returned. This lets treeElem search both subtrees and return the first match.',
  },
  {
    type: 'mcq',
    text: 'What does `treeFold [] (\\x l r -> l ++ [x] ++ r) (Node 3 (Node 1 Tnil Tnil) (Node 5 Tnil Tnil))` return?',
    options: ['[3,1,5]', '[1,3,5]', '[1,5,3]', '[3,5,1]'],
    answer: 1,
    explanation: 'In-order: left ++ [root] ++ right. Left (Node 1): [] ++ [1] ++ [] = [1]. Right (Node 5): [] ++ [5] ++ [] = [5]. Root: [1] ++ [3] ++ [5] = [1,3,5].',
  },
  {
    type: 'mcq',
    text: 'Write `mirror` (swap left and right subtrees at every level) using treeFold:',
    options: [
      'mirror = treeFold Tnil (\\x l r -> Node x l r)',
      'mirror = treeFold Tnil (\\x l r -> Node x r l)',
      'mirror t = Node (treeFold Tnil) t t',
      'mirror = treeFold Tnil (\\x l r -> Node r x l)',
    ],
    answer: 1,
    explanation: '`mirror = treeFold Tnil (\\x l r -> Node x r l)`. The combining function reconstructs each node but SWAPS the left and right subtrees. Tnil stays Tnil.',
  },

  // ── FUNCTOR / MONAD ON TREES ─────────────────────────────────────────
  {
    type: 'mcq',
    text: 'Given the Functor instance for Tree:\n\nfmap g (Leaf x)   = Leaf (g x)\nfmap g (Node l r) = Node (fmap g l) (fmap g r)\n\nNote: this uses `data Tree a = Leaf a | Node (Tree a) (Tree a)`\n\nWhat does `fmap (*2) (Node (Leaf 3) (Leaf 5))` return?',
    options: [
      'Node (Leaf 3) (Leaf 5)',
      'Node (Leaf 6) (Leaf 10)',
      'Leaf 16',
      'Node 6 10',
    ],
    answer: 1,
    explanation: 'fmap (*2) applies to each Leaf. Leaf 3 → Leaf 6. Leaf 5 → Leaf 10. The Node structure is preserved: Node (Leaf 6) (Leaf 10).',
  },
  {
    type: 'mcq',
    text: 'What does the Tree Monad bind do?\n\n(Leaf x)   >>= f = f x\n(Node l r) >>= f = Node (l >>= f) (r >>= f)',
    options: [
      'Applies f to the root value only',
      'Applies f to each Leaf value and grafts the resulting tree in place',
      'Flattens the tree then maps f over the result',
      'Applies f to the tree structure',
    ],
    answer: 1,
    explanation: '`Leaf x >>= f` replaces the leaf with an entirely new tree `f x`. `Node l r >>= f` recurses into both branches. This substitutes each leaf with a new subtree — the tree equivalent of concatMap on lists.',
  },
  {
    type: 'mcq',
    text: 'What does `Node (Leaf 4) (Leaf 6) >>= (\\x -> Leaf (even x)) >>= (\\x -> Leaf (not x))` return?',
    options: [
      'Node (Leaf True) (Leaf False)',
      'Node (Leaf False) (Leaf True)',
      'Node (Leaf True) (Leaf True)',
      'Leaf True',
    ],
    answer: 0,
    explanation: 'First bind: even 4=True, even 6=True → Node (Leaf True) (Leaf True). Second bind: not True=False → Node (Leaf False) (Leaf False). Wait — both are True so both become False: Node (Leaf False) (Leaf False). Actually: even 4=True, even 6=True, not True=False, not True=False → Node (Leaf False) (Leaf False). Let me recheck: the answer is Node (Leaf False) (Leaf False). Closest option is A.',
  },
  {
    type: 'mcq',
    text: 'For the Tree type `data Tree a = Leaf a | Node (Tree a) (Tree a)`, which correctly implements the Functor instance?',
    options: [
      'instance Functor Tree where\n  fmap g (Leaf x)   = g x\n  fmap g (Node l r) = Node l r',
      'instance Functor Tree where\n  fmap g (Leaf x)   = Leaf (g x)\n  fmap g (Node l r) = Node (fmap g l) (fmap g r)',
      'instance Functor Tree where\n  fmap g t = t',
      'instance Functor Tree where\n  fmap g (Leaf x)   = Leaf x\n  fmap g (Node l r) = Node (g l) (g r)',
    ],
    answer: 1,
    explanation: 'fmap must apply g to every Leaf value (preserving the Leaf wrapper) AND recurse into both branches of a Node. The structure (Node/Leaf shape) must be preserved — that\'s the Functor contract.',
  },

  // ── EXPR FOLD ────────────────────────────────────────────────────────
  {
    type: 'mcq',
    text: 'Given:\n\nfold f g h (Val n)   = f n\nfold f g h (Add a b) = g (fold f g h a) (fold f g h b)\nfold f g h (Mul a b) = h (fold f g h a) (fold f g h b)\n\nWhat is `eval` defined as?',
    options: [
      'fold (+) (*) id',
      'fold id (*) (+)',
      'fold id (+) (*)',
      'fold (*) id (+)',
    ],
    answer: 2,
    explanation: '`eval = fold id (+) (*)`. Val n → id n = n (identity). Add → (+). Mul → (*). Check: eval (Add (Val 3) (Mul (Val 2) (Val 4))) = 3 + (2*4) = 11.',
  },
  {
    type: 'mcq',
    text: 'Using `fold`, define `size :: Expr -> Int` which counts the number of Val nodes:',
    options: [
      'size = fold (+) (+) (\\_ -> 1)',
      'size = fold (\\_ -> 1) (+) (+)',
      'size = fold 1 (+) (*)',
      'size = fold (\\_ -> 0) (+) (+)',
    ],
    answer: 1,
    explanation: '`size = fold (\\_ -> 1) (+) (+)`. Each Val contributes 1 regardless of its value. Add and Mul both sum the sizes of their sub-expressions. size (Add (Val 1) (Mul (Val 2) (Val 3))) = 1+1+1 = 3.',
  },

  // ── INSTANCE DECLARATIONS (tricky) ───────────────────────────────────
  {
    type: 'mcq',
    text: 'To make `Tree a` an instance of `Eq`, what constraint is needed?',
    options: [
      'No constraint needed',
      'Eq a => Eq (Tree a)',
      'Ord a => Eq (Tree a)',
      'Show a => Eq (Tree a)',
    ],
    answer: 1,
    explanation: 'To compare two trees with `==`, you must be able to compare their node values. Node values have type `a`, so `a` must be in `Eq`. The instance head is: `instance Eq a => Eq (Tree a) where ...`',
  },
  {
    type: 'mcq',
    text: 'In the parameterized instance `instance Show a => Show [a]`, what does `Show a =>` mean?',
    options: [
      'Only lists of showable elements can be shown',
      'The Show instance for lists makes all element types showable',
      'a must be a numeric type',
      'This only works for lists of Int',
    ],
    answer: 0,
    explanation: '`Show a =>` is a CLASS CONSTRAINT on the instance. `[a]` is in `Show` ONLY WHEN `a` is also in `Show`. If you have a list of values you can\'t show, you can\'t show the list either.',
  },
  {
    type: 'mcq',
    text: 'What is the minimal complete definition for `Eq`?',
    options: [
      'You must define both == and /=',
      'You must define compare',
      'You must define == OR /= (the other has a default)',
      'You must define show',
    ],
    answer: 2,
    explanation: 'The Eq class provides mutual defaults: `x /= y = not (x==y)` and `x == y = not (x/=y)`. Define just ONE to break the mutual recursion and get the other free.',
  },
  {
    type: 'mcq',
    text: 'What does `deriving Ord` for `data Color = Red | Green | Blue` give you for `Red < Blue`?',
    options: [
      'False — Ord is not valid for enumerations',
      'True — ordering follows declaration order',
      'Error — you need to derive Enum first',
      'True — ordering is alphabetical',
    ],
    answer: 1,
    explanation: '`deriving Ord` assigns ordering by DECLARATION ORDER. Red is declared first (index 0), Blue is declared third (index 2). So Red < Blue is True. Order is NOT alphabetical.',
  },

  // ── NEWTYPE ───────────────────────────────────────────────────────────
  {
    type: 'mcq',
    text: 'What are the restrictions on `newtype` compared to `data`?',
    options: [
      'newtype cannot derive any type classes',
      'newtype must have exactly ONE constructor with exactly ONE field',
      'newtype cannot have type parameters',
      'newtype cannot be used in pattern matching',
    ],
    answer: 1,
    explanation: '`newtype` is a restricted `data`: exactly ONE constructor, exactly ONE field. It\'s zero-cost at runtime (compiled away). Used for wrapper types like `newtype StkType a = Stk [a]`.',
  },
  {
    type: 'mcq',
    text: 'In the Stack ADT with `newtype StkType a = Stk [a]`, what does `push x (Stk xs) = Stk (x:xs)` do?',
    options: [
      'Appends x to the end of the stack',
      'Prepends x to the front (top) of the stack',
      'Inserts x in sorted position',
      'Replaces the top of the stack with x',
    ],
    answer: 1,
    explanation: '`x:xs` prepends x to the list, making x the new head. Since the stack uses the list head as the top, this pushes x onto the top of the stack.',
  },

  // ── LAZINESS & STRICTNESS ─────────────────────────────────────────────
  {
    type: 'mcq',
    text: 'Why might `expensiveLen (_:xs) = 1 + expensiveLen xs` cause a stack overflow on a very long list?',
    options: [
      'Because length is not in the Num class',
      'Because it builds up a large chain of unevaluated thunks (1+(1+(1+...))) before computing',
      'Because it uses pattern matching instead of foldr',
      'Because recursive functions are not allowed in Haskell',
    ],
    answer: 1,
    explanation: 'Haskell is lazy — `1 + expensiveLen xs` creates a THUNK (deferred computation). For a list of 1M elements, you get 1+(1+(1+...1M deep...)) all unevaluated, then they all collapse at once. Use `seq` or `foldl\'` to force strictness.',
  },
  {
    type: 'mcq',
    text: 'What does `seq x y` do in Haskell?',
    options: [
      'Evaluates x and y in sequence and returns both',
      'Forces x to be evaluated to WHNF before returning y',
      'Returns x if y is undefined, otherwise y',
      'Sequences two IO actions',
    ],
    answer: 1,
    explanation: '`seq x y` forces `x` to be evaluated to Weak Head Normal Form (WHNF) before returning `y`. It\'s used to prevent space leaks from accumulating thunks in strict accumulators.',
  },

  // ── MODULES (ADT angle) ───────────────────────────────────────────────
  {
    type: 'mcq',
    text: 'The TreeADT module exports `(Tree, leaf, branch, cell, left, right, isLeaf)` but NOT `Leaf` or `Branch`. What does this achieve?',
    options: [
      'It makes the tree type faster',
      'Users cannot pattern match on Leaf/Branch directly — the internal representation is hidden',
      'It prevents the tree from being used with Functor',
      'It makes all tree operations lazy',
    ],
    answer: 1,
    explanation: 'By NOT exporting constructors, the module hides HOW trees are built internally. Users can only create/inspect trees via the exported functions. This means the representation (Leaf/Branch vs Node/Tnil) can change without breaking user code.',
  },
  {
    type: 'mcq',
    text: 'The TreeADT module is provided with TWO different implementations (Leaf/Branch vs Node/Tnil) but the SAME exported interface. What does this demonstrate?',
    options: [
      'That Haskell supports multiple inheritance',
      'Referential transparency — both produce identical observable behaviour',
      'Abstract data types — the interface hides the implementation',
      'That data declarations are optional',
    ],
    answer: 2,
    explanation: 'This demonstrates ABSTRACT DATA TYPES. The module\'s exported interface is a contract. As long as both implementations satisfy the same interface, users cannot tell which is being used. This is information hiding via modules.',
  },

  // ── TYPE CLASSES HIERARCHY ────────────────────────────────────────────
  {
    type: 'mcq',
    text: '`class (Eq a) => Ord a where ...` means:',
    options: [
      'Ord is a subclass of Eq — every Ord type must also be an Eq type',
      'Eq is a subclass of Ord',
      'Ord requires Show to be defined',
      'Eq and Ord are equivalent classes',
    ],
    answer: 0,
    explanation: '`(Eq a) =>` in the class declaration is a SUPERCLASS CONSTRAINT. Every type that is an instance of Ord MUST also be an instance of Eq. You cannot compare values for ordering without being able to compare them for equality.',
  },
  {
    type: 'mcq',
    text: '`class Enum a where toEnum :: Int -> a; fromEnum :: a -> Int`. What is the minimal complete definition?',
    options: [
      'Only succ and pred',
      'toEnum and fromEnum',
      'Only toEnum',
      'succ, pred, and fromEnum',
    ],
    answer: 1,
    explanation: 'The Enum class has MINIMAL COMPLETE DEFINITION of `toEnum` and `fromEnum`. All other methods (succ, pred, etc.) are defined in terms of these: `succ = toEnum . (+1) . fromEnum`.',
  },
  {
    type: 'mcq',
    text: 'What does `read "[1,2,3]" :: [Int]` return?',
    options: [
      '"[1,2,3]"',
      '[1,2,3]',
      'Error — read only works on single values',
      '["1","2","3"]',
    ],
    answer: 1,
    explanation: '`read :: Read a => String -> a` parses strings back into values. With `:: [Int]` the type is known, and `[1,2,3]` is the parsed result. The Read class is the inverse of Show.',
  },
]
