
/* Skeleton provided by Hyunyoung Lee
   For CSCE 314 [Sections 502, 503] Spring 2026, Assignment 8
   Due: Friday, 4/24/2026, 11:59 p.m.
   Class contained: OrderManager

   Student Name: Lucas Vadlamudi
   Student UIN: 535001242
   Acknowledgements:
*/

import java.util.Date;
import java.util.Queue;
import java.util.LinkedList;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.Condition;

class OrderManager implements Runnable {
  // Shared fields among all threads
  static final int MAX_ORDER = 20;
  private static int totalOrder = 0; // sequential number for all orders
  private static final Queue<String> orders = new LinkedList<String>();
  private static Lock queueAccessLock = new ReentrantLock();
  private static Condition newOrder = queueAccessLock.newCondition();

  // Instance members for each thread
  private String title; // manager or client
  private int id;
  private boolean stop = false;
  private int orderNo = 0; // seqential no. for orders per thread

  public OrderManager(String t, int i) {
    // constructor: t is for title, i for id

  }

  public void takeOrder() {
    // First, prepare a string in the format shown in the pdf.
    // Then, acquire the queueAccessLock, and within the try block,
    // add the order string to the orders queue,
    // increment the total no. of orders, and
    // invoke signalAll() on the condition object.
    // And then, in the finally block, release the lock.

  }

  private void sendOrderToKitchen() {
    // First, acquire the queueAccessLock, and within the try block:
    // first check if the orders queue has at least one element
    // if so, then remove one order (at the head of the queue) and
    // invoke prepareMeal() with the removed order string;
    // if not, invoke await() on the condition object, which
    // must be enclosed in a try-catch block that catches
    // InterruptedException
    // And then, in the finally block, release the lock.

  }

  private void prepareMeal(String s) {
    // this method simply outputs the string s

  }

  public void stop() {
    // make it so that this Runnable will stop

  }

  public void run() {
    // Within a while loop (if the condition !stop is satisfied),
    // first check if the title is "manager",
    // then invoke sendOrderToKitchen() method in which
    // manager removes orders from the queue
    // else invoke takeOrder() method, in which
    // the non-manager (client) adds orders to the queue.
    // At the end of each iteration of the loop, let this thread
    // sleep for 10000/id milliseconds before continuing on the
    // next iteration.
    // When the while loop exits, output the following string
    // "Thread for "+Thread.currentThread().getName()+" is ending..."

  } // end run()

  public static void main(String[] args) {
    // Expand this main with at least two more client threads,
    // one for "Take out" (to distinguish from "To go") and
    // another for "Third party" (delivery) with different id values.
    //
    // Try different sets of id values for those client threads,
    // and write a paragraph about what you notice in the outputs
    // with those different id values. Explain the reason.
    /*****
     * (Your paragraph goes within this block comment.)
     * 
     * 
     *****/

    OrderManager m0 = new OrderManager("manager", 100);
    OrderManager c1 = new OrderManager("To go", 50);
    OrderManager c2 = new OrderManager("Eat in", 40);
    OrderManager c3 = new OrderManager("Delivery", 25);
    Date open = new Date();
    System.out.println("Welcome to Restaurant 314 !! " + open);
    System.out.println("We are accepting orders...");

    Thread tm1 = new Thread(m0, "manager");
    Thread tc1 = new Thread(c1, "To go");
    Thread tc2 = new Thread(c2, "Eat in");
    Thread tc3 = new Thread(c3, "Delivery");

    tm1.start();
    tc1.start();
    tc2.start();
    tc3.start();

    while (OrderManager.totalOrder < OrderManager.MAX_ORDER) {
      try {
        Thread.sleep(1000);
      } catch (InterruptedException exception) {
        System.out.println("main interrupted");
      }
    } // end while

    OrderManager[] servers = { m0, c1, c2, c3 };
    for (OrderManager server : servers) {
      server.stop();
    }

    // main thread will wait here until every child thread finishes
    try {
      tm1.join();
      tc1.join();
      tc2.join();
      tc3.join();
    } catch (InterruptedException exception) {
    }

    // main thread now outputs bye-bye message
    System.out.println("We're sold out of ingredients OR it's 8:45 PM!\n"
        + "Restaurant 314 closing, until tomorrow... Bye!");

  } // end main()
} // end class OrderManager
