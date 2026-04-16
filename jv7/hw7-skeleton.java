
/* Skeleton provided by Hyunyoung Lee
   For CSCE 314 [Sections 502, 503] Spring 2026, Assignment 7
   Due: Wednesday, 4/15/2026, 11:59 p.m.
   Classes contained: Node, Node$NodeIterator, MyQueue
    
   Student Name:
   UIN:
   Acknowledgements:
*/

import java.util.Iterator;
import java.util.Arrays;
import java.util.NoSuchElementException;
import static java.lang.System.out;

// Total 100 points

// class Node: 5 points
// give correct class header - given
final class Node<E> implements Iterable<E> {
  // private fields
  private E val;
  private Node<E> next;

  // (1 point) implement constructor
  public Node (E val, Node<E> node) { 
  // implement this constructor
  } 

  // (2 points) iterator() returns a NodeIterator object for this object
  @Override  
  public NodeIterator<E> iterator() {
  // implement this method and explain
  }

  // (2 points) getter and setter methods for the private fields
  public E getVal() {
   // implement this method
  }
  public void setVal(E v) {
   // implement this method
  } 
  public Node<E> getNext() {
   // implement this method
  }
  public void setNext(Node<E> node) {
   // implement this method
  }

  //*** NodeIterator as an inner class: 10 points
  // Having NodeIterator as an inner class of Node makes sense
  // correct class header as given in the problem statement
  class NodeIterator<E> implements Iterator<E> {
    private Node<E> p;  // given

    // (1 points) constructor
    public NodeIterator (Node<E> n) { 
    // implement this constructor 
    }

    // (9 points) methods to implement the Iterator interface
    //// (2 points) hasNext()
    @Override
    public boolean hasNext() {
    // implement this method and explain
    } 

    //// (7 points) next()
    @Override
    public E next() {
    // implement this method and explain
    }    
  } // end of NodeIterator

  // Total 10 points for the two methods: mysum, print
    
  //// 7 points
  static double mysum (Iterable<? extends Number> n) {
    // implement this method and explain the use of the wildcard (?)
  }

  //// 3 points
  static <T> void print (Iterable<T> n) {
    // implement this method and explain
  }

  // Required: (20 points) Expand the main method (see the pdf for
  //   more details), but keep whatever provided as it is
  public static void main (String args[]) {
    Node<Double> doublelist = 
        new Node<Double>(21.5, 
          new Node<Double>(16.74, 
            new Node<Double>(2.189, 
              new Node<Double>(7.1, null))));

    System.out.println("===");
    print(doublelist);
    System.out.println("sum doublelist = " + mysum(doublelist));
    System.out.println("===");

    // EXPAND this main. Test every functionality including getter and
    // setter methods. See the hw7.pdf for more details.

    
  } // end of main
} // end of class Node



/* class MyQueue */

// Total 55 points for the MyQueue class

class MyQueue<E> implements Iterable<E>, Cloneable, Comparable<MyQueue<E>> {   
  protected Node<E> head;
  protected Node<E> tail;
  protected int length;

  @Override
  public Iterator<E> iterator() { return head.iterator(); }

  // helper method reverse() *** to be used in clone()
  public MyQueue<E> reverse() {
    Node<E> l = null;
    for (E e : head)  l = new Node<E>(e, l);
    return (new MyQueue<E>(l));
  }

  // Task 1: override Object.clone() (5 points)
  @Override
  public MyQueue<E> clone() {
  // Implement this method and explain
  }

  @Override
  public int compareTo(MyQueue<E> list) { 
    if (this.length < list.length) return -1;
    if (this.length == list.length) return 0;
    return 1; 
  }

  // Task 2: override Object.equals() (5 points)
  @Override
  public boolean equals(Object o) { 
  // Implement this method and explain (read the equality criteria in the
  // hw7.pdf problem statement carefully!)
  }   

  @Override
  public int hashCode() {
    return length;
  }

  // two constructors (implementing the one-arg constructor 5 points)
  // no-arg constructor given
  public MyQueue() { head = null; tail = null; length = 0; }
    
  // Task 3: one-arg constructor (10 points)
  public MyQueue(Iterable<E> iterable) { 
  // implement this constructor and explain
  }

				
  // Task 4: total 15 points for toString(), add() and remove()
  // toString() (5 points)
  @Override
  public String toString() {
  // implement this method and explain
  }

  // add() (5 points)
  public void add(E item) { 
  // implement this method and explain
  }

  // remove() (5 points)
  public E remove() { 
  // implement this method and explain
  }

  // given
  public E peek() { return head.getVal(); }

  // given
  public int getLength() { return length; }

  // Required: (25 points) Expand the main method, but keep whatever 
  //   provided as it is
  public static void main (String args[]) {
    MyQueue<Integer> empty_queue = new MyQueue<Integer>();
    MyQueue<Integer> q  = new MyQueue<Integer>(Arrays.asList(10,2,3,4));
    MyQueue<Integer> q1 = new MyQueue<Integer>(Arrays.asList(2,4,3,10));
    MyQueue<Integer> q2 = new MyQueue<Integer>(q.reverse());

    out.println("sum of q = " + Node.mysum(q));
    out.println("sum of q1 = " + Node.mysum(q1));
    Node.print(q);
    Node.print(q1);
    
    out.println(q);
    out.println("q1 = " + q1);
    out.println("q2 = " + q2);
    out.println("q2.compareTo(q1) = " + q2.compareTo(q1));
    out.println("=== end of test");

    // EXPAND this main. Test every functionality you implemented above.
    // See the hw7.pdf for more details.
    
  } // end of main
} // end of class MyQueue



