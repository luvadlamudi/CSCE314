rep n a = [a | b <- [1..n]]
 
py n = [(x,y,z) | x <- [1..n], y <- [1..n], z <- [1..n], (x*x) + (y*y) == (z*z)]

a=1
data Tree a = Node a [Tree a]
