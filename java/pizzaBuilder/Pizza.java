import java.util.ArrayList;
import java.util.Scanner;
/**
 * A simple pizza builder application that allows users to create a pizza
 * by selecting its size and toppings. It includes some humorous elements
 * like funny toppings and sarcastic messages.
 */

public class Pizza {
    // List to store selected toppings
    private ArrayList<Topping> toppings = new ArrayList<>();
    // Pizza size (S, M, or L)
    private String size;

    // Constructor to set pizza size
    public Pizza(String size) {
        this.size = size;
    }

    // Add a topping to the pizza
    public void addTopping(Topping topping) {
        toppings.add(topping);
    }

    // Display the final pizza order
    public void displayPizza() {
        System.out.println("\n=== YOUR PIZZA ORDER ===");
        System.out.println("Size: " + size);
        System.out.println("Toppings:");

        // If no toppings, print a funny message
        if (toppings.isEmpty()) {
            System.out.println("(Just cheese... boring!)");
        } else {
            // List all selected toppings
            for (Topping t : toppings) {
                System.out.println("- " + t);
            }
        }

        // Print a message if the pizza is loaded with toppings
        if (toppings.size() >= 4) {
            System.out.println("\n Whoa! That's a loaded pizza!");
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Welcome message and prompt for pizza size
        System.out.println(" PIZZA BUILDER ");
        System.out.print("Choose size (S/M/L): ");
        String size = scanner.nextLine().toUpperCase();

        // Create a new Pizza object with the chosen size
        Pizza pizza = new Pizza(size);

        // Define available toppings
        Topping[] menu = {
            new Topping("Pepperoni", false),
            new Topping("Mushrooms", true),
            new Topping("Pineapple", true),
            new Topping("Gummy Bears", true), // Funny topping!
            new Topping("Hot Sauce", true),
            new Topping("Extra Cheese", true)
        };

        // Loop to let the user select toppings
        while (true) {
            System.out.println("\nAVAILABLE TOPPINGS:");
            for (int i = 0; i < menu.length; i++) {
                System.out.println((i+1) + ". " + menu[i]);
            }
            System.out.println("0. Finish Order");
            System.out.print("Choose topping (1-" + menu.length + "): ");
            
            int choice = scanner.nextInt();
            if (choice == 0) break; // Finish order
            if (choice < 1 || choice > menu.length) {
                System.out.println("Invalid choice! Try again.");
                continue;
            }

            // Add the selected topping to the pizza
            pizza.addTopping(menu[choice-1]);
            System.out.println("Added " + menu[choice-1].getName() + "!");
        }

        // Display the final pizza order
        pizza.displayPizza();
        
        // Special message if pineapple is chosen
        if (pizza.toppings.stream().anyMatch(t -> t.getName().equals("Pineapple"))) {
            System.out.println("\n NOTE: Pineapple belongs on pizza! Fight me!");
        }
        
        scanner.close(); // Close the scanner
    }
}