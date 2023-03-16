import React, { useEffect, useState } from 'react'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Icon } from 'leaflet'

const center = [19.0455969,72.8876622]


const Maps = () => {

    const[userLocation,setUserLocation] = useState([0,0]);

    useEffect(() => {
        getLocationJs()
    },[])

    const customIcon = new Icon({
       iconUrl:"https://cdn-icons-png.flaticon.com/512/446/446991.png",
       iconSize:[30,30] 
    })

    const personIcon = new Icon({
        iconUrl:"https://cdn-icons-png.flaticon.com/512/10/10522.png",
        iconSize:[30,30]
    })

    const getLocationJs = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude , longitude} = position.coords
            setUserLocation([latitude,longitude])
            
        })
    }

    // const newCenter = [(center[0]+userLocation[0])/2,(center[1]+userLocation[1])/2]

    


  return (
    <MapContainer center={center}
    zoom={13}
    style={{width:"80vw",height:"50vh"}}>

    <TileLayer 
    url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=pOBQNKHtOPY5zEt5aEWB"
    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    ></TileLayer>

    <Marker position={center} icon={customIcon}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
    <Marker position={userLocation} icon={personIcon}>
    <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>

    </MapContainer>
  )
}

export default Maps