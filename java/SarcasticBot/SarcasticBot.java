package SarcasticBot;

import java.util.Scanner;
import java.util.Random;

public class SarcasticBot {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();
        
        // Snarky responses for greetings, roasts, and backhanded compliments
        String[] greetings = {"Oh great, another human.", "You again?", "Didn't we just do this?"};
        String[] roasts = {
            "Wow. That was almost intelligent.",
            "Did your cat walk on your keyboard?",
            "I've seen potatoes with better ideas.",
            "Nope. Try again, but with ✨thought✨ this time."
        };
        String[] compliments = {
            "Not terrible... for a human.",
            "Broken clock is right twice a day I guess.",
            "*gasp* You did a thing!"
        };
        
        // Print a random greeting to start the conversation
        System.out.println("Bot: " + greetings[random.nextInt(greetings.length)]);
        System.out.println("(Type 'bye' to exit)");
        
        // Main chat loop
        while(true) {
            System.out.print("\nYou: ");
            String input = scanner.nextLine().toLowerCase(); // Read user input
            
            // If user says 'bye', end the conversation
            if(input.equals("bye")) {
                System.out.println("Bot: Finally! Go bother someone else.");
                break;
            }
            // If input is empty, respond sarcastically
            else if(input.isEmpty()) {
                System.out.println("Bot: *crickets* ...even silence is more interesting.");
            }
            // If input contains a question mark, mock the question
            else if(input.contains("?")) {
                System.out.println("Bot: That's a terrible question. Next!");
            }
            // If input is very short, respond with extra sarcasm
            else if(input.length() < 5) {
                System.out.println("Bot: \"" + input + "\"? Really? That's all you got?");
            }
            else {
                // 30% chance of giving a backhanded compliment, otherwise roast
                if(random.nextInt(10) < 3) {
                    System.out.println("Bot: " + compliments[random.nextInt(compliments.length)]);
                } 
                else {
                    System.out.println("Bot: " + roasts[random.nextInt(roasts.length)]);
                }
            }
        }
        scanner.close(); // Close the scanner to free resources
    }
}