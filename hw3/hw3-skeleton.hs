
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
halve = undefined



---- Question 3.2 (10 points)
msort :: Ord a => [a] -> [a]
msort = undefined



-- Problem 4 (10+10+10=30 points)
---- Question 4.1 (10 points) 
mergeBy :: (a -> a -> Bool) -> [a] -> [a] -> [a]
mergeBy = undefined


---- Question 4.2 (10 points) 
msortBy :: (a -> a -> Bool) -> [a] -> [a]
msortBy = undefined


---- Question 4.3 (10 points)
{- Write your answer for Question 4.3 within this block comment.
-- Must be detailed step-by-step.

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

