import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper , Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';

function Map({setCoordinates , setBounds , coordinates , places , setChildClicked , weatherData }) {
    
    const classes = useStyles();
    const isDesktop = useMediaQuery("(min-width:600px)");

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margins={[50,50,50,50]}
                onChange={(e) => {
                    setCoordinates({lat : e.center.lat, lng : e.center.lng})
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={(child) => {setChildClicked(child)}}

            >
                {places?.map((place , index) => (
                    <div className={classes.markerContainer} 
                    lat={Number(place.latitude)}
                    lng={Number(place.longitude)}
                    key={index}>
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large" />
                            ) : 
                            <Paper elevation={3} className={classes.paper}>
                                <Typography className={classes.Typography} variant="subtitle2" gutterBottom >
                                    {place.name}
                                </Typography>
                                <img alt={place.name} className={classes.pointer} src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} />
                                <Rating value={Number(place.rating)} size="small" readOnly />
                            </Paper>
                        }
                    </div>
                ))}
                {weatherData?.list?.length && weatherData.list.map((data, i) => (
                    <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                        <img alt="" src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
                    </div>
        ))}
            </GoogleMapReact>
        </div>
    )
}

export default Map
