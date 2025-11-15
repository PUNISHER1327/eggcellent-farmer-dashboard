/*
 * FarmerFriendly - Arduino Sensor Data to Supabase
 * 
 * This sketch reads combined sensor data and sends it directly to Supabase
 * 
 * WIRING:
 * - DHT22: Data pin to Arduino pin 2
 * - Air Quality Sensor (MQ-135): Analog pin A0
 * 
 * SETUP INSTRUCTIONS:
 * 1. Install required libraries from Arduino Library Manager:
 *    - WiFiNINA (for Arduino with WiFi module)
 *    - DHT sensor library by Adafruit
 *    - ArduinoJson by Benoit Blanchon
 * 
 * 2. Configure your settings below:
 *    - WiFi credentials
 *    - Supabase ANON key (already provided)
 * 
 * 3. Upload to your Arduino board
 */

#include <WiFiNINA.h>
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
#define AIR_QUALITY_PIN A0

// Timing
const unsigned long SEND_INTERVAL = 60000; // Send every 60 seconds
unsigned long lastSendTime = 0;

DHT dht(DHTPIN, DHTTYPE);
WiFiSSLClient client;

void setup() {
  Serial.begin(9600);
  while (!Serial) { delay(10); }
  
  Serial.println("FarmerFriendly Sensor System Starting...");
  Serial.println("========================================");
  Serial.println("Two sensors: Temp&Humidity + Air Quality");
  
  // Initialize DHT sensor
  dht.begin();
  
  // Connect to WiFi
  connectWiFi();
  
  Serial.println("System ready! Sending data every 60 seconds.");
}

void loop() {
  unsigned long currentTime = millis();
  
  // Check if it's time to send data
  if (currentTime - lastSendTime >= SEND_INTERVAL) {
    readAndSendSensorData();
    lastSendTime = currentTime;
  }
  
  delay(1000);
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
  
  // Check if readings are valid
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  
  // Combine temperature and humidity into a single value
  // Using average: (temp + humidity) / 2
  float tempHumidity = (temperature + humidity) / 2.0;
  
  // Read Air Quality sensor (analog value)
  int airQualityRaw = analogRead(AIR_QUALITY_PIN);
  // Convert to 0-100 scale (adjust based on your sensor)
  float airQuality = map(airQualityRaw, 0, 1023, 0, 100);
  
  // Print readings
  Serial.print("Temperature: "); Serial.print(temperature); Serial.println(" °C");
  Serial.print("Humidity: "); Serial.print(humidity); Serial.println(" %");
  Serial.print("Combined Temp&Humidity: "); Serial.println(tempHumidity);
  Serial.print("Air Quality (raw): "); Serial.print(airQualityRaw);
  Serial.print(" -> Scaled: "); Serial.println(airQuality);
  
  // Send to Supabase
  sendToSupabase(tempHumidity, airQuality);
}

void sendToSupabase(float tempHumidity, float airQuality) {
  // Check WiFi connection
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi disconnected. Reconnecting...");
    connectWiFi();
  }
  
  Serial.println("Sending data to Supabase...");
  
  // Create JSON payload
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["temp_humidity"] = tempHumidity;
  jsonDoc["air_quality"] = airQuality;
  
  String jsonData;
  serializeJson(jsonDoc, jsonData);
  
  Serial.print("JSON payload: ");
  Serial.println(jsonData);
  
  // Connect to Supabase
  if (client.connect(supabaseUrl, 443)) {
    Serial.println("Connected to Supabase");
    
    // Send HTTP POST request
    client.println("POST /rest/v1/sensor_data HTTP/1.1");
    client.print("Host: "); client.println(supabaseUrl);
    client.print("apikey: "); client.println(supabaseKey);
    client.print("Authorization: Bearer "); client.println(supabaseKey);
    client.println("Content-Type: application/json");
    client.println("Prefer: return=minimal");
    client.print("Content-Length: ");
    client.println(jsonData.length());
    client.println();
    client.println(jsonData);
    
    // Wait for response
    delay(1000);
    
    // Read response
    Serial.println("Response from Supabase:");
    while (client.available()) {
      String line = client.readStringUntil('\r');
      Serial.print(line);
    }
    Serial.println();
    
    client.stop();
    Serial.println("✓ Data sent successfully!");
  } else {
    Serial.println("✗ Connection to Supabase failed!");
  }
}
