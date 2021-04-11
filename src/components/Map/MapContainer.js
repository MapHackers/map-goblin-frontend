import React, { useEffect } from 'react';

const { kakao } = window;

const MapContainer = () => {

    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);
<<<<<<< Updated upstream
=======
        console.log(map)
>>>>>>> Stashed changes
    }, [])

    return (
        <div id="map" style={{width:"100%", height:"700px"}}>
        </div>
    );
};

export default MapContainer;