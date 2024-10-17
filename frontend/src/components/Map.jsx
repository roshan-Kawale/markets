import { useState, useCallback, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { AlertCircle, MapPin, X } from "lucide-react"
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for Leaflet default icon
delete (L.Icon.Default.prototype)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
  iconUrl: '/leaflet/images/marker-icon.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
})

// Maharashtra's approximate center coordinates
const MAHARASHTRA_CENTER = [19.7515, 75.7139]
const ZOOM_LEVEL = 7

// Major cities in Maharashtra
const MAJOR_CITIES = [
  { name: 'Mumbai', coordinates: [19.0760, 72.8777] },
  { name: 'Pune', coordinates: [18.5204, 73.8567] },
  { name: 'Nagpur', coordinates: [21.1458, 79.0882] },
  { name: 'Nashik', coordinates: [19.9975, 73.7898] },
  { name: 'Aurangabad', coordinates: [19.8762, 75.3433] },
]

// Custom red marker icon
const redIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1tYXAtcGluIj48cGF0aCBkPSJNMjAgMTBjMCA2LTggMTItOCAxMnMtOC02LTgtMTJhOCA4IDAgMCAxIDE2IDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSIzIi8+PC9zdmc+',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})


function LocationMarker({ position, setPosition }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng)
    },
  })

  return position === null ? null : (
    <Marker position={position} icon={redIcon}>
      <Popup>Selected Location</Popup>
    </Marker>
  )
}

function MapController() {
  const map = useMap()
  
  const handleResetView = () => {
    map.setView(MAHARASHTRA_CENTER, ZOOM_LEVEL)
  }

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar">
        <Button 
          onClick={handleResetView}
          className="bg-white text-black hover:bg-gray-100"
          aria-label="Reset map view"
        >
          Reset View
        </Button>
      </div>
    </div>
  )
}

export default function Map() {
  const [activeCity, setActiveCity] = useState(null)
  const [selectedPosition, setSelectedPosition] = useState(null)

  const handlePositionSelect = useCallback((position) => {
    setSelectedPosition(position)
    setActiveCity(null)
  }, [])

  const clearSelectedPosition = () => {
    setSelectedPosition(null)
  }

  const cityMarkers = useMemo(() => MAJOR_CITIES.map((city) => (
    <Marker 
      key={city.name} 
      position={city.coordinates}
      eventHandlers={{
        click: () => setActiveCity(city.name),
      }}
    >
      <Popup>
        <strong>{city.name}</strong>
      </Popup>
    </Marker>
  )), [])

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent>
        <div className="h-[250px] rounded-md overflow-hidden">
          <MapContainer 
            center={MAHARASHTRA_CENTER} 
            zoom={ZOOM_LEVEL} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {cityMarkers}
            <LocationMarker position={selectedPosition} setPosition={handlePositionSelect} />
            <MapController />
          </MapContainer>
        </div>
        <div className="mt-4 space-y-2">
          {activeCity && (
            <p className="font-semibold">
              Selected City: {activeCity}
            </p>
          )}
          {selectedPosition && (
            <div className="bg-muted p-3 rounded-md flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-red-500" />
                <span className="font-medium">
                  Lat: {selectedPosition.lat.toFixed(6)}, Lng: {selectedPosition.lng.toFixed(6)}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSelectedPosition}
                aria-label="Clear selected location"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          {!selectedPosition && !activeCity && (
            <div className="bg-muted p-3 rounded-md flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">No location selected</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}