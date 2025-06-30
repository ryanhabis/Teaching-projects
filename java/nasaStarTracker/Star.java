public class Star {
    private String name;
    private String constellation;
    /**
     * Brightness (lower = brighter)
     */
    private double magnitude;
    
    public Star(String name, String constellation, double magnitude) {
        this.name = name;
        this.constellation = constellation;
        this.magnitude = magnitude;
    }
    
    // Getters
    public String getName() { return name; }
    public String getConstellation() { return constellation; }
    public double getMagnitude() { return magnitude; }
    
    @Override
    public String toString() {
        return String.format("%s (in %s) - Brightness: %.1f", 
               name, constellation, magnitude);
    }
}