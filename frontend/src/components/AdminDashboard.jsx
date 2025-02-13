import { useEffect, useState } from 'react'
import { ChevronDown, Eye, Search } from 'lucide-react'
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [shopkeeperData, setShopkeeperData] = useState();
  const [selectedStatus, setSelectedStatus] = useState(null)

  const getShopkeepers = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}api/shopkeeper/getall`
        );
        const data = await res.json();
        setShopkeeperData(data);
      } catch (error) {
        console.log(error.message);
      }
  }

  useEffect(()=> {
     getShopkeepers();
  },[])

  const filteredShopkeepers = shopkeeperData?.filter(
    (shopkeeper) =>
      (selectedStatus === null || shopkeeper.status === selectedStatus) &&
      (shopkeeper.userId.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       shopkeeper.userId.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const statusCounts = shopkeeperData?.reduce(
    (acc, shopkeeper) => {
      acc[shopkeeper.status]++
      return acc
    },
    { approved: 0, pending: 0, rejected: 0 }
  )

  const handleStatusChange = async (shopkeeperId, newStatus) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/shopkeeper/update` , {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({shopkeeperId, status : newStatus}),
      });
      const data = await res.json();
      if(data.success === false) {
        return;
      }
      setShopkeeperData(
        shopkeeperData.map((shopkeeper) =>
          shopkeeper._id === shopkeeperId
            ? { ...shopkeeper, status: newStatus }
            : shopkeeper
        )
      )
    } catch(error) {
      console.log(error.message)
    }
  }

  const handleViewDocuments = (shopkeeperId) => {
    // Implement document viewing logic here
    console.log(`Viewing documents for shopkeeper ${shopkeeperId}`)
  }

  const handleStatusCardClick = (status) => {
    setSelectedStatus(prevStatus => prevStatus === status ? null : status)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {shopkeeperData?.length > 0 &&  <div>
        <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card 
          className={`cursor-pointer transition-colors ${selectedStatus === 'approved' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => handleStatusCardClick('approved')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">approved Shopkeepers</CardTitle>
            <Badge variant="default">{statusCounts?.approved}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((statusCounts?.approved / shopkeeperData?.length) * 100).toFixed(1)}%</div>
          </CardContent>
        </Card>
        <Card 
          className={`cursor-pointer transition-colors ${selectedStatus === 'pending' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => handleStatusCardClick('pending')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">pending Shopkeepers</CardTitle>
            <Badge variant="secondary">{statusCounts.pending}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((statusCounts.pending / shopkeeperData.length) * 100).toFixed(1)}%</div>
          </CardContent>
        </Card>
        <Card 
          className={`cursor-pointer transition-colors ${selectedStatus === 'rejected' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => handleStatusCardClick('rejected')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">rejected Shopkeepers</CardTitle>
            <Badge variant="destructive">{statusCounts.rejected}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((statusCounts.rejected / shopkeeperData.length) * 100).toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">
          {selectedStatus ? `${selectedStatus} Shopkeepers` : 'All Shopkeepers'}
        </h2>
        <div className="flex items-center gap-4 text-black">
          {selectedStatus && (
            <Button variant="outline" onClick={() => setSelectedStatus(null)}>
              Clear Filter
            </Button>
          )}
          <div className="relative w-64">
            <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search shopkeepers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table >
          <TableHeader className="hover:bg-white">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShopkeepers.map((shopkeeper) => (
              <TableRow key={shopkeeper._id} className="hover:bg-[#121212]">
                <TableCell className="font-medium">{shopkeeper.userId.name}</TableCell>
                <TableCell>{shopkeeper.userId.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      shopkeeper.status === "approved"
                        ? "secondary"
                        : shopkeeper.status === "pending"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {shopkeeper.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="text-black" size="sm">
                          Change Status <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleStatusChange(shopkeeper._id, "approved")}>
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(shopkeeper._id, "pending")}>
                          Set to pending
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(shopkeeper._id, "rejected")}>
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                     <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="text-black" size="sm" onClick={() => handleViewDocuments(shopkeeper)}>
                            <Eye className="mr-2 h-4 w-4" /> View Documents
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px] h-[500px] text-black">
                          <div className="">
                            <Link to={`${shopkeeper.businessLicense}`}>
                              View Business License
                            </Link>
                            <iframe className='w-full h-full' src={`${shopkeeper.businessLicense}`} alt="businessLicense" />
                          </div>
                        </DialogContent>
                      </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      </div>}
    </div>
  )
}