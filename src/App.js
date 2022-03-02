import React,{useEffect , useState} from 'react';
import { CssBaseline, Grid  } from '@material-ui/core';
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import {getPlacesData , getWeatherData} from './api';

function App() {
    const [filteredPlaces, setFilteredPlaces] = useState([])
    const [places, setPlaces] = useState([])
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [weatherData, setWeatherData] = useState()
    const [childClicked, setChildClicked] = useState(null)
    const [ isLoading , setIsLoading] = useState(true)

    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords:{latitude, longitude}}) => {
            setCoordinates({lat:latitude, lng:longitude});
        })
    },[])

    useEffect(() => {
        const filteredPlaces = places.filter((place) => (place.rating > rating) )
        setFilteredPlaces(filteredPlaces)
    } , [rating])

    useEffect(() => {
        if (bounds.sw && bounds.ne) {
        setIsLoading(true);
        getWeatherData(coordinates.lat , coordinates.lng)
        .then((data) => setWeatherData(data))
        getPlacesData(type , bounds.sw, bounds.ne)
        .then((data) => {
            setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
            setFilteredPlaces([])
            setIsLoading(false)
        })}
    } , [bounds , type])


    return (
        <React.Fragment>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List isLoading={ isLoading} childClicked={childClicked} places={filteredPlaces.length ? filteredPlaces : places} type={type} setType={setType} rating={rating} setRating={setRating} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map weatherData={weatherData} setChildClicked={setChildClicked} places={places}places={filteredPlaces.length ? filteredPlaces : places} setCoordinates={setCoordinates} setBounds={setBounds} coordinates={coordinates} />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default App
