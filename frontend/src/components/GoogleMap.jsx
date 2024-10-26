import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

export default function GoogleMap() {
  const position = { lat: 53.54, lng: 10 };
  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey={"AIzaSyAdsAgO6oKleM4fOxMm4CamhdsoSt1dExk"}>
    <Map
      style={{width: '100vw', height: '100vh'}}
      defaultCenter={{lat: 22.54992, lng: 0}}
      defaultZoom={3}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
  </APIProvider>   
);
}
// <APIProvider apiKey={"AIzaSyBKWLePpb5vUihS2kUq5FJCvFBMF8i5ZiY"}>
//   <div style={{ height: "100vh", width: "100%" }}>
//     <Map zoom={9} center={position} mapId={"bf9bd1b533060090"}>
//       <AdvancedMarker position={position} onClick={() => setOpen(true)}>
//         <Pin
//           background={"grey"}
//           borderColor={"green"}
//           glyphColor={"purple"}
//         />
//       </AdvancedMarker>

//       {open && (
//         <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
//           <p>I'm in Hamburg</p>
//         </InfoWindow>
//       )}
//     </Map>
//   </div>
// </APIProvider>