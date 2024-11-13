"use client"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState, useRef } from 'react';
import { activationCode } from '@/lib/constants';
import { Search } from 'lucide-react';
import { Employee } from '@/lib/types';
delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const UserOnMap = () => {
  const [employees, setEmployees] = useState<Employee[]>([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [mapType, setMapType] = useState('map'); 
  const searchInputRef = useRef<HTMLInputElement>(null); 
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const cities = ['Leeds', 'Bristol', 'Bath', 'Liverpool', 'Manchester', 'Birmingham', 'London'];

  useEffect(() => {
    import('leaflet/dist/leaflet.css');
    const fetchEmployees = async () => {
      const response = await fetch('https://api.findofficers.com/hiring_test/get_all_employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activationCode),
      });
      const data: Employee[] = await response.json(); // Specify the type for fetched data
      setEmployees(data); 
    };

    fetchEmployees(); 

    return () => {
      setEmployees([]);
      setSelectedCity(null); 
      setSearchTerm(''); 
      setMapType('map'); 
    };
  }, []);

 
  let filteredEmployees = employees.filter(employee => 
    `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCityClick = (city: string) => {
    setSelectedCity(city);
  };
   filteredEmployees = employees.filter(employee => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    const isCityMatch = selectedCity ? employee.city.toLowerCase() === selectedCity.toLowerCase() : true;
    return isCityMatch && fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className='p-5 flex flex-col gap-3'>
      <div className="flex flex-col  gap-2">
      <div className="flex justify-between items-center">
        <h1 className='text-black text-lg font-semibold'>Leads</h1>
        <div
          className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white text-gray-700 focus-within:border-green-400 hover:border-green-400 cursor-pointer transition-colors"
          onClick={() => searchInputRef.current?.focus()} // Use ref to focus
        >
          <input
            ref={searchInputRef} // Attach ref to input
            id="search-input"
            type="text"
            placeholder="Where do you want to hire?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-500"
          />
          <Search className="text-gray-500 ml-2" />
        </div>        
      </div>
      <div className="flex gap-2 mb-4 justify-end">
        {cities.map(city => (
          <button
            key={city}
            onClick={() => handleCityClick(city)}
            className={`border rounded-md px-2 py-1 ${selectedCity === city ? 'bg-blue-200' : 'bg-white'}`}
          >
            {city}
          </button>
        ))}
      </div>
      <hr className='w-full' />
      </div>
      
      <div className=" relative">
      <div className="absolute top-3 left-20 z-[1000] bg-white rounded-md">
        <button className="border rounded-l-md px-2 py-1" onClick={() => setMapType('map')}>Map View</button>
        <button className="border rounded-r-md px-2 py-1" onClick={() => setMapType('satellite')}>Satellite View</button>
      </div>
      <MapContainer
        center={[51.505, -0.09]} 
        zoom={6} 
        // className='h-[80vh] w-full rounded-lg'
        style={{ height: '80vh', width: '100%', borderRadius:'10px'}}
      >
        <TileLayer
          url={mapType === 'satellite' ? "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredEmployees.map((employee) => {
          const lat = parseFloat(employee.latitude);
          const lng = parseFloat(employee.longitude);
          
          // Check if lat and lng are valid numbers
          if (!isNaN(lat) && !isNaN(lng)) {
            return (
              <Marker key={employee.Hiring_TestID} position={[lat, lng]}>
                <Popup>
                  {employee.firstName} {employee.lastName}
                  <br />
                  City: {employee.city}
                  <br />
                  Country: {employee.country}
                  <br />
                  Phone: {employee.phoneNumber}
                  <br />
                  Email: {employee.email}
                </Popup>
              </Marker>
            );
          }
          return null; 
        })}
      </MapContainer>

      </div>
    </div>
  );
};

export default UserOnMap;
