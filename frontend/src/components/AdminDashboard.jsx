import { useState } from 'react'
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

// Mock data for shopkeepers
const shopkeepers = [
  { id: 1, name: "John Doe", status: "Approved", email: "john@example.com", document: "Valid business license and tax clearance certificate." },
  { id: 2, name: "Jane Smith", status: "Pending", email: "jane@example.com", document: "Business registration documents submitted. Awaiting verification." },
  { id: 3, name: "Bob Johnson", status: "Rejected", email: "bob@example.com", document: "Incomplete documentation. Missing proof of address and ID." },
  { id: 4, name: "Alice Brown", status: "Approved", email: "alice@example.com", document: "All required documents verified and approved." },
  { id: 5, name: "Charlie Davis", status: "Pending", email: "charlie@example.com", document: "Business license submitted. Pending review of financial statements." },
]

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [shopkeeperData, setShopkeeperData] = useState(shopkeepers)
  const [selectedStatus, setSelectedStatus] = useState(null)

  const filteredShopkeepers = shopkeeperData.filter(
    (shopkeeper) =>
      (selectedStatus === null || shopkeeper.status === selectedStatus) &&
      (shopkeeper.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       shopkeeper.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const statusCounts = shopkeeperData.reduce(
    (acc, shopkeeper) => {
      acc[shopkeeper.status]++
      return acc
    },
    { Approved: 0, Pending: 0, Rejected: 0 }
  )

  const handleStatusChange = (shopkeeperId, newStatus) => {
    setShopkeeperData(
      shopkeeperData.map((shopkeeper) =>
        shopkeeper.id === shopkeeperId
          ? { ...shopkeeper, status: newStatus }
          : shopkeeper
      )
    )
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
      
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card 
          className={`cursor-pointer transition-colors ${selectedStatus === 'Approved' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => handleStatusCardClick('Approved')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Shopkeepers</CardTitle>
            <Badge variant="default">{statusCounts.Approved}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((statusCounts.Approved / shopkeeperData.length) * 100).toFixed(1)}%</div>
          </CardContent>
        </Card>
        <Card 
          className={`cursor-pointer transition-colors ${selectedStatus === 'Pending' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => handleStatusCardClick('Pending')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Shopkeepers</CardTitle>
            <Badge variant="secondary">{statusCounts.Pending}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((statusCounts.Pending / shopkeeperData.length) * 100).toFixed(1)}%</div>
          </CardContent>
        </Card>
        <Card 
          className={`cursor-pointer transition-colors ${selectedStatus === 'Rejected' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => handleStatusCardClick('Rejected')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected Shopkeepers</CardTitle>
            <Badge variant="destructive">{statusCounts.Rejected}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((statusCounts.Rejected / shopkeeperData.length) * 100).toFixed(1)}%</div>
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
              <TableRow key={shopkeeper.id} className="hover:bg-white hover:text-black">
                <TableCell className="font-medium">{shopkeeper.name}</TableCell>
                <TableCell>{shopkeeper.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      shopkeeper.status === "Approved"
                        ? "secondary"
                        : shopkeeper.status === "Pending"
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
                        <DropdownMenuItem onClick={() => handleStatusChange(shopkeeper.id, "Approved")}>
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(shopkeeper.id, "Pending")}>
                          Set to Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(shopkeeper.id, "Rejected")}>
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {/* <Button variant="outline" className="text-black" size="sm" onClick={() => handleViewDocuments(shopkeeper.id)}>
                      <Eye className="mr-2 h-4 w-4" /> View Documents
                    </Button> */}
                     {/* <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/documents/${shopkeeper.id}`} target="_blank" rel="noopener noreferrer">
                          <Eye className="mr-2 h-4 w-4" /> View Documents
                        </Link>
                      </Button> */}
                     <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="text-black" size="sm" onClick={() => handleViewDocuments(shopkeeper)}>
                            <Eye className="mr-2 h-4 w-4" /> View Documents
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] text-black">
                          <DialogHeader>
                            <DialogTitle>Shopkeeper Documents</DialogTitle>
                            <DialogDescription>
                              Documents for {shopkeeper.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4">
                            <p className="text-sm text-gray-500">
                              {shopkeeper.document}
                            </p>
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
    </div>
  )
}