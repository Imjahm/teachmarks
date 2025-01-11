import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Search } from "lucide-react"

interface PostcodeSearchProps {
  onSelect: (postcode: string) => void
}

export const PostcodeSearch = ({ onSelect }: PostcodeSearchProps) => {
  const [postcode, setPostcode] = useState("")
  const { toast } = useToast()

  const handleSearch = async () => {
    if (!postcode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a postcode",
        variant: "destructive",
      })
      return
    }

    // Here you would typically validate the postcode format
    // and potentially geocode it using a service like Google Maps
    onSelect(postcode.trim().toUpperCase())
  }

  return (
    <div className="flex gap-4">
      <Input
        placeholder="Enter postcode..."
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        className="max-w-xs"
      />
      <Button onClick={handleSearch}>
        <Search className="mr-2" />
        Search
      </Button>
    </div>
  )
}