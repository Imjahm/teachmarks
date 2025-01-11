import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

interface SchoolMapProps {
  onLocationSelect: (lat: number, lng: number) => void
}

export const SchoolMap = ({ onLocationSelect }: SchoolMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const marker = useRef<mapboxgl.Marker | null>(null)
  const { toast } = useToast()
  const [mapboxToken, setMapboxToken] = useState("")

  useEffect(() => {
    // Fetch the Mapbox token from Supabase Edge Function secrets
    const fetchMapboxToken = async () => {
      try {
        const response = await fetch("/.netlify/functions/get-mapbox-token")
        const data = await response.json()
        setMapboxToken(data.token)
      } catch (error) {
        console.error("Error fetching Mapbox token:", error)
        toast({
          title: "Error",
          description: "Failed to load map. Please try again later.",
          variant: "destructive",
        })
      }
    }

    fetchMapboxToken()
  }, [toast])

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current) return

    try {
      mapboxgl.accessToken = mapboxToken

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-0.127758, 51.507351], // London coordinates
        zoom: 10,
      })

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

      marker.current = new mapboxgl.Marker({
        draggable: true,
      })

      map.current.on("click", (e) => {
        const { lng, lat } = e.lngLat
        marker.current?.setLngLat([lng, lat]).addTo(map.current!)
        onLocationSelect(lat, lng)
      })

      marker.current.on("dragend", () => {
        const lngLat = marker.current?.getLngLat()
        if (lngLat) {
          onLocationSelect(lngLat.lat, lngLat.lng)
        }
      })

      return () => {
        map.current?.remove()
      }
    } catch (error) {
      console.error("Error initializing map:", error)
      toast({
        title: "Error",
        description: "Failed to initialize map. Please try again later.",
        variant: "destructive",
      })
    }
  }, [mapboxToken, onLocationSelect, toast])

  return (
    <Card className="p-0 overflow-hidden">
      <div ref={mapContainer} style={{ height: "400px" }} />
    </Card>
  )
}