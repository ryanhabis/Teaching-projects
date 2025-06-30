/**
 * Represents a pizza topping with a name and whether it's vegetarian.
 * 
 * This class is used in the Pizza Builder application to manage toppings.
 */ 
public class Topping {
    // Name of the topping (e.g., "Pepperoni", "Mushrooms")
    protected String name;
    // Indicates if the topping is vegetarian
    protected boolean isVegetarian;

    // Constructor to initialize topping name and vegetarian status
    public Topping(String name, boolean isVegetarian) {
        this.name = name;
        this.isVegetarian = isVegetarian;
    }

    // Getter for the topping name
    public String getName() { return name; }
    // Getter to check if the topping is vegetarian
    public boolean isVegetarian() { return isVegetarian; }

    // String representation of the topping, adds (V) if vegetarian
    public String toString() {
        return name + (isVegetarian ? " (V)" : "");
    }
}