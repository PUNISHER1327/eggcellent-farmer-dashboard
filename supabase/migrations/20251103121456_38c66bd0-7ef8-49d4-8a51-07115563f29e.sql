-- Enable real-time updates for sensor_data table
ALTER TABLE sensor_data REPLICA IDENTITY FULL;

-- Add table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE sensor_data;