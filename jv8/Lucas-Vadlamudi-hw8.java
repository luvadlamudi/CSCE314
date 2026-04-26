
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
    title = t; // put t into title
    id = i; // put i into id
  }

  public void takeOrder() {
    // First, prepare a string in the format shown in the pdf.
    // Then, acquire the queueAccessLock, and within the try block,
    // add the order string to the orders queue,
    // increment the total no. of orders, and
    // invoke signalAll() on the condition object.
    // And then, in the finally block, release the lock.
    orderNo = orderNo + 1; // make the order number go up by one
    String s = title + " order no. " + id + "." + orderNo; // build string like the sample
    queueAccessLock.lock();
    try {
      orders.add(s); // put order into the shared queue
      totalOrder = totalOrder + 1; // count one more total order
      newOrder.signalAll(); // tell manager that new order is waiting
    } finally {
      queueAccessLock.unlock(); // release lock no matter what happen
    }
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
    queueAccessLock.lock();
    try {
      if (orders.size() > 0) { // check if queue has something in it
        String order = orders.remove(); // take out the first order from queue
        prepareMeal(order); // send order to kitchen
      } else {
        // queue is empty so manager must wait
        try {
          newOrder.await(); // wait until client thread signals
        } catch (InterruptedException e) {
          // got interrupted, just keep going
        }
      }
    } finally {
      queueAccessLock.unlock(); // always unlock at end
    }
  }

  private void prepareMeal(String s) {
    // this method simply outputs the string s
    System.out.println("Preparing meal: " + s); // print out the order string
  }

  public void stop() {
    // make it so that this Runnable will stop
    stop = true; // set stop flag to true so while loop will exit
    queueAccessLock.lock(); // need lock to signal
    try {
      newOrder.signalAll(); // wake up manager if it is waiting so it can stop
    } finally {
      queueAccessLock.unlock();
    }
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
    while (!stop) { // keep going until stop becomes true
      if (title.equals("manager")) { // check if this thread is manager
        sendOrderToKitchen(); // manager removes from queue
      } else {
        takeOrder(); // client adds to queue
      }
      // sleep a little bit before next loop
      try {
        Thread.sleep(10000 / id); // higher id means sleep less time
      } catch (InterruptedException e) {
        // interrupted while sleeping, just continue
      }
    }
    System.out.println("Thread for " + Thread.currentThread().getName() + " is ending..."); // print goodbye
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
     * When i try different id values for the threads, i noticed that threads with
     * higher id's
     * show up more times in the output. this is because each thread sleep for
     * 10000/id
     * milliseconds between orders. so a greater denominator will result in a lower
     * sleep time. the higher id makes thread
     * place more orders before MAX_ORDER limit is reached. for example "Take out"
     * with
     * id=60 appears many more times than "Third party" with id=15 because take out
     * thread
     * is placing orders much faster. manager has id=100 so it checks the queue
     * every 100ms and
     * process orders very quickly. if i give a client thread a very small id like
     * 5, it
     * barely contributes any orders to output because it sleeps 2 seconds between
     * each
     * order. i also notice the order that threads appear first change every time
     * the program
     * runs because thread scheduling is non-determistic. this is the race
     * conditions from
     * class but here synchronized with lock and condition so orders never get lost.
     *****/

    OrderManager m0 = new OrderManager("manager", 100);
    OrderManager c1 = new OrderManager("To go", 50);
    OrderManager c2 = new OrderManager("Eat in", 40);
    OrderManager c3 = new OrderManager("Delivery", 25);
    OrderManager c4 = new OrderManager("Take out", 60); // new take out thread with id 60
    OrderManager c5 = new OrderManager("Third party", 15); // new third party thread with id 15
    Date open = new Date();
    System.out.println("Welcome to Restaurant 314 !! " + open);
    System.out.println("We are accepting orders...");

    Thread tm1 = new Thread(m0, "manager");
    Thread tc1 = new Thread(c1, "To go");
    Thread tc2 = new Thread(c2, "Eat in");
    Thread tc3 = new Thread(c3, "Delivery");
    Thread tc4 = new Thread(c4, "Take out"); // make thread for take out runnable
    Thread tc5 = new Thread(c5, "Third party"); // make thread for third party runnable

    tm1.start();
    tc1.start();
    tc2.start();
    tc3.start();
    tc4.start(); // start the take out thread
    tc5.start(); // start the third party thread

    while (OrderManager.totalOrder < OrderManager.MAX_ORDER) {
      try {
        Thread.sleep(1000);
      } catch (InterruptedException exception) {
        System.out.println("main interrupted");
      }
    } // end while

    OrderManager[] servers = { m0, c1, c2, c3, c4, c5 }; // put all runnables in array
    for (OrderManager server : servers) {
      server.stop();
    }

    // main thread will wait here until every child thread finishes
    try {
      tm1.join();
      tc1.join();
      tc2.join();
      tc3.join();
      tc4.join(); // wait for take out thread to finish
      tc5.join(); // wait for third party thread to finish
    } catch (InterruptedException exception) {
    }

    System.out.println("We served total " + totalOrder + " orders today."); // print total order count

    // main thread now outputs bye-bye message
    System.out.println("We're sold out of ingredients OR it's 8:45 PM!\n"
        + "Restaurant 314 closing, until tomorrow... Bye!");

    System.out.println("Have fun!"); // last message

  } // end main()
} // end class OrderManager
