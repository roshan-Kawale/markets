import { useState } from 'react'
import { X } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Slider } from "./ui/slider"
import { Switch } from "./ui/switch"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"
import { ScrollArea } from './ui/scroll-area'

export default function NewFilterCard({ onClose }) {
  const [filterType, setFilterType] = useState('product')
  const [rating, setRating] = useState(0)

  return (
    <ScrollArea >
    <Card className="w-full  mx-auto border-none">
      <CardHeader className="flex flex-row items-center">
        <CardTitle className="flex-1">Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="filter-type"
              checked={filterType === 'shop'}
              onCheckedChange={(checked) => setFilterType(checked ? 'shop' : 'product')}
            />
            <Label htmlFor="filter-type">
              {filterType === 'shop' ? 'Shop' : 'Product'}
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Select>
              <SelectTrigger id="city">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new-york">Chandrapur</SelectItem>
                <SelectItem value="london">Gadchiroli</SelectItem>
                <SelectItem value="paris">Nagpur</SelectItem>
                <SelectItem value="tokyo">Mumbai</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="category">
              <AccordionTrigger>Category</AccordionTrigger>
              <AccordionContent>
                <RadioGroup defaultValue="all">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="category-all" />
                    <Label htmlFor="category-all">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="electronics" id="category-electronics" />
                    <Label htmlFor="category-electronics">Electronics</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="clothing" id="category-clothing" />
                    <Label htmlFor="category-clothing">Clothing</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="home" id="category-home" />
                    <Label htmlFor="category-home">Home & Garden</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="subcategory">
              <AccordionTrigger>Subcategory</AccordionTrigger>
              <AccordionContent>
                <Select>
                  <SelectTrigger id="subcategory">
                    <SelectValue placeholder="Select a subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smartphones">Smartphones</SelectItem>
                    <SelectItem value="laptops">Laptops</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="space-y-2">
                <Label>Rating</Label>
                <Slider
                  id="rating-slider"
                  min={0}
                  max={5}
                  step={0.1}
                  value={[rating]}
                  onValueChange={(value) => setRating(value[0])}
                  className="mt-2"
                />
                <div className="text-sm text-muted-foreground mt-1">
                  {rating.toFixed(1)} stars and above
                </div>
          </div>

         { filterType === 'product' && <div className="space-y-2">
            <Label>Price Range</Label>
            <div className="flex items-center space-x-2">
              <Input type="number" placeholder="Min" className="w-20" />
              <span>to</span>
              <Input type="number" placeholder="Max" className="w-20" />
            </div>
            <Slider
              defaultValue={[0, 100]}
              max={1000}
              step={1}
              className="mt-2"
            />
          </div>}

          {/* {filterType === 'shop' && (
            <div className="space-y-2">
              <Label>Shop Type</Label>
              <RadioGroup defaultValue="all">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="shop-type-all" />
                  <Label htmlFor="shop-type-all">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="shop-type-online" />
                  <Label htmlFor="shop-type-online">Online</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="physical" id="shop-type-physical" />
                  <Label htmlFor="shop-type-physical">Physical Store</Label>
                </div>
              </RadioGroup>
            </div>
          )} */}
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Apply Filters</Button>
      </CardFooter>
    </Card>
    </ScrollArea >
  )
}