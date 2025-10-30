-- Create sensor_data table for farm 1
CREATE TABLE public.sensor_data (
  id SERIAL PRIMARY KEY,
  temperature DOUBLE PRECISION,
  humidity DOUBLE PRECISION,
  carbon_dioxide DOUBLE PRECISION,
  ammonia DOUBLE PRECISION,
  timestamp TIMESTAMPTZ DEFAULT now()
);

-- Create farm2_sensor_data table for farm 2
CREATE TABLE public.farm2_sensor_data (
  id SERIAL PRIMARY KEY,
  temperature DOUBLE PRECISION,
  humidity DOUBLE PRECISION,
  carbon_dioxide DOUBLE PRECISION,
  ammonia DOUBLE PRECISION,
  timestamp TIMESTAMPTZ DEFAULT now()
);

-- Add some initial test data to sensor_data (Farm 1)
INSERT INTO public.sensor_data (temperature, humidity, carbon_dioxide, ammonia, timestamp)
VALUES 
  (26.5, 60.0, 400.0, 12.0, now()),
  (27.2, 62.0, 420.0, 13.5, now() - interval '5 minutes'),
  (26.8, 61.0, 410.0, 12.5, now() - interval '10 minutes');

-- Add some initial test data to farm2_sensor_data (Farm 2)
INSERT INTO public.farm2_sensor_data (temperature, humidity, carbon_dioxide, ammonia, timestamp)
VALUES 
  (28.5, 65.0, 450.0, 15.0, now()),
  (29.1, 67.0, 500.0, 18.0, now() - interval '5 minutes'),
  (28.7, 66.0, 480.0, 16.5, now() - interval '10 minutes');

-- Enable Row Level Security (allow public read access for now)
ALTER TABLE public.sensor_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farm2_sensor_data ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access to sensor_data" 
ON public.sensor_data 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to farm2_sensor_data" 
ON public.farm2_sensor_data 
FOR SELECT 
USING (true);