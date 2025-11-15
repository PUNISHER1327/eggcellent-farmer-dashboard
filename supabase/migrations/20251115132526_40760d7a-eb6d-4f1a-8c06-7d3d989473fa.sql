-- Separate temp_humidity into temperature and humidity columns
ALTER TABLE sensor_data 
  DROP COLUMN IF EXISTS temp_humidity;

ALTER TABLE sensor_data 
  ADD COLUMN temperature DOUBLE PRECISION,
  ADD COLUMN humidity DOUBLE PRECISION;