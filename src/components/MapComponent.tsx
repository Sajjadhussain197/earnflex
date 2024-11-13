'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
import L from 'leaflet'

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: '/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

interface Employee {
  Hiring_TestID: number
  city: string
  country: string
  createdAt: string
  email: string
  employeeID: string
  firstName: string
  lastName: string
  latitude: string
  longitude: string
  phoneNumber: string
  profilePicture: string | null
}

interface MapComponentProps {
  employees: Employee[]
}

export default function MapComponent({ employees }: MapComponentProps) {
  useEffect(() => {
    // This effect ensures that the Leaflet CSS is only loaded on the client side
    import('leaflet/dist/leaflet.css')
  }, [])

  return (
    <MapContainer
      center={[54.5, -2]}
      zoom={6}
      className="h-full w-full"
      zoomControl={false}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <div className="absolute top-4 left-4 z-[1000] flex gap-2">
        <button className="px-4 py-2 bg-white border shadow-sm rounded-md">Map</button>
        <button className="px-4 py-2 bg-white border shadow-sm rounded-md">Satellite</button>
      </div>
      {employees.map((employee) => (
        <Marker
          key={employee.Hiring_TestID}
          position={[parseFloat(employee.latitude), parseFloat(employee.longitude)]}
          icon={customIcon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{`${employee.firstName} ${employee.lastName}`}</h3>
              <p className="text-sm text-gray-600">{employee.email}</p>
              <p className="text-sm text-gray-600">{employee.phoneNumber}</p>
              <p className="text-sm text-gray-600">{`${employee.city}, ${employee.country}`}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}