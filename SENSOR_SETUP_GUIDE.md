# Sensor Setup Guide for FarmerFriendly

This guide will help you set up your Arduino sensors to send data directly to your Supabase database.

## Hardware Requirements

1. **Arduino Board with WiFi**
   - Arduino MKR WiFi 1010 (recommended)
   - Arduino Uno WiFi Rev2
   - Or any Arduino with WiFi capability

2. **Sensors**
   - **DHT22**: Temperature & Humidity sensor
   - **MQ-135 or similar**: Air Quality sensor (measures CO2 and ammonia levels)

## Wiring Diagram

### DHT22 Sensor (Temperature & Humidity)
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

2. Update these lines with your WiFi credentials (lines 27-28):
   ```cpp
   const char* ssid = "YOUR_WIFI_SSID";      // Your WiFi name
   const char* password = "YOUR_WIFI_PASSWORD"; // Your WiFi password
   ```

3. The Supabase configuration is already set - no changes needed!

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
   Sensors: Temperature, Humidity, Air Quality
   Connecting to WiFi: YourWiFiName
   .....
   WiFi connected!
   IP address: 192.168.1.100
   System ready! Sending data every 60 seconds.
   ```

## Understanding the Sensor Data

### Sensor 1: Temperature
- **Source**: DHT22 sensor
- **Unit**: Degrees Celsius (°C)
- **Range**: -40°C to 80°C
- **Optimal range for chickens**: 20-25°C
- **Database column**: `temperature`

### Sensor 2: Humidity
- **Source**: DHT22 sensor
- **Unit**: Percentage (%)
- **Range**: 0% to 100%
- **Optimal range for chickens**: 50-70%
- **Database column**: `humidity`

### Sensor 3: Air Quality
- **Source**: MQ-135 sensor
- **Measures**: CO2 and ammonia levels in the air
- **Value**: Scaled from 0-100 (0 = excellent, 100 = poor)
- **Optimal range**: 20-40
- **Database column**: `air_quality`

## Data Transmission

- **Frequency**: Every 60 seconds (configurable)
- **Method**: HTTPS POST to Supabase REST API
- **Format**: JSON with 3 separate values
  ```json
  {
    "temperature": 25.5,
    "humidity": 65.2,
    "air_quality": 32
  }
  ```

## Troubleshooting

### Arduino won't connect to WiFi
- Double-check WiFi credentials (case-sensitive!)
- Make sure your WiFi network is 2.4GHz (not 5GHz)
- Check if your WiFi requires special authentication
- Try moving Arduino closer to the router

### Sensor readings are NaN or 0
- Check sensor wiring - ensure connections are firm
- Ensure sensors have proper power supply (5V)
- Wait 2-3 seconds after sensor initialization
- Try a different DHT22 sensor if problem persists

### Data not appearing in Supabase
- Check Serial Monitor for error messages
- Verify Supabase URL is correct
- Check if the `sensor_data` table exists in Supabase
- Ensure RLS policies allow public INSERT operations
- Check network firewall settings

### Connection refused errors
- Make sure your Arduino has internet access
- Check if port 443 (HTTPS) is open on your network
- Try pinging `ipfqxgzylmfyffeqpdrb.supabase.co` from another device
- Contact your network administrator

## Customization

### Adjust Sending Interval
In the Arduino code (line 40), change:
```cpp
const unsigned long SEND_INTERVAL = 60000; // milliseconds
```
- 5000 = 5 seconds (for testing)
- 60000 = 1 minute
- 300000 = 5 minutes
- 3600000 = 1 hour

### Calibrate Air Quality Sensor
Modify the mapping in `readAndSendSensorData()` (line 117):
```cpp
float airQuality = map(airQualityRaw, 0, 1023, 0, 100);
```

Adjust the range based on your sensor's specifications and calibration data.

## Next Steps

Once your sensors are sending data:
1. View live data on your dashboard
2. Check the "Live Sensor Data" table for recent readings
3. View historical trends in the "Sensor Trends" chart
4. Monitor air quality to control the conveyor belt system
5. Check the Analytics page for detailed insights

## Data in the Dashboard

Your dashboard will show:
- **Current readings**: Latest temperature, humidity, and air quality
- **Historical charts**: 24-hour trends for all sensors
- **Alerts**: When values are outside optimal ranges
- **Statistics**: Average, min, max values

## Support

If you need help:
1. Check the Serial Monitor for detailed error messages
2. Review the wiring diagram carefully
3. Verify all library installations are complete
4. Check Supabase dashboard for connection logs
5. Ensure your Arduino board supports WiFi
