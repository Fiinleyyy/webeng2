import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SyncRouteWithURL = (start, destination, setStart, setDestination) => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Start/Ende aus der URL lesen und setzen
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const startParam = query.get("start");
    const endParam = query.get("end");

    if (startParam && endParam) {
      const [sLat, sLng] = startParam.split(',');
      const [eLat, eLng] = endParam.split(',');

      if (!isNaN(sLat) && !isNaN(sLng) && !isNaN(eLat) && !isNaN(eLng)) {
        setStart({ lat: parseFloat(sLat), lng: parseFloat(sLng) });
        setDestination({ lat: parseFloat(eLat), lng: parseFloat(eLng) });
      }
    }
  }, [location.search, setStart, setDestination]);

  // 2. URL automatisch aktualisieren, wenn sich Start/Ziel ändern
  useEffect(() => {
    if (start && destination) {
      const startStr = `${start.lat},${start.lng}`;
      const endStr = `${destination.lat},${destination.lng}`;

      const current = new URLSearchParams(location.search);
      const currentStart = current.get("start");
      const currentEnd = current.get("end");

      if (currentStart !== startStr || currentEnd !== endStr) {
        navigate(`?start=${startStr}&end=${endStr}`, { replace: true });
      }
    }
  }, [start, destination, location.search, navigate]);
};

export default SyncRouteWithURL;