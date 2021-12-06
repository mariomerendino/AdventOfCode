package Day1;

import java.io.File; 
import java.util.Scanner;
import java.util.ArrayList;
import java.io.FileNotFoundException; 
public class Day1 {
  public static void main (String[] args){
    try {
      File file = new File("./input.txt");
      Scanner reader =  new Scanner(file);
      ArrayList<String> lines = new ArrayList<String>();

      while (reader.hasNextLine()) {
        lines.add(reader.nextLine());
      }
  
      int first = Integer.parseInt(lines.get(0));
      int second = Integer.parseInt(lines.get(1));
      int third = Integer.parseInt(lines.get(2));
      int originalSlidingTotal = first + second + third;
      int newSlidingTotal = 0;
      int counter = 0;

      for (int i = 3; i < lines.size(); i++) {
        newSlidingTotal = Integer.parseInt(lines.get(i)) + Integer.parseInt(lines.get(i -1)) + Integer.parseInt(lines.get(i -2));
        if (originalSlidingTotal < newSlidingTotal) {
          counter++;
        }
        originalSlidingTotal = newSlidingTotal;
      }
  
      System.out.print("Current Count is ");
      System.out.print(counter);

    }


    catch(FileNotFoundException e) {
      System.out.print("Could not find file");

    }

  }
}
