import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface SchoolMapProps {
  onLocationSelect: (lat: number, lng: number) => void
}

export const SchoolMap = ({ onLocationSelect }: SchoolMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const marker = useRef<mapboxgl.Marker | null>(null)
  
  useEffect(() => {
    if (!mapContainer.current) return

    mapboxgl.accessToken = "pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHNlOWF2NmowMGd1MmpxdDk4NHBwNXB4In0.qY4WrHzr0HaPZjvGjg1qJw"
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-0.1276, 51.5074], // London
      zoom: 9
    })

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

    map.current.on("click", (e) => {
      if (marker.current) {
        marker.current.remove()
      }

      marker.current = new mapboxgl.Marker()
        .setLngLat(e.lngLat)
        .addTo(map.current!)

      onLocationSelect(e.lngLat.lat, e.lngLat.lng)
    })

    return () => {
      map.current?.remove()
    }
  }, [onLocationSelect])

  return (
    <Card className="p-4">
      <div ref={mapContainer} className="w-full h-[400px] rounded-lg" />
      <p className="text-sm text-muted-foreground mt-2">
        Click on the map to select a school location
      </p>
    </Card>
  )
}