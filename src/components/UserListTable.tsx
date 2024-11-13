"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MoreVertical, Mail, Phone, Plus, Search, Upload } from "lucide-react"
import { activationCode } from "@/lib/constants"
import ProgressCircle from "./ui/CircularProgress"
import TableShrimer from "./loading/TalbeShrimmer"
import { Employee } from "@/lib/types"


interface NewWorkerFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  postCode: string
  homeAddress: string
  lineManager: string
  supplier: string
  externalId: string
  industry: string
  latitude: string
  longitude: string
  employeeID: string
  city: string
  country: string
  profileImage?: File
}


export default function UserListTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState<NewWorkerFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postCode: "",
    homeAddress: "",
    lineManager: "",
    supplier: "",
    externalId: "",
    industry: "",
    latitude: "",
    longitude: "",
    employeeID: "",
    city: "",
    country: "",
  })
  const [profileImageUrl, setProfileImageUrl] = useState("")
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startPage, setStartPage] = useState(1);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://api.findofficers.com/hiring_test/get_all_employee', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(activationCode),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }

        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch employees');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, profileImage: file }))
      setProfileImageUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phone,
      latitude: formData.latitude,
      longitude: formData.longitude,
      employeeID: formData.employeeID,
      city: formData.city,
      country: formData.country,
      activationCode: activationCode.activationCode,
    };
    console.log(apiData)
    
    try {
      const response = await fetch('https://api.findofficers.com/hiring_test/add_employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit employee data');
      }

      const result = await response.json();
      console.log("Employee added successfully:", result);
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Failed to submit employee data');
    } finally {
      setIsModalOpen(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        postCode: "",
        homeAddress: "",
        lineManager: "",
        supplier: "",
        externalId: "",
        industry: "",
        latitude: "",
        longitude: "",
        employeeID: "",
        city: "",
        country: "",
      });
      setProfileImageUrl("");
    }
  }
  if (loading) {
    return <div>
      <TableShrimer />
    </div>; 
  }
  if (error) {
    return <div>Something went wrong: {error}</div>; 
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500"
      case "Offline":
        return "bg-gray-500"
      case "Away":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const totalPages = Math.ceil(employees.length / rowsPerPage);

  const currentEmployees = employees.filter(user => 
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (page > startPage + 4) {
      setStartPage(page - 4);
    } else if (page < startPage) {
      setStartPage(page);
    }
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="w-full space-y-4 p-4">
      <div className="flex items-center justify-end gap-2 mb-3">
        <div className="flex items-center gap-4 ">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                <Plus className="mr-2 h-4 w-4" /> Worker
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[95%]">
              <DialogHeader>
                <DialogTitle>New Worker</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-2">
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col justify-between mb-4 row-span-2">
                    <label htmlFor="">Profile image</label>
                    <div className="flex justify-center">
                    <div className="relative ">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                        {profileImageUrl ? (
                          <img src={profileImageUrl} alt="Profile" className="h-full w-full rounded-full object-cover" />
                        ) : (
                          <Upload className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                    </div>
                    </div>
                    </div>
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div> 
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry *</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData(prev => ({ ...prev, industry: value }))
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeID">Employee ID</Label>
                    <Input
                      id="employeeID"
                      name="employeeID"
                      value={formData.employeeID}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600 flex gap-1">
                    <span>+</span>
                    Create
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[2fr_repeat(6,1fr)] items-center gap-4 px-4 
      py-2 text-sm font-medium text-muted-foreground">
        <div>Worker</div>
        <div className="text-center">PROFILE COMPLETION</div>
        <div className="text-center">RATING</div>
        <div className="text-center">ACTIVATION CODE</div>
        <div className="text-center">TRANSPORT</div>
        <div className="text-center">INDUSTRY</div>
        <div className="text-center">ACTIONS</div>
      </div>


      {currentEmployees
        .slice(
          (currentPage - 1) * rowsPerPage,
          currentPage * rowsPerPage
        )
        .map((user) => (
          <Card
            key={user.Hiring_TestID}
            className="transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="grid grid-cols-[2fr_repeat(6,1fr)] items-center p-2">
              <div className="flex items-center justify-start  gap-3 overflow-hidden ">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.profilePicture} alt={user.firstName} />
                  <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-medium leading-none">{user.firstName}</h3>
                  <div className="flex flex-col text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {user.phoneNumber}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-fit flex items-center justify-end ml-10 ">
                <div className="">
                  <ProgressCircle value={75} />
                </div>
              </div>

              <div className="flex justify-center ">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`h-5 w-5 ${
                        index < user.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <Badge
                  variant="secondary"
                  className={`${getStatusColor("Active")} text-white`}
                >
                  Active
                </Badge>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Not Available
              </div>

              <div className="flex justify-center">
                <Badge variant="outline">------</Badge>
              </div>

              <Button variant="ghost" size="icon" className="flex justify-end  ml-10 h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      <div className="flex justify-between">

        
      <div className="flex justify-end mb-4">
        <label htmlFor="rows-per-page" className="mr-2">Rows per page:</label>
        <select
          id="rows-per-page"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="border rounded p-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
      <div className="flex justify-center mt-4">
      
        {startPage > 1 && (
          <Button onClick={() => setStartPage(startPage - 1)}>&lt;</Button>
        )}
        {Array.from({ length: Math.min(5, totalPages - startPage + 1) }, (_, index) => (
          <Button
            key={startPage + index}
            onClick={() => handlePageChange(startPage + index)}
            className={`mx-1 ${currentPage === startPage + index ? 'bg-emerald-500 text-white' : ''}`}
          >
            {startPage + index}
          </Button>
        ))}
        {startPage + 4 < totalPages && (
          <Button onClick={() => setStartPage(startPage + 1)}>&gt;</Button>
        )}
      </div>
      
      </div>
    </div>
  )
}