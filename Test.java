import java.util.HashMap;
import java.util.ArrayList;

// Do I still know java? probs not
public class Test {
  public static void main(String[] args) {
    System.out.println("testing");

    HashMap<String, String> map = new HashMap<String, String>();
    map.put("hi", "hello");
    System.out.println(map.get("hi"));

    String[] array = new String[3];
    array[0] = "hello";
    array[1] = "goodbye";

    ArrayList<String> array2 = new ArrayList<String>();
    array2.add("boob");
    array2.add("butt");

    for (String string : array2) {
      System.out.println(string);
    }
  }
}