import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin } from 'lucide-react';

interface Aircraft {
  id: string;
  model: string;
  location: string;
  status: string;
  coordinates: [number, number];
}

interface FleetMapProps {
  aircraft: Aircraft[];
}

// Location coordinates mapping
const locationCoordinates: Record<string, [number, number]> = {
  'Dubai International (DXB)': [55.3644, 25.2532],
  'Emirates Engineering': [55.3644, 25.2532],
  'Heathrow (LHR)': [-0.4543, 51.4700],
  'JFK International (JFK)': [-73.7781, 40.6413],
  'Singapore (SIN)': [103.9915, 1.3644],
};

const FleetMap: React.FC<FleetMapProps> = ({ aircraft }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || mapInitialized) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        projection: { name: 'globe' },
        zoom: 1.5,
        center: [30, 15],
        pitch: 0,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add atmosphere and fog effects
      map.current.on('style.load', () => {
        map.current?.setFog({
          color: 'rgb(50, 50, 70)',
          'high-color': 'rgb(30, 30, 50)',
          'horizon-blend': 0.1,
        });
      });

      // Rotation animation settings
      const secondsPerRevolution = 120;
      const maxSpinZoom = 5;
      const slowSpinZoom = 3;
      let userInteracting = false;
      let spinEnabled = true;

      // Spin globe function
      function spinGlobe() {
        if (!map.current) return;
        
        const zoom = map.current.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
          let distancePerSecond = 360 / secondsPerRevolution;
          if (zoom > slowSpinZoom) {
            const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
          }
          const center = map.current.getCenter();
          center.lng -= distancePerSecond;
          map.current.easeTo({ center, duration: 1000, easing: (n) => n });
        }
      }

      // Event listeners for interaction
      map.current.on('mousedown', () => {
        userInteracting = true;
      });
      
      map.current.on('dragstart', () => {
        userInteracting = true;
      });
      
      map.current.on('mouseup', () => {
        userInteracting = false;
        spinGlobe();
      });
      
      map.current.on('touchend', () => {
        userInteracting = false;
        spinGlobe();
      });

      map.current.on('moveend', () => {
        spinGlobe();
      });

      // Add aircraft markers
      aircraft.forEach((ac) => {
        if (!map.current) return;
        
        const coords = locationCoordinates[ac.location] || [0, 0];
        
        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'aircraft-marker';
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.backgroundImage = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIyIDEyTDEyIDJMMiAxMkwxMiAyMkwyMiAxMloiIGZpbGw9IiNmOTczMTYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg==)';
        el.style.backgroundSize = 'contain';
        el.style.cursor = 'pointer';
        
        // Status color
        const statusColor = ac.status === 'operational' ? '#10b981' : 
                           ac.status === 'maintenance' ? '#ef4444' : '#3b82f6';
        el.style.filter = `drop-shadow(0 0 8px ${statusColor})`;

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="padding: 8px; color: #fff; background: rgba(0,0,0,0.8); border-radius: 4px;">
            <strong style="color: #f97316; font-size: 14px;">${ac.id}</strong><br/>
            <span style="font-size: 12px;">${ac.model}</span><br/>
            <span style="font-size: 11px; color: #94a3b8;">${ac.location}</span><br/>
            <span style="font-size: 11px; color: ${statusColor}; text-transform: capitalize;">${ac.status}</span>
          </div>
        `);

        new mapboxgl.Marker(el)
          .setLngLat(coords)
          .setPopup(popup)
          .addTo(map.current);
      });

      // Start the globe spinning
      spinGlobe();
      setMapInitialized(true);

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, aircraft, mapInitialized]);

  return (
    <div className="space-y-4">
      {!mapInitialized && (
        <Alert>
          <MapPin className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p className="text-sm">Enter your Mapbox Public Token to display the fleet map.</p>
              <p className="text-xs text-muted-foreground">
                Get your token at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
              </p>
              <div className="space-y-2">
                <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
                <Input
                  id="mapbox-token"
                  type="text"
                  placeholder="pk.eyJ1Ijoi..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-border/50">
        <div ref={mapContainer} className="absolute inset-0" />
        {mapInitialized && (
          <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg border border-border/50 shadow-lg">
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Fleet Locations
            </h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                <span className="text-muted-foreground">Operational</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                <span className="text-muted-foreground">Maintenance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                <span className="text-muted-foreground">Scheduled</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FleetMap;
