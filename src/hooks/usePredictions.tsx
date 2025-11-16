import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Prediction {
  id: string;
  prediction_type: string;
  prediction_value: number;
  confidence: number;
  sensor_data: {
    temperature: number;
    humidity: number;
    air_quality: number;
  };
  created_at: string;
}

export const usePredictions = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPredictions();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('ml_predictions_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'ml_predictions',
        },
        (payload) => {
          console.log('New prediction:', payload);
          setPredictions((prev) => [payload.new as Prediction, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPredictions = async () => {
    try {
      const { data, error } = await supabase
        .from('ml_predictions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setPredictions((data || []) as Prediction[]);
    } catch (error) {
      console.error('Error fetching predictions:', error);
    } finally {
      setLoading(false);
    }
  };

  return { predictions, loading, refetch: fetchPredictions };
};

export const useRequestPrediction = () => {
  const [requesting, setRequesting] = useState(false);

  const requestPrediction = async (sensorData: {
    temperature: number;
    humidity: number;
    air_quality: number;
  }) => {
    setRequesting(true);
    try {
      const { data, error } = await supabase.functions.invoke('ml-predict-tfjs', {
        body: { sensorData },
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error requesting prediction:', error);
      throw error;
    } finally {
      setRequesting(false);
    }
  };

  return { requestPrediction, requesting };
};
