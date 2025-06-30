import java.util.ArrayList;
import java.util.Scanner;

public class StarTracker {
    public static void main(String[] args) {
        // Create a list to store Star objects
        ArrayList<Star> stars = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);
        
        // Add some famous stars with real data (name, constellation, magnitude)
        stars.add(new Star("Sirius", "Canis Major", -1.46));
        stars.add(new Star("Betelgeuse", "Orion", 0.42));
        stars.add(new Star("Vega", "Lyra", 0.03));
        stars.add(new Star("Polaris", "Ursa Minor", 1.98));
        
        // Display menu options to the user
        System.out.println("🔭 NASA Star Tracker 🔭");
        System.out.println("1. List all stars");
        System.out.println("2. Find brightest star");
        System.out.println("3. Add new star");
        System.out.print("Choose (1-3): ");
        
        int choice = scanner.nextInt(); // Read user's menu choice
        scanner.nextLine(); // Consume leftover newline
        
        switch(choice) {
            case 1:
                // List all stars in the tracker
                System.out.println("\n All Tracked Stars ");
                for(Star star : stars) {
                    System.out.println(star);
                }
                break;
                
            case 2:
                // Find and display the brightest star (lowest magnitude)
                Star brightest = stars.get(0);
                for(Star star : stars) {
                    if(star.getMagnitude() < brightest.getMagnitude()) {
                        brightest = star;
                    }
                }
                System.out.println("\n Brightest Star: " + brightest);
                break;
                
            case 3:
                // Add a new star to the tracker
                System.out.print("\nEnter star name: ");
                String name = scanner.nextLine();
                System.out.print("Enter constellation: ");
                String constellation = scanner.nextLine();
                System.out.print("Enter brightness (lower = brighter): ");
                double mag = scanner.nextDouble();
                
                stars.add(new Star(name, constellation, mag));
                System.out.println(" Added new star to NASA database!");
                break;
                
            default:
                // Handle invalid menu choices
                System.out.println("Invalid choice!");
        }
        
        scanner.close(); // Close the scanner to free resources
    }
}