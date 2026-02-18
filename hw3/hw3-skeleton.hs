
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
myInsert = undefined

---- Question 5.2 (5 points)
mySort :: Ord a => [a] -> [a]
mySort = undefined

---- Question 5.3 (10 points)
{- Write your answer for Question 5.3 within this block comment.
-- Must be detailed step-by-step.

-}



-- Problem 6 (Chapter 7, Exercise 9) (10+5=15 points)
---- Question 6.1 (10 points)
altMap :: (a -> b) -> (a -> b) -> [a] -> [b]
altMap = undefined

---- Question 6.2 (5 points)
{- Write your answer for Question 6.2 within this block comment.
-- Must be detailed step-by-step.

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

