import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Badge } from "./ui/badge"
import { CheckCircle, Clock, Search, XCircle } from "lucide-react"
import { Input } from "./ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

// Mock data for bookings
const bookings = [
  {
    id: "1",
    productName: "Organic Apples",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    quantity: 2,
    price: 5.99,
    status: "confirmed",
    date: "2023-04-15",
  },
  {
    id: "2",
    productName: "Whole Wheat Bread",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    quantity: 1,
    price: 3.49,
    status: "pending",
    date: "2023-04-16",
  },
  {
    id: "3",
    productName: "Organic Milk",
    customerName: "Mike Johnson",
    customerEmail: "mike@example.com",
    quantity: 2,
    price: 4.99,
    status: "unavailable",
    date: "2023-04-14",
  },
  {
    id: "4",
    productName: "Free Range Eggs",
    customerName: "Sarah Williams",
    customerEmail: "sarah@example.com",
    quantity: 1,
    price: 6.99,
    status: "confirmed",
    date: "2023-04-13",
  },
  {
    id: "5",
    productName: "Organic Tomatoes",
    customerName: "David Brown",
    customerEmail: "david@example.com",
    quantity: 3,
    price: 2.99,
    status: "pending",
    date: "2023-04-17",
  },
]

export default function ShopkeeperBooking() {
  const pendingBookings = bookings.filter((booking) => booking.status === "pending")
  const confirmedBookings = bookings.filter((booking) => booking.status === "confirmed")
  const unavailableBookings = bookings.filter((booking) => booking.status === "unavailable")

  return (
    <div className="container py-10 lg:ml-64 mt-10 dark">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Product Bookings</h1>
            <p className="text-muted-foreground">Manage customer bookings for your products</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search bookings..." className="pl-8 w-[250px]" />
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-[#121212] border-2">
            <TabsTrigger value="all">All Bookings ({bookings.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingBookings.length})</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed ({confirmedBookings.length})</TabsTrigger>
            <TabsTrigger value="unavailable">Unavailable ({unavailableBookings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <BookingsTable bookings={bookings} />
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <BookingsTable bookings={pendingBookings} />
          </TabsContent>

          <TabsContent value="confirmed" className="mt-6">
            <BookingsTable bookings={confirmedBookings} />
          </TabsContent>

          <TabsContent value="unavailable" className="mt-6">
            <BookingsTable bookings={unavailableBookings} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function BookingsTable({ bookings }) {
  return (
    <Card className="bg-[#121212]">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.productName}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{booking.customerName}</span>
                    <span className="text-xs text-muted-foreground">{booking.customerEmail}</span>
                  </div>
                </TableCell>
                <TableCell>{booking.quantity}</TableCell>
                <TableCell>${(booking.quantity * booking.price).toFixed(2)}</TableCell>
                <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <StatusBadge status={booking.status} />
                </TableCell>
                <TableCell className="text-right">
                  {booking.status === "pending" && (
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        Mark Unavailable
                      </Button>
                      <Button size="sm">Confirm</Button>
                    </div>
                  )}
                  {booking.status === "confirmed" && (
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  )}
                  {booking.status === "unavailable" && (
                    <Button size="sm" variant="outline">
                      Contact Customer
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }) {
  if (status === "confirmed") {
    return (
      <Badge className="bg-green-500">
        <CheckCircle className="h-3 w-3 mr-1" />
        Confirmed
      </Badge>
    )
  }

  if (status === "pending") {
    return (
      <Badge variant="outline" className="text-amber-500 border-amber-500">
        <Clock className="h-3 w-3 mr-1" />
        Pending
      </Badge>
    )
  }

  if (status === "unavailable") {
    return (
      <Badge variant="destructive">
        <XCircle className="h-3 w-3 mr-1" />
        Unavailable
      </Badge>
    )
  }

  return null
}

