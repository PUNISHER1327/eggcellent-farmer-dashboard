/*
 * Arduino Motor Control for Poultry Farm
 * 
 * This sketch receives commands from the web interface via Serial
 * and controls a motor connected to the Arduino.
 * 
 * Hardware Setup:
 * - Motor connected to pin 9 (or connect to a motor driver module)
 * - For DC motor with driver: Connect motor driver IN1 to pin 9
 * - For relay module: Connect relay signal pin to pin 9
 * 
 * Commands:
 * - "ON\n" - Turn motor ON
 * - "OFF\n" - Turn motor OFF
 */

const int MOTOR_PIN = 9;  // Pin connected to motor/relay
bool motorState = false;

void setup() {
  // Initialize serial communication at 9600 baud
  Serial.begin(9600);
  
  // Set motor pin as output
  pinMode(MOTOR_PIN, OUTPUT);
  digitalWrite(MOTOR_PIN, LOW);
  
  // Send ready message
  Serial.println("Arduino Ready");
}

void loop() {
  // Check if data is available to read
  if (Serial.available() > 0) {
    // Read the incoming command
    String command = Serial.readStringUntil('\n');
    command.trim();  // Remove any whitespace
    
    // Process the command
    if (command == "ON") {
      motorState = true;
      digitalWrite(MOTOR_PIN, HIGH);
      Serial.println("Motor ON");
    } 
    else if (command == "OFF") {
      motorState = false;
      digitalWrite(MOTOR_PIN, LOW);
      Serial.println("Motor OFF");
    }
    else {
      Serial.println("Unknown command: " + command);
    }
  }
}

/*
 * WIRING INSTRUCTIONS:
 * 
 * Option 1: Using a Relay Module (Recommended for high power motors)
 * ----------------------------------------------------------------
 * Relay Module    Arduino
 * VCC        ->   5V
 * GND        ->   GND
 * IN         ->   Pin 9
 * 
 * Motor connects to relay's NO (Normally Open) and COM terminals
 * Power supply connects to relay's NO and motor
 * 
 * Option 2: Using L298N Motor Driver
 * ----------------------------------
 * L298N          Arduino
 * IN1       ->   Pin 9
 * IN2       ->   GND (for single direction)
 * ENA       ->   5V (or PWM pin for speed control)
 * VCC       ->   5V
 * GND       ->   GND
 * 
 * Motor connects to OUT1 and OUT2
 * External power supply (if motor needs >5V) connects to 12V and GND
 * 
 * Option 3: Direct Connection (Only for very small motors <40mA)
 * -------------------------------------------------------------
 * Motor connects between Pin 9 and GND
 * Add a diode (1N4007) across motor terminals for protection
 */
