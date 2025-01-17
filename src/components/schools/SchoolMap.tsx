import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

interface SchoolMapProps {
  onLocationSelect: (lat: number, lng: number) => void
  schools?: Array<{
    id: string
    name: string
    latitude: number
    longitude: number
  }>
  onSchoolSelect?: (schoolId: string) => void
}

export const SchoolMap = ({ onLocationSelect, schools = [], onSchoolSelect }: SchoolMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])
  const { toast } = useToast()
  const [mapboxToken, setMapboxToken] = useState("")

  useEffect(() => {
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
        center: [-0.127758, 51.507351],
        zoom: 10,
      })

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

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
  }, [mapboxToken, toast])

  useEffect(() => {
    if (!map.current) return

    // Clear existing markers
    markers.current.forEach(marker => marker.remove())
    markers.current = []

    // Add markers for schools
    schools.forEach(school => {
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h3>${school.name}</h3>`)

      const marker = new mapboxgl.Marker()
        .setLngLat([school.longitude, school.latitude])
        .setPopup(popup)
        .addTo(map.current!)

      marker.getElement().addEventListener('click', () => {
        onSchoolSelect?.(school.id)
      })

      markers.current.push(marker)
    })
  }, [schools, onSchoolSelect])

  return (
    <Card className="p-0 overflow-hidden">
      <div ref={mapContainer} style={{ height: "400px" }} />
    </Card>
  )
}