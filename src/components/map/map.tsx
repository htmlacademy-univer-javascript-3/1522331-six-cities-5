import React, { useRef, useEffect } from 'react';
import { Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from '../../hooks/use-map.ts';
import { City } from '../../dataTypes/city.ts';
import { Point } from '../../dataTypes/point.ts';
import cn from 'classnames';
import { currentCustomIcon, defaultCustomIcon } from './icons.ts';

interface MapProps {
  city: City;
  points: Point[];
  selectedPoint: Point | undefined;
  isOnMainPage?: boolean;
}

export function Map(props: MapProps): React.JSX.Element {
  const { city, points, selectedPoint, isOnMainPage } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return (
    <section
      className={cn(
        'map',
        { 'cities__map': isOnMainPage },
        { 'offer__map': !isOnMainPage },
      )}
      ref={mapRef}
    >
    </section>
  );
}
