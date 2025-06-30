package AdventureGame;
import java.util.Scanner;

public class AdventureGame {
    public static void main(String[] args) {
        // Create a Scanner object for user input
        Scanner scanner = new Scanner(System.in);
        String playerName;
        int health = 100; // Player's starting health
        boolean hasSword = false; // Track if player has the sword

        System.out.println("=== TEXT ADVENTURE GAME ===");
        System.out.print("Enter your name: ");
        playerName = scanner.nextLine(); // Get player's name

        System.out.println("\nWelcome, " + playerName + "! You find yourself in a dark forest.");
        System.out.println("Health: " + health);

        // First choice: which path to take
        System.out.println("\nA path splits in two directions:");
        System.out.println("1. Go left toward a cave");
        System.out.println("2. Go right toward a river");
        System.out.print("Choose (1 or 2): ");
        
        int choice1 = scanner.nextInt(); // Get player's path choice

        if (choice1 == 1) {
            // Cave path
            System.out.println("\nYou enter the cave and see a rusty sword!");
            System.out.println("1. Take the sword");
            System.out.println("2. Ignore it");
            System.out.print("Choose: ");
            
            int swordChoice = scanner.nextInt(); // Choice to take sword or not
            if (swordChoice == 1) {
                hasSword = true;
                System.out.println("You equipped the sword! ⚔️");
            }

            // Encounter with a spider
            System.out.println("\nA giant spider attacks!");
            if (hasSword) {
                System.out.println("You slash the spider with your sword! It dies.");
            } else {
                health -= 30;
                System.out.println("You punch it but get bitten! (-30 health)");
            }
        } else {
            // River path
            System.out.println("\nYou find a boat by the river.");
            System.out.println("1. Cross the river");
            System.out.println("2. Follow the riverbank");
            System.out.print("Choose: ");
            
            int riverChoice = scanner.nextInt(); // Choice at the river
            if (riverChoice == 1) {
                System.out.println("\nThe boat capsizes! You barely make it back.");
                health -= 20;
            } else {
                System.out.println("\nYou meet a friendly traveler who gives you a potion! (+20 health)");
                health += 20;
            }
        }

        // Final outcome
        System.out.println("\n=== GAME OVER ===");
        System.out.println("Final Health: " + health );
        if (health > 0) {
            System.out.println(playerName + " survived the adventure!");
        } else {
            System.out.println(playerName + " didn't make it...");
        }
        scanner.close(); // Close the scanner to prevent resource leak
    }
}
