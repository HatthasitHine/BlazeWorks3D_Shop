import { useEffect, useRef } from 'react';
import axios from 'axios';

export const useAnalytics = (activeTab) => {
  const visitIdRef = useRef(null);
  const durationRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // When activeTab changes, we record a new visit
    let isMounted = true;
    durationRef.current = 0;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const recordVisit = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const res = await axios.post('http://localhost:3001/api/analytics/visit', 
          { page: activeTab }, 
          { headers }
        );
        
        if (isMounted) {
          visitIdRef.current = res.data.id;
          
          // Start heartbeat every 10 seconds
          intervalRef.current = setInterval(async () => {
            durationRef.current += 10;
            try {
              await axios.post('http://localhost:3001/api/analytics/heartbeat', {
                visitId: visitIdRef.current,
                duration: durationRef.current
              });
            } catch (err) {
              // ignore heartbeat errors
            }
          }, 10000);
        }
      } catch (error) {
        console.error('Failed to record visit', error);
      }
    };

    recordVisit();

    return () => {
      isMounted = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeTab]);
};
