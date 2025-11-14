/*
 * FarmerFriendly - Arduino Sensor Data to Supabase
 * 
 * This sketch reads sensor data and sends it directly to Supabase
 * 
 * WIRING:
 * - DHT22: Data pin to Arduino pin 2
 * - MQ-135 (CO2): Analog pin A0
 * - MQ-137 (Ammonia): Analog pin A1
 * 
 * SETUP INSTRUCTIONS:
 * 1. Install required libraries from Arduino Library Manager:
 *    - WiFiNINA (for Arduino with WiFi module) OR
 *    - ESP8266WiFi (for ESP8266 boards)
 *    - DHT sensor library by Adafruit
 *    - ArduinoJson by Benoit Blanchon
 * 
 * 2. Configure your settings below:
 *    - WiFi credentials
 *    - Supabase URL (replace PROJECT_ID)
 *    - Supabase ANON key
 * 
 * 3. Upload to your Arduino board
 */

#include <WiFiNINA.h>  // Use <ESP8266WiFi.h> for ESP8266
#include <DHT.h>
#include <ArduinoJson.h>

// ========== CONFIGURATION - UPDATE THESE VALUES ==========
const char* ssid = "YOUR_WIFI_SSID";           // Your WiFi network name
const char* password = "YOUR_WIFI_PASSWORD";    // Your WiFi password

// Supabase Configuration
const char* supabaseUrl = "ipfqxgzylmfyffeqpdrb.supabase.co";
const char* supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwZnF4Z3p5bG1meWZmZXFwZHJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NjgyOTUsImV4cCI6MjA3NzM0NDI5NX0.JFIvOF_hF3IKCO8br3dGoZhP7ks6HLwyGS0ryH8YBMA";

// Sensor pins
#define DHTPIN 2
#define DHTTYPE DHT22
#define CO2_PIN A0
#define AMMONIA_PIN A1

// Timing
const unsigned long SEND_INTERVAL = 300000; // Send every 5 minutes (300000ms)
unsigned long lastSendTime = 0;

DHT dht(DHTPIN, DHTTYPE);
WiFiSSLClient client;

void setup() {
  Serial.begin(9600);
  while (!Serial) { delay(10); }
  
  Serial.println("FarmerFriendly Sensor System Starting...");
  
  // Initialize DHT sensor
  dht.begin();
  
  // Connect to WiFi
  connectWiFi();
  
  Serial.println("System ready! Sending data every 5 minutes.");
}

void loop() {
  unsigned long currentTime = millis();
  
  // Check if it's time to send data
  if (currentTime - lastSendTime >= SEND_INTERVAL) {
    readAndSendSensorData();
    lastSendTime = currentTime;
  }
  
  delay(1000); // Small delay to prevent overwhelming the loop
}

void connectWiFi() {
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);
  
  int status = WiFi.begin(ssid, password);
  
  // Wait for connection
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(1000);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi connected!");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nFailed to connect to WiFi. Please check credentials.");
  }
}

void readAndSendSensorData() {
  Serial.println("\n=== Reading Sensors ===");
  
  // Read temperature and humidity from DHT22
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  
  // Read CO2 and Ammonia from MQ sensors (analog values)
  int co2Raw = analogRead(CO2_PIN);
  int ammoniaRaw = analogRead(AMMONIA_PIN);
  
  // Convert analog readings to ppm (simplified conversion)
  // You may need to calibrate these formulas based on your sensors
  float co2 = map(co2Raw, 0, 1023, 300, 2000);  // 300-2000 ppm range
  float ammonia = map(ammoniaRaw, 0, 1023, 0, 100);  // 0-100 ppm range
  
  // Check if readings are valid
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  
  // Print readings
  Serial.print("Temperature: "); Serial.print(temperature); Serial.println(" °C");
  Serial.print("Humidity: "); Serial.print(humidity); Serial.println(" %");
  Serial.print("CO2: "); Serial.print(co2); Serial.println(" ppm");
  Serial.print("Ammonia: "); Serial.print(ammonia); Serial.println(" ppm");
  
  // Send to Supabase
  sendToSupabase(temperature, humidity, co2, ammonia);
}

void sendToSupabase(float temp, float hum, float co2, float amm) {
  Serial.println("\n=== Sending to Supabase ===");
  
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi not connected. Reconnecting...");
    connectWiFi();
    return;
  }
  
  // Connect to Supabase
  if (!client.connect(supabaseUrl, 443)) {
    Serial.println("Connection to Supabase failed!");
    return;
  }
  
  // Create JSON payload
  StaticJsonDocument<200> doc;
  doc["temperature"] = temp;
  doc["humidity"] = hum;
  doc["carbon_dioxide"] = co2;
  doc["ammonia"] = amm;
  
  String jsonPayload;
  serializeJson(doc, jsonPayload);
  
  // Build HTTP POST request
  String request = "POST /rest/v1/sensor_data HTTP/1.1\r\n";
  request += "Host: " + String(supabaseUrl) + "\r\n";
  request += "apikey: " + String(supabaseKey) + "\r\n";
  request += "Authorization: Bearer " + String(supabaseKey) + "\r\n";
  request += "Content-Type: application/json\r\n";
  request += "Prefer: return=minimal\r\n";
  request += "Content-Length: " + String(jsonPayload.length()) + "\r\n";
  request += "\r\n";
  request += jsonPayload;
  
  // Send request
  client.print(request);
  
  // Read response
  delay(1000);
  Serial.println("Response:");
  while (client.available()) {
    String line = client.readStringUntil('\r');
    Serial.print(line);
  }
  
  client.stop();
  Serial.println("\n=== Data sent successfully! ===");
}
