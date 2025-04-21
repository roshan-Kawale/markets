import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import { AlertCircle, CheckCircle, Edit, Plus, Search, Trash } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

// Mock data for inventory
const initialInventory = [
  {
    id: "1",
    name: "Organic Apples",
    category: "Fruits",
    price: 5.99,
    stock: 50,
    threshold: 10,
    description: "Fresh organic apples from local farms",
  },
  {
    id: "2",
    name: "Whole Wheat Bread",
    category: "Bakery",
    price: 3.49,
    stock: 15,
    threshold: 5,
    description: "Freshly baked whole wheat bread",
  },
  {
    id: "3",
    name: "Organic Milk",
    category: "Dairy",
    price: 4.99,
    stock: 20,
    threshold: 8,
    description: "Organic whole milk from grass-fed cows",
  },
  {
    id: "4",
    name: "Free Range Eggs",
    category: "Dairy",
    price: 6.99,
    stock: 3,
    threshold: 10,
    description: "Free range eggs from local farms",
  },
  {
    id: "5",
    name: "Organic Tomatoes",
    category: "Vegetables",
    price: 2.99,
    stock: 0,
    threshold: 5,
    description: "Fresh organic tomatoes",
  },
]

export default function ShopkeeperInventory() {
  const [inventory, setInventory] = useState(initialInventory)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddProduct = (product) => {
    const newProduct = {
      id: (inventory.length + 1).toString(),
      ...product,
    }
    setInventory([...inventory, newProduct])
    setIsAddProductOpen(false)
  }

  const handleUpdateProduct = (updatedProduct) => {
    setInventory(inventory.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)))
    setEditingProduct(null)
  }

  const handleDeleteProduct = (id) => {
    setInventory(inventory.filter((product) => product.id !== id))
  }

  return (
    <div className="container py-10 lg:ml-64 mt-10 dark">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
            <p className="text-muted-foreground">Manage your product inventory and stock levels</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <ProductForm onSubmit={handleAddProduct} />
              </DialogContent>
            </Dialog> */}
          </div>
        </div>

        <Card className="bg-[#121212]">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <StockStatusBadge stock={product.stock} threshold={product.threshold} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog
                          open={editingProduct?.id === product.id}
                          onOpenChange={(open) => !open && setEditingProduct(null)}
                        >
                          <DialogTrigger asChild>
                            <Button size="icon" variant="ghost" onClick={() => setEditingProduct(product)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <ProductForm product={product} onSubmit={handleUpdateProduct} />
                          </DialogContent>
                        </Dialog>
                        <Button size="icon" variant="ghost" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StockStatusBadge({ stock, threshold }) {
  if (stock === 0) {
    return (
      <Badge variant="destructive">
        <AlertCircle className="h-3 w-3 mr-1" />
        Out of Stock
      </Badge>
    )
  }

  if (stock <= threshold) {
    return (
      <Badge variant="outline" className="text-amber-500 border-amber-500">
        <AlertCircle className="h-3 w-3 mr-1" />
        Low Stock
      </Badge>
    )
  }

  return (
    <Badge className="bg-green-500">
      <CheckCircle className="h-3 w-3 mr-1" />
      In Stock
    </Badge>
  )
}

function ProductForm({ product, onSubmit }) {
  const [formData, setFormData] = useState(
    product || {
      name: "",
      category: "",
      price: "",
      stock: "",
      threshold: "",
      description: "",
    },
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (value, field) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
      threshold: Number.parseInt(formData.threshold),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
        <DialogDescription>
          {product ? "Update product details and inventory levels." : "Add a new product to your inventory."}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">
            Category
          </Label>
          <Select value={formData.category} onValueChange={(value) => handleSelectChange(value, "category")} required>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fruits">Fruits</SelectItem>
              <SelectItem value="Vegetables">Vegetables</SelectItem>
              <SelectItem value="Dairy">Dairy</SelectItem>
              <SelectItem value="Bakery">Bakery</SelectItem>
              <SelectItem value="Meat">Meat</SelectItem>
              <SelectItem value="Beverages">Beverages</SelectItem>
              <SelectItem value="Snacks">Snacks</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">
            Price ($)
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="stock" className="text-right">
            Stock
          </Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="threshold" className="text-right">
            Low Stock Threshold
          </Label>
          <Input
            id="threshold"
            name="threshold"
            type="number"
            min="1"
            value={formData.threshold}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">{product ? "Update Product" : "Add Product"}</Button>
      </DialogFooter>
    </form>
  )
}

