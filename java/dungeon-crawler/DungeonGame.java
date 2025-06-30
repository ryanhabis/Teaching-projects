import java.util.Scanner;
import java.util.Random;

import dungeon_crawler.Player;
import dungeon_crawler.Monster; 


public class DungeonGame {
    private static final int SIZE = 8;
    private static char[][] dungeon = new char[SIZE][SIZE];
    private static Player player = new player();
    private static Random rand = new Random();

    ppblic static void main(String[] args) {
        initializeem.out.println("WASD to move, Q to quit");
        printDungeon();

        while (player.health > 0) {
            System.out.print("Move: ");
            char input = scanner.next().toLowerCase().charAt(0);
            
            if (input == 'q') break;
            movePlayer(input);
            printDungeon();
        }
    }

    private static void initializeDungeon() {
        // Fill with empty spaces
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                dungeon[i][j] = '.';
            }
        }

        // Place player
        dungeon[0][0] = 'P';
        
        // Place monsters (20% chance per cell)
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                if (rand.nextDouble() < 0.2 && dungeon[i][j] != 'P') {
                    dungeon[i][j] = 'M';
                }
            }
        }

        // Place treasure (10% chance)
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                if (rand.nextDouble() < 0.1 && dungeon[i][j] == '.') {
                    dungeon[i][j] = 'T';
                }
            }
        }
    }

    private static void movePlayer(char direction) {
        // Find player position
        int px = -1, py = -1;
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                if (dungeon[i][j] == 'P') {
                    px = i;
                    py = j;
                }
            }
        }

        int newX = px, newY = py;
        
        switch (direction) {
            case 'w': newX--; break;
            case 'a': newY--; break;
            case 's': newX++; break;
            case 'd': newY++; break;
        }

        // Check boundaries
        if (newX < 0 || newX >= SIZE || newY < 0 || newY >= SIZE) {
            System.out.println("Can't move there!");
            return;
        }

        // Handle collisions
        char target = dungeon[newX][newY];
        switch (target) {
            case 'M':
                fightMonster();
                break;
            case 'T':
                System.out.println("💎 Found treasure! (+10 gold)");
                player.gold += 10;
                break;
        }

        // Move player
        dungeon[px][py] = '.';
        dungeon[newX][newY] = 'P';
    }

    private static void fightMonster() {
        int damage = rand.nextInt(5) + 1;
        player.health -= damage;
        System.out.printf("⚔️ Monster hit you for %d damage! (%d HP left)\n", 
                         damage, player.health);
    }

    private static void printDungeon() {
        System.out.println("\nHealth: " + player.health + " | Gold: " + player.gold);
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                System.out.print(dungeon[i][j] + " ");
            }
            System.out.println();
        }
    }
}