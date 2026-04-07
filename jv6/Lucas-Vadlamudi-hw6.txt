
/* Skeleton provided by Hyunyoung Lee
   For CSCE 314 [Sections 502, 503] Spring 2026, Assignment 6
   Due: Monday, April 6, 2026, 11:59 p.m.

   Classes contained: Shape, Point, RightTriangle, Square, Circle,
                      TotalAreaCalculator, ShapeTest

   Student Name: Lucas Vadlamudi
   UIN: 535001242
   Acknowledgements:
*/

import java.lang.Math;
// below are imports for class ShapeTest
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.regex.Pattern;
import java.util.Scanner;
import static java.lang.System.*;

abstract class Shape implements Comparable<Shape> {
  public Point position;
  public double area;

  // constructor that sets position as the Point passed as an argument

  // signature: Shape (Point)

  // implement the constructor
  Shape(Point p) {
    position = p;
  }

  // implement equals()
  @Override
  public boolean equals(Object o) { // implement this method and explain your implementation
    if (o.getClass() == this.getClass()) {
      Shape dummy = (Shape) o;

      if (this.position.equals(dummy.position) && this.area == dummy.area) {
        return true;
      }
    }
    return false;
  }

  // area() must be abstract
  public abstract double area();

  // implement compareTo()
  @Override
  public int compareTo(Shape s) { // implement this method and explain your implementation
    // compare the areas of both shapes, return negative if this is smaller
    if (this.area() < s.area()) {
      return -1; // sort shape first
    }
    if (this.area() > s.area()) {
      return 1; // sort shape last
    }
    return 0; // areas are equal
  }
} // end of class Shape

// class Point
final class Point {
  public double x;
  public double y;

  // constructor that sets the values of x and y
  public Point(double x, double y) { // implement the constructor
    this.x = x;
    this.y = y;
  }

  // implement equals, hashCode(), toString()
  @Override
  public boolean equals(Object s) { // implement the method and explain your implementation
    Point dummy = (Point) s; // create dummy object of class Point which casts object s into it to be able to
                             // acess member variables check whether member values are equivalent
    return (this.getClass() == s.getClass() && this.x == dummy.x && this.y == dummy.y);
  }

  @Override
  public int hashCode() { // implement the method and explain your implementation
    // hash the same fields used in equals (x and y) so equal Points produce equal
    // hash codes
    int result = Double.hashCode(x);
    result = 31 * result + Double.hashCode(y);
    return result;
  }

  @Override
  public String toString() { // implement the method and explain your implementation
    // just return x and y as a string so we can print the point
    return "(" + x + ", " + y + ")";
  }

  // implement main method for Point
  public static void main(String[] args) {
    // test Point by making some points and checking if equals works
    Point p1 = new Point(3.0, 4.0);
    Point p2 = new Point(3.0, 4.0);
    Point p3 = new Point(1.0, 2.0);
    out.println("p1 = " + p1);
    out.println("p2 = " + p2);
    out.println("p3 = " + p3);
    out.println("p1 equals p2: " + p1.equals(p2)); // should be true
    out.println("p1 equals p3: " + p1.equals(p3)); // should be false
  }

} // end of class Point

class RightTriangle extends Shape {
  private Point p1, p2;
  private double width, height; // you may need those

  // constructor that accepts three Points, and sets
  // the position stored in Shape with the first point,
  // and p1 and p2 with the other two Points // my note autoformat does that below
  public RightTriangle(Point p0, Point p1, Point p2) { // implement the constructor and explain your implementation
                                                       // check the invariant of a "right" triangle and
                                                       // set the height and width of this triangle appropriately
                                                       // as explained in the pdf pages 2-3.
    super(p0);
    this.p1 = p1;
    this.p2 = p2;
    // one pair shares the same y (horizontal edge to width),
    // another pair shares the same x (vertical edge to height)
    if (p0.y == p1.y) {
      width = Math.abs(p1.x - p0.x);
      height = Math.abs(p2.y - p0.y);
    } else if (p0.y == p2.y) {
      width = Math.abs(p2.x - p0.x);
      height = Math.abs(p1.y - p0.y);
    } else { // p1.y == p2.y
      width = Math.abs(p2.x - p1.x);
      height = Math.abs(p1.y - p0.y);
    }
  }

  // implement equals(), hashCode(), area(), and toString()
  @Override
  public boolean equals(Object s) { // implement this method and explain your implementation
    // cast s to RightTriangle so we can access its fields
    if (s.getClass() == this.getClass()) {
      RightTriangle dummy = (RightTriangle) s;
      // check if position width and height are all the same
      if (this.position.equals(dummy.position) && this.width == dummy.width && this.height == dummy.height) {
        return true;
      }
    }
    return false;
  }

  @Override
  public int hashCode() { // implement this method and explain your implementation
    // hash the same fields used in equals (position, p1, p2) so equal
    // RightTriangles produce equal hash codes
    int result = position.hashCode();
    result = 31 * result + p1.hashCode();
    result = 31 * result + p2.hashCode();
    return result;
  }

  @Override
  public double area() { // implement this method
    // area of right triangle is half times base times height
    double a = 0.5 * width * height;
    return a;
  }

  @Override
  public String toString() { // implement this method and explain your implementation
    // return string with all the info about this triangle
    return "RightTriangle(position=" + position + ", width=" + width + ", height=" + height + ")";
  }

  // implement main method for RightTriangle
  public static void main(String[] args) {
    // test RightTriangle using the example from the pdf
    Point p0 = new Point(30, 50);
    Point p1 = new Point(50, 50);
    Point p2 = new Point(30, 60);
    RightTriangle t1 = new RightTriangle(p0, p1, p2);
    out.println("t1 = " + t1);
    out.println("area: " + t1.area()); // should be 100.0
    // test equals with same values
    RightTriangle t2 = new RightTriangle(new Point(30, 50), new Point(50, 50), new Point(30, 60));
    out.println("t1 equals t2: " + t1.equals(t2)); // should be true
    out.println("t1 equals t1: " + t1.equals(t1)); // should be true
  }

} // end of class RightTriangle

class Square extends Shape {
  private double side; // side is the side length

  // constructor that accepts a Point (for position) and a double
  // (for the side length).
  public Square(Point p0, double side) { // implement the constructor
    super(p0);
    this.side = side;
  }

  // implement equals(), hashCode(), area(), and toString()
  @Override
  public boolean equals(Object o) { // implement this method and explain your implementation
    // cast o to Square so we can check its fields
    if (o.getClass() == this.getClass()) {
      Square dummy = (Square) o;
      // check if position and side length are the same
      if (this.position.equals(dummy.position) && this.side == dummy.side) {
        return true;
      }
    }
    return false;
  }

  @Override
  public int hashCode() { // implement this method and explain your implementation
    // hash the same fields used in equals (position, side) so equal Squares produce
    // equal hash codes
    int result = position.hashCode();
    result = 31 * result + Double.hashCode(side);
    return result;
  }

  @Override
  public double area() { // implement this method
    // area of a square is side times side
    double a = side * side;
    return a;
  }

  @Override
  public String toString() { // implement this method and explain your implementation
    // return string with position and side length
    return "Square(" + position + ", " + side + ")";
  }

  // implement main method for Square
  public static void main(String[] args) {
    // test Square with some values
    Square s1 = new Square(new Point(4.5, 1.0), 10.5);
    out.println("s1 = " + s1);
    out.println("area: " + s1.area()); // should be 110.25
    // test equals with same values
    Square s2 = new Square(new Point(4.5, 1.0), 10.5);
    out.println("s1 equals s2: " + s1.equals(s2)); // should be true
    Square s3 = new Square(new Point(6.5, 11.1), 25);
    out.println("s1 equals s3: " + s1.equals(s3)); // should be false
  }

} // end of class Square

class Circle extends Shape {
  private double radius;

  // constructor that accepts a Point (for position) and a double
  // (for the radius).
  public Circle(Point p0, double r) { // implement the constructor
    super(p0);
    this.radius = r;
  }

  // implement equals(), hashCode(), area(), and toString()
  @Override
  public boolean equals(Object o) { // implement this method and explain your implementation
    // cast o to Circle so we can check its fields
    if (o.getClass() == this.getClass()) {
      Circle dummy = (Circle) o;
      // check if position and radius are the same
      if (this.position.equals(dummy.position) && this.radius == dummy.radius) {
        return true;
      }
    }
    return false;
  }

  @Override
  public int hashCode() { // implement this method and explain your implementation
    // hash the same fields used in equals (position, radius) so equal Circles
    // produce equal hash codes
    int result = position.hashCode();
    result = 31 * result + Double.hashCode(radius);
    return result;
  }

  @Override
  public double area() { // implement this method
    // area of circle is pi times radius squared
    double a = Math.PI * radius * radius;
    return a;
  }

  @Override
  public String toString() { // implement this method and explain your implementation
    // return string with position and radius
    return "Circle(" + position + ", " + radius + ")";
  }

  // implement main method for Circle
  public static void main(String[] args) {
    // test Circle with some values
    Circle c1 = new Circle(new Point(43, 37.5), 22);
    out.println("c1 = " + c1);
    out.println("area: " + c1.area());
    // test equals with same values
    Circle c2 = new Circle(new Point(43, 37.5), 22);
    out.println("c1 equals c2: " + c1.equals(c2)); // should be true
    Circle c3 = new Circle(new Point(0, 0), 5);
    out.println("c1 equals c3: " + c1.equals(c3)); // should be false
  }

} // end of class Circle

class TotalAreaCalculator {
  public static double calculate(Shape[] shapes) { // calculateTotalArea method Note: idk if it needed to be renamed
    // for each shape in the shapes array,
    // invoke the object's area() method,
    // summing up the areas
    // and finally returns the total area
    double total = 0;
    for (int i = 0; i < shapes.length; i++) {
      total = total + shapes[i].area();
    }
    return total;
  }
}

class ShapeTest {
  public static Shape[] shapes;

  public static Point readPoint(Scanner scan) {
    String point = scan.next();
    // out.println(point);
    Scanner aPoint = new Scanner(point).useDelimiter("\\s*,\\s*");
    double x = aPoint.nextDouble();
    double y = aPoint.nextDouble();
    // out.println("double " + x);
    // out.println("double " + y);
    return new Point(x, y);
  }

  public static RightTriangle readRightTriangle(Scanner scan) {
    Point[] points = new Point[3];
    int i = 0;
    while (scan.hasNext()) {
      String point = scan.next();
      // out.println(point);
      Scanner aPoint = new Scanner(point).useDelimiter("\\s*,\\s*");
      if (aPoint.hasNext()) {
        double x = aPoint.nextDouble();
        double y = aPoint.nextDouble();
        // out.println("double " + x);
        // out.println("double " + y);
        points[i++] = new Point(x, y);
      }
    }
    return new RightTriangle(points[0], points[1], points[2]);
  }

  public static Square readSquare(Scanner scan) {
    Point p1 = readPoint(scan);
    String dbls = scan.next();
    Scanner dblScan = new Scanner(dbls);
    Double len = dblScan.nextDouble();
    return new Square(p1, len);
  }

  public static Circle readCircle(Scanner scan) {
    Point p1 = readPoint(scan);
    String dbls = scan.next();
    Scanner dblScan = new Scanner(dbls);

    Double r = dblScan.nextDouble();
    // out.println("double " + r);
    return new Circle(p1, r);
  }

  public static Shape[] fileInputShapes(String inFileName)
      throws IOException {
    // read in the shape specifications from infile,
    // construct the shapes and store them in a Shape array
    // This method is essentially "parsing" the input shapes,
    // and involves quite some thought.
    out.println(inFileName);
    File infile = new File(inFileName);
    String delim = "\\s*;[\\s*\\n]*";
    int arrSize = 0;
    Scanner fs = new Scanner(infile).useDelimiter(delim);

    String s = null;
    while (fs.hasNext()) {
      ++arrSize;
      s = fs.next();
      out.println(s);
    }
    out.println("The input file contains " + arrSize + " shapes.");
    shapes = new Shape[arrSize]; // we now know how many shapes are in input

    fs = new Scanner(infile).useDelimiter(delim);
    int i = 0;
    String aShape = null;
    while (fs.hasNext()) {
      aShape = fs.next();
      aShape = aShape.trim();
      // out.println("aShape = "+aShape);
      Scanner inAShape = new Scanner(aShape).useDelimiter("\\s*[()]\\s*");
      String kind = inAShape.next();
      // out.println( kind );
      switch (kind) {
        case "t":
          shapes[i] = readRightTriangle(inAShape);
          // out.println(shapes[i]);
          break;
        case "s":
          shapes[i] = readSquare(inAShape);
          // out.println(shapes[i]);
          break;
        case "c":
          shapes[i] = readCircle(inAShape);
          // out.println(shapes[i]);
          break;
      }
      shapes[i].area = shapes[i].area();
      ++i;
    }
    out.println(shapes.length + " shapes have been created");

    // for (Shape e : shapes) out.println(e);

    fs.close(); // important to close the handle
    return shapes;
  }

  public static void main(String args[]) {
    try {
      if (args.length >= 1) {
        // out.println(args[0]);
        shapes = fileInputShapes(args[0]);
        for (Shape e : shapes) {
          out.println(e);
        }
      } else
        System.err.println("Usage: " + "java ShapeTest input_file_name\n");
    } catch (IOException e) {
    }

    // Test code for the equals method by invoking equals on each shape itself
    out.println("\n== Testing the equals method ...");
    for (Shape s : shapes)
      if (s.equals(s))
        out.println(s + " equals " + s);

    // Implement Task 8.
    // Sort the shapes according to their area and output them nicely in
    // an ascending order of area
    // student's code goes here ...
    Arrays.sort(shapes); // sorts using compareTo which compares by area
    out.println("Sorted shapes by area ");
    for (Shape s : shapes) { // iterate over all shapes
      out.println(s);
    }

    // output the total area of all the shapes
    // student's code goes here ...
    double totalArea = TotalAreaCalculator.calculate(shapes);
    out.println("\nTotal area of all shapes: " + totalArea);

  } // end of main()
} // end of class ShapeTest
