-- Drop old farm2_sensor_data table if exists and create new structure
DROP TABLE IF EXISTS farm2_sensor_data CASCADE;

-- Alter sensor_data table to have clearer column names
ALTER TABLE sensor_data 
  RENAME COLUMN "temperature and humidity" TO temp_humidity;

ALTER TABLE sensor_data 
  RENAME COLUMN "ammonia and co2" TO air_quality;

-- Enable Row Level Security (if not already enabled)
ALTER TABLE sensor_data ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'sensor_data' 
    AND policyname = 'Allow public read access to sensor_data'
  ) THEN
    CREATE POLICY "Allow public read access to sensor_data"
    ON sensor_data FOR SELECT
    USING (true);
  END IF;
END $$;

-- Enable realtime
ALTER TABLE sensor_data REPLICA IDENTITY FULL;

-- Add to realtime publication if not already added
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'sensor_data'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE sensor_data;
  END IF;
END $$;