import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { AlertCircle, ArrowDown, ArrowUp, DollarSign, Package, ShoppingCart, Users } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Mock data for dashboard
const salesData = [
  { month: "Jan", sales: 1200, orders: 42 },
  { month: "Feb", sales: 1800, orders: 65 },
  { month: "Mar", sales: 1600, orders: 58 },
  { month: "Apr", sales: 2200, orders: 79 },
  { month: "May", sales: 2600, orders: 94 },
  { month: "Jun", sales: 2400, orders: 87 },
  { month: "Jul", sales: 2800, orders: 102 },
  { month: "Aug", sales: 3200, orders: 116 },
  { month: "Sep", sales: 3000, orders: 108 },
  { month: "Oct", sales: 3400, orders: 123 },
  { month: "Nov", sales: 3800, orders: 137 },
  { month: "Dec", sales: 4200, orders: 152 },
]

const productPerformance = [
  { name: "Organic Apples", sales: 1200, stock: 50 },
  { name: "Whole Wheat Bread", sales: 950, stock: 15 },
  { name: "Organic Milk", sales: 1500, stock: 20 },
  { name: "Free Range Eggs", sales: 800, stock: 3 },
  { name: "Organic Tomatoes", sales: 600, stock: 0 },
]

export default function ShopkeeperDashboard() {
  return (
    <div className="container py-10 lg:ml-64 mt-10 dark">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your shop's performance and inventory</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-[#121212]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +20.1%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+1,234</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +12.5%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">152</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-500 flex items-center">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  -2
                </span>{" "}
                out of stock
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +9.2%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList className="bg-[#121212]">
            <TabsTrigger value="sales">Sales Overview</TabsTrigger>
            <TabsTrigger value="products">Product Performance</TabsTrigger>
            <TabsTrigger value="inventory">Inventory Status</TabsTrigger>
          </TabsList>
          <TabsContent value="sales" className="space-y-4">
            <Card className="bg-[#121212]">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Monthly sales and orders for the past year</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={salesData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="products" className="space-y-4">
            <Card className="bg-[#121212]">
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>Sales performance by product</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={productPerformance}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="inventory" className="space-y-4">
            <Card className="bg-[#121212]">
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
                <CardDescription>Current stock levels by product</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={productPerformance}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="stock" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Low Stock Alerts</CardTitle>
                <CardDescription>Products that need restocking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productPerformance
                    .filter((product) => product.stock < 10)
                    .map((product) => (
                      <div key={product.name} className="flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">Only {product.stock} units left in stock</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

