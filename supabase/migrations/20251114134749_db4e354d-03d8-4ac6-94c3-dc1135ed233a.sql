-- Create ml_predictions table
CREATE TABLE ml_predictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prediction_type TEXT NOT NULL,
  prediction_value NUMERIC NOT NULL,
  confidence NUMERIC DEFAULT 0.95,
  sensor_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE ml_predictions ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to ml_predictions"
ON ml_predictions FOR SELECT
USING (true);

-- Enable realtime
ALTER TABLE ml_predictions REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE ml_predictions;