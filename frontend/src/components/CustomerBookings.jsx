import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Badge } from "./ui/badge"
import { CheckCircle, Clock, XCircle } from "lucide-react"

// Mock data for bookings
const bookings = [
  {
    id: "1",
    productName: "Organic Apples",
    shopName: "Fresh Groceries",
    quantity: 2,
    price: 5.99,
    status: "confirmed",
    date: "2023-04-15",
  },
  {
    id: "2",
    productName: "Whole Wheat Bread",
    shopName: "Bakery Delights",
    quantity: 1,
    price: 3.49,
    status: "pending",
    date: "2023-04-16",
  },
  {
    id: "3",
    productName: "Organic Milk",
    shopName: "Fresh Groceries",
    quantity: 2,
    price: 4.99,
    status: "unavailable",
    date: "2023-04-14",
  },
  {
    id: "4",
    productName: "Free Range Eggs",
    shopName: "Farm Fresh",
    quantity: 1,
    price: 6.99,
    status: "confirmed",
    date: "2023-04-13",
  },
]

export default function CustomerBookings() {
  const pendingBookings = bookings.filter((booking) => booking.status === "pending")
  const confirmedBookings = bookings.filter((booking) => booking.status === "confirmed")
  const unavailableBookings = bookings.filter((booking) => booking.status === "unavailable")

  return (
    <div className="container py-10 lg:ml-64 mt-10 dark">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
          <p className="text-muted-foreground">View and manage your product bookings</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-[#121212] border-2">
            <TabsTrigger value="all">All Bookings ({bookings.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingBookings.length})</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed ({confirmedBookings.length})</TabsTrigger>
            <TabsTrigger value="unavailable">Unavailable ({unavailableBookings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6 ">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4 mt-6">
            {pendingBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </TabsContent>

          <TabsContent value="confirmed" className="space-y-4 mt-6">
            {confirmedBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </TabsContent>

          <TabsContent value="unavailable" className="space-y-4 mt-6">
            {unavailableBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function BookingCard({ booking }) {
  return (
    <Card className="bg-[#121212]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
        <div>
          <CardTitle>{booking.productName}</CardTitle>
          <CardDescription>{booking.shopName}</CardDescription>
        </div>
        <StatusBadge status={booking.status} />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Quantity</p>
            <p>{booking.quantity}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Price</p>
            <p>${booking.price.toFixed(2)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Total</p>
            <p>${(booking.quantity * booking.price).toFixed(2)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Booking Date</p>
            <p>{new Date(booking.date).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {booking.status === "pending" && (
          <Button variant="outline" className="w-full">
            Cancel Booking
          </Button>
        )}
        {booking.status === "confirmed" && <Button className="w-full">View Receipt</Button>}
        {booking.status === "unavailable" && (
          <Button variant="outline" className="w-full">
            Find Alternatives
          </Button>
        )}
      </CardFooter>
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

