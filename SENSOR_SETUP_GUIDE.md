# Sensor Setup Guide for FarmerFriendly

This guide will help you set up your Arduino sensors to send data directly to your Supabase database.

## Hardware Requirements

1. **Arduino Board with WiFi**
   - Arduino MKR WiFi 1010 (recommended)
   - Arduino Uno WiFi Rev2
   - Or any Arduino with WiFi capability

2. **Sensors**
   - **DHT22**: Combined Temperature & Humidity sensor
   - **MQ-135 or similar**: Air Quality sensor (measures CO2 and ammonia levels)

## Wiring Diagram

### DHT22 Sensor
```
DHT22 Pin 1 (VCC)  → Arduino 5V
DHT22 Pin 2 (Data) → Arduino Digital Pin 2
DHT22 Pin 4 (GND)  → Arduino GND
```

### Air Quality Sensor (MQ-135)
```
MQ-135 VCC  → Arduino 5V
MQ-135 GND  → Arduino GND
MQ-135 AOUT → Arduino Analog Pin A0
```

## Software Setup

### Step 1: Install Arduino IDE
1. Download Arduino IDE from https://www.arduino.cc/en/software
2. Install and open Arduino IDE

### Step 2: Install Required Libraries
In Arduino IDE, go to **Tools > Manage Libraries** and install:
1. **WiFiNINA** (for WiFi connectivity)
2. **DHT sensor library** by Adafruit
3. **ArduinoJson** by Benoit Blanchon

### Step 3: Configure the Arduino Code

1. Open the `arduino_supabase_sensor.ino` file in Arduino IDE

2. Update these lines with your WiFi credentials:
   ```cpp
   const char* ssid = "YOUR_WIFI_SSID";      // Your WiFi name
   const char* password = "YOUR_WIFI_PASSWORD"; // Your WiFi password
   ```

3. The Supabase configuration is already set:
   ```cpp
   const char* supabaseUrl = "ipfqxgzylmfyffeqpdrb.supabase.co";
   const char* supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
   ```

### Step 4: Upload to Arduino
1. Connect your Arduino to your computer via USB
2. Select your Arduino board: **Tools > Board > [Your Arduino Model]**
3. Select the correct port: **Tools > Port > [Your Arduino Port]**
4. Click the **Upload** button (→)

### Step 5: Monitor Serial Output
1. Open **Tools > Serial Monitor**
2. Set baud rate to **9600**
3. You should see output like:
   ```
   FarmerFriendly Sensor System Starting...
   ========================================
   Two sensors: Temp&Humidity + Air Quality
   Connecting to WiFi: YourWiFiName
   .....
   WiFi connected!
   IP address: 192.168.1.100
   System ready! Sending data every 60 seconds.
   ```

## Understanding the Sensor Data

### Sensor 1: Temperature & Humidity (Combined)
- **Source**: DHT22 sensor
- **Value**: Average of temperature (°C) and humidity (%)
- **Formula**: `(temperature + humidity) / 2`
- **Database column**: `temp_humidity`

### Sensor 2: Air Quality
- **Source**: MQ-135 sensor
- **Measures**: CO2 and ammonia levels in the air
- **Value**: Scaled from 0-100 (0 = excellent, 100 = poor)
- **Database column**: `air_quality`

## Data Transmission

- **Frequency**: Every 60 seconds (configurable)
- **Method**: HTTPS POST to Supabase REST API
- **Format**: JSON
  ```json
  {
    "temp_humidity": 45.5,
    "air_quality": 32
  }
  ```

## Troubleshooting

### Arduino won't connect to WiFi
- Double-check WiFi credentials
- Make sure your WiFi network is 2.4GHz (not 5GHz)
- Check if your WiFi requires special authentication

### Sensor readings are NaN or 0
- Check sensor wiring
- Ensure sensors have proper power supply
- Wait 2-3 seconds after sensor initialization

### Data not appearing in Supabase
- Check Serial Monitor for error messages
- Verify Supabase URL and API key
- Check if the `sensor_data` table exists in Supabase
- Ensure RLS policies allow INSERT operations

### Connection refused errors
- Make sure your Arduino has internet access
- Check if port 443 (HTTPS) is open on your network
- Try pinging the Supabase URL from another device

## Customization

### Adjust Sending Interval
In the Arduino code, change:
```cpp
const unsigned long SEND_INTERVAL = 60000; // milliseconds
```
- 60000 = 1 minute
- 300000 = 5 minutes
- 3600000 = 1 hour

### Calibrate Air Quality Sensor
Modify the mapping in `readAndSendSensorData()`:
```cpp
float airQuality = map(airQualityRaw, 0, 1023, 0, 100);
```

Adjust the range based on your sensor's specifications.

## Next Steps

Once your sensors are sending data:
1. View live data on the dashboard at: https://yourapp.lovable.app
2. Check the "Live Sensor Data" section
3. View historical trends in the "Analytics" section
4. Monitor the sensor data table in Supabase

## Support

If you need help:
1. Check the Serial Monitor for error messages
2. Review the wiring diagram
3. Verify all library installations
4. Check Supabase connection and permissions
