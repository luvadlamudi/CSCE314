
-- CSCE 314 [Sections 502, 503] Programming Languages Spring 2026
-- Hyunyoung Lee
-- Homework Assignment 3 (Total 100 points) 
-- Due on Tuesday 2/17/26 at 11:59 p.m.

-- Problem 1 (5 points)
-- Student Name: LUCAS VADLAMUDI
-- UIN: 535001242
-- Resources: (ACKNOWLEDGE ANY HELP RECEIVED HERE)

-- On my honor, as an Aggie, I have neither given nor received any unauthorized
-- aid on any portion of the academic work included in this assignment.

module Main where

import Test.HUnit
    ( (~:),
      (~=?),
      runTestTT,
      Counts(failures, errors),
      Test(TestList) )
import System.Exit
import Data.Char -- for toLower and toUpper functions in test case "altMap 4"

-- *** Read textbook Chapters 5, 6, and 7, and the problem specifications
-- *** and requirements in hw3.pdf carefully!

-- Problem 2 (Chapter 6, Exercise 7) (10 points)
merge :: Ord a => [a] -> [a] -> [a]
merge xs [] = xs -- base case, second list empty, return first list
merge [] as = as -- base case, first list empty, return second list
merge (x:xs) (a:as) -- split both lists into head and tail
  | x <= a    = x : merge xs (a:as) -- x smaller or equal, keep x, recurse on rest of first list
  | otherwise = a : merge (x:xs) as -- a smaller, keep a, recurse on rest of second list

-- Problem 3 (Chapter 6, Exercise 8) (5+10=15 points)
---- Question 3.1 (5 points)
halve :: [a] -> ([a], [a])
halve xs = splitAt (length xs `div` 2) xs -- find middle index using length div 2, split list at that index into two parts, splitAt returns a tuple where first value has first half of elements and second value has remaining elements starting at that midpoint



---- Question 3.2 (10 points)
msort :: Ord a => [a] -> [a]
msort [] = [] -- base case, empty list has no elements so already sorted, nothing to split or merge
msort [x] = [x] -- base case, list with one element is already sorted, no need to split further

msort xs = 
  let (left, right) = halve xs -- use halve to split list into two smaller lists, left is first half, right is second half
  in merge (msort left) (msort right) -- recursively sort left half and right half, then merge the two sorted halves into one sorted list


-- Problem 4 (10+10+10=30 points)
---- Question 4.1 (10 points) 
mergeBy :: (a -> a -> Bool) -> [a] -> [a] -> [a]
mergeBy trend xs [] = xs -- base case, second list empty, return remaining first list
mergeBy trend [] as = as -- base case, first list empty, return remaining second list

mergeBy trend (x:xs) (a:as) -- split both lists into head and tail so we can compare first elements of each sorted list
  | trend x a = x : mergeBy trend xs (a:as) -- apply predicate to x and a, if predicate returns true then x should come before a in sorted order, place x in front and recursively merge rest of first list with full second list
  | otherwise = a : mergeBy trend (x:xs) as -- if predicate returns false then a should come before x, place a in front and recursively merge full first list with rest of second list



---- Question 4.2 (10 points) 
msortBy :: (a -> a -> Bool) -> [a] -> [a]
msortBy _ [] = [] -- base case, empty list already sorted, predicate not needed
msortBy _ [x] = [x] -- base case, single element already sorted, predicate not needed

msortBy trend xs =
  let (left, right) = halve xs -- split list into two smaller lists, left is first half, right is second half
  in mergeBy trend (msortBy trend left) (msortBy trend right) -- call msortBy on both halves to sort them using same predicate, then merge the two sorted halves using mergeBy so final list follows the predicate order

---- Question 4.3 (10 points)
{-


we start with splitting (>) [8,5,4,9,3] using halve
the length is 5 and 5 div 2 is 2. splitAt 2 gives ([8,5] , [4,9,3]). the first list only has 2 elements because the take function only takes the first 2 elements, the remaining are dropped into the 2nd list

so
msortBy (>) [8,5,4,9,3]
= mergeBy (>) (msortBy (>) [8,5]) (msortBy (>) [4,9,3])

now sort left side [8,5].

halve [8,5]. length 2. 2 div 2 is 1.
splitAt 1 gives ([8] , [5]).

so
msortBy (>) [8,5]
= mergeBy (>) [8] [5]
because single element lists are base case.

mergeBy (>) [8] [5].
compare 8 and 5. 8 > 5 is true so take 8.
then mergeBy (>) [] [5] returns [5].
so result is [8,5].

now sort right side [4,9,3].

halve [4,9,3]. length 3. 3 div 2 is 1.
splitAt 1 gives ([4] , [9,3]).

so
msortBy (>) [4,9,3]
= mergeBy (>) [4] (msortBy (>) [9,3]).

now sort [9,3].
halve [9,3]. length 2. 2 div 2 is 1.
splitAt 1 gives ([9] , [3]).

mergeBy (>) [9] [3].
compare 9 and 3. 9 > 3 is true so take 9.
then return [3].
so [9,3].

now merge [4] and [9,3].

mergeBy (>) [4] [9,3].
compare 4 and 9. 4 > 9 is false so take 9.
compare 4 and 3. 4 > 3 is true so take 4.
then return [3].
so result is [9,4,3].

now final merge.

mergeBy (>) [8,5] [9,4,3].
compare 8 and 9. 8 > 9 is false so take 9.
compare 8 and 4. 8 > 4 is true so take 8.
compare 5 and 4. 5 > 4 is true so take 5.
then remaining is [4,3].

final result is [9,8,5,4,3].
-}



-- Problem 5 (10+5+10=25 points)
---- Question 5.1 (10 points)
myInsert :: Ord a => a -> [a] -> [a]

myInsert num [] = [num] -- base case, empty list so just return list with the element

myInsert num (x:xs) -- compare num with first element of list
  | num <= x = num : x : xs -- if num is less than or equal to x, insert num before x
  | otherwise = x : myInsert num xs -- otherwise keep x and recursively try to insert into rest of list


---- Question 5.2 (5 points)
mySort :: Ord a => [a] -> [a]
mySort = foldr myInsert [] -- foldr starts with empty list as base case, then inserts each element into that accumulator using myInsert, building a sorted list as recursion unwinds

---- Question 5.3 (10 points)
{- 
mySort is defined as mySort = foldr myInsert []

so when we run mySort [9,5,7,8,3]
we are applying foldr to the list with:
    f = myInsert
    base accumulator = []
    input list = [9,5,7,8,3]
 
foldr is right associative given by the Textbook:
    foldr f z [x1,x2,...,xn] = f x1 (f x2 (... (f xn z)...))
so foldr builds a nested expression first, then evaluation happens from the inside out.
that means the accumulator starts as z, and then each element is inserted into that accumulator
as the recursive calls return.

so the structure for this input becomes:
    foldr myInsert [] [9,5,7,8,3]
=   myInsert 9 (myInsert 5 (myInsert 7 (myInsert 8 (myInsert 3 []))))

now what myInsert guarantees.
    myInsert takes a value and an already ascending sorted list,
    and returns a new ascending sorted list by placing the value at the first position
    where it is <= the next element, otherwise it keeps scanning forward.
so myInsert preserves the sorted invariant of the accumulator.

now evaluate from the innermost call, because foldr created the nest that way.

    myInsert 3 []       = [3]   the base accumulator becomes sorted list of one element
    myInsert 8 [3]      = [3,8]   it inserts 8 into sorted accumulator
    myInsert 7 [3,8]    = [3,7,8]  then inserts 7 in correct position, accumulator stays sorted
    myInsert 5 [3,7,8]  = [3,5,7,8]   then insert 5 in correct position, accumulator stays sorted
    myInsert 9 [3,5,7,8]= [3,5,7,8,9]     then insert 9 at end, accumulator stays sorted

    foldr supplies each element to myInsert, with the second argument always being the result
    of inserting the elements to its right into the base [].
    since myInsert maintains sorted order, the accumulator is always sorted at every step,
    and the final accumulator is the fully sorted list.

    which leaves us with: mySort [9,5,7,8,3] = [3,5,7,8,9]

-}

-- Problem 6 (Chapter 7, Exercise 9) (10+5=15 points)
---- Question 6.1 (10 points)
altMap :: (a -> b) -> (a -> b) -> [a] -> [b]
altMap _ _ [] = [] -- base case, empty list returns empty list
altMap func1 _ [x] = [func1 x] -- single element, apply first function only

altMap func1 func2 (x1:x2:xs) = func1 x1 : func2 x2 : altMap func1 func2 xs -- split list into first element, second element, and remaining elements, apply func1 to first and func2 to second, then recursively process remaining list so functions alternate consistently through entire list

---- Question 6.2 (5 points)
{- 
ghci> altMap (\x->x-3) (`div` 2) [3..9]

first [3..9] expands to [3,4,5,6,7,8,9] due to list range enumeration

our provided functions are
func1 = (\x->x-3)
func2 = (`div` 2)

altMap has these base cases
altMap _ _ [] = [] where an empty list is provided
altMap func1 _ [x] = [func1 x] where we are left with a singleton
altMap func1 func2 (x1:x2:xs) = func1 x1 : func2 x2 : altMap func1 func2 xs



starting with altMap func1 func2 [3,4,5,6,7,8,9]
this matches (x1:x2:xs) because list has at least 2 elements.
so x1 = 3, x2 = 4, xs = [5,6,7,8,9]

altMap func1 func2 (x1:x2:xs)
= func1 x1 : func2 x2 : altMap func1 func2 xs

so
= func1 3 : func2 4 : altMap func1 func2 [5,6,7,8,9]

now compute those 2 values.
func1 3 = 3 - 3 = 0
func2 4 = 4 `div` 2 = 2

so now we have.
= 0 : 2 : altMap func1 func2 [5,6,7,8,9]

next recursive call.

altMap func1 func2 [5,6,7,8,9]
again matches (x1:x2:xs).
x1 = 5, x2 = 6, xs = [7,8,9]

= func1 5 : func2 6 : altMap func1 func2 [7,8,9]

func1 5 = 5 - 3 = 2
func2 6 = 6 `div` 2 = 3

so this call becomes.
= 2 : 3 : altMap func1 func2 [7,8,9]

plug that into the previous line.
we had 0 : 2 : altMap func1 func2 [5,6,7,8,9]
so now.
= 0 : 2 : (2 : 3 : altMap func1 func2 [7,8,9])
which is same as.
= 0 : 2 : 2 : 3 : altMap func1 func2 [7,8,9]

next recursive call.

altMap func1 func2 [7,8,9]
matches (x1:x2:xs) still.
x1 = 7, x2 = 8, xs = [9]

= func1 7 : func2 8 : altMap func1 func2 [9]

func1 7 = 7 - 3 = 4
func2 8 = 8 `div` 2 = 4

so.
= 4 : 4 : altMap func1 func2 [9]

plug back in again.
= 0 : 2 : 2 : 3 : (4 : 4 : altMap func1 func2 [9])
= 0 : 2 : 2 : 3 : 4 : 4 : altMap func1 func2 [9]

now the last call.

altMap func1 func2 [9]
this does not match (x1:x2:xs) because only 1 element.
so it matches the single element case.
altMap func1 _ [x] = [func1 x]

here x = 9.
so.
altMap func1 func2 [9] = [func1 9]

func1 9 = 9 - 3 = 6

so last call gives [6].

plug it in.
= 0 : 2 : 2 : 3 : 4 : 4 : [6]
= [0,2,2,3,4,4,6]

final.
altMap (\x->x-3) (`div` 2) [3..9] = [0,2,2,3,4,4,6]
-}





    
myTestList =
  TestList [

      "merge 1" ~: merge "EGG" "ABCDEFGH" ~=? "ABCDEEFGGGH" 
    , "merge 2" ~: merge "Hello" "e" ~=? "Heello"
    , "merge 3" ~: merge [1,3,5,7,9] [2,4,6] ~=? [1,2,3,4,5,6,7,9]

    , "halve 1" ~: halve "" ~=? ("","")
    , "halve 2" ~: halve "halves" ~=? ("hal","ves")
    , "halve 3" ~: halve "halve" ~=? ("ha","lve")

    , "msort 1" ~: msort "Howdy all!" ~=? " !Hadllowy"
    , "msort 2" ~: msort "" ~=? ""
    , "msort 3" ~: msort "Mississippi" ~=? "Miiiippssss"
    , "msort 4" ~: msort [3,2,1,5,4] ~=? [1,2,3,4,5]

    , "mergeBy 1" ~: mergeBy (>) "FED" "GBA" ~=? "GFEDBA"
    , "mergeBy 2" ~: mergeBy (<) "Howdy" "Maui" ~=? "HMaouiwdy"
    , "mergeBy 3" ~: mergeBy (>) [5,1] [6,4,3] ~=? [6,5,4,3,1]
      
    , "msortBy 1" ~: msortBy (<) "gig 'em" ~=? " 'eggim" 
    , "msortBy 2" ~: msortBy (>) "Jack be nimble" ~=? "nmlkieecbbaJ  "
    , "msortBy 3" ~: msortBy (<) "" ~=? ""
    , "msortBy 4" ~: msortBy (>) [3,2,1,5,4] ~=? [5,4,3,2,1]
    , "msortBy 5" ~: msortBy (>) [8,5,4,9,3] ~=? [9,8,5,4,3]

    , "myInsert 1" ~: myInsert 'o' "Hw are you?" ~=? "How are you?"
    , "myInsert 2" ~: myInsert 'c' "abdefg" ~=? "abcdefg"
    , "myInsert 3" ~: myInsert 3 [2,4,6] ~=? [2,3,4,6]

    , "mySort 1" ~: mySort "Jack be quick" ~=? "  Jabcceikkqu"
    , "mySort 2" ~: mySort "Howdy all!" ~=? " !Hadllowy"
    , "mySort 3" ~: mySort [9,5,7,8,3] ~=? [3,5,7,8,9]

    , "altMap 1" ~: altMap (* 10) (* 100) [1,2,3,4,5] ~=? [10,200,30,400,50]
    , "altMap 2" ~: and (altMap even odd [1..10]) ~=? False
    , "altMap 3" ~: altMap (+3) (\x->x-2) [1..10] ~=? [4,0,6,2,8,4,10,6,12,8]
    , "altMap 4" ~: altMap toLower toUpper "Haskell IS fun!" ~=? "hAsKeLl iS FuN!"
    ]

main = do c <- runTestTT myTestList
          putStrLn $ show c
          let errs = errors c
              fails = failures c
          exitWith (codeGet errs fails)
          
codeGet errs fails
 | fails > 0       = ExitFailure 2
 | errs > 0        = ExitFailure 1
 | otherwise       = ExitSuccess

