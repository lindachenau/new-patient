import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import AddLocationIcon from '@material-ui/icons/AddLocation'
import PlacesAutocomplete from 'react-places-autocomplete'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0,
    paddingBottom: 20
  }
}))

//Constrain Google Places API to search within Australia only
const searchOptions = {
  componentRestrictions: {
    country: 'au'
  }
}

export default function LocationSearchInput ({ address, changeAddr, disabled=false}) {
  const classes = useStyles()

  const onSelect = (placeId) => {
    const placeService = new window.google.maps.places.PlacesService(document.createElement('div'))
  
    return new Promise(function (resolve, reject) {
      placeService.getDetails({ placeId: placeId }, function (place, status) {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) 
          reject(status)
        
        resolve(place.formatted_address)
      })
    })
  }

  return (
    <PlacesAutocomplete
      value={address}
      onChange={changeAddr}
      onSelect={async (address, placeId) => changeAddr(await onSelect(placeId))}
      searchOptions={searchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Container className={classes.container}>
          <FormControl required fullWidth >
            <InputLabel htmlFor="input-with-icon-adornment">Home address</InputLabel>
            <Input
              {...getInputProps({
                placeholder: ''
              })}
              startAdornment={
                <InputAdornment position="start">
                  <AddLocationIcon />
                </InputAdornment>
              }
              disabled={disabled}
            />
          </FormControl>
          <div>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item'
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#f0e0e0', cursor: 'pointer' }
                  : { backgroundColor: 'white', cursor: 'pointer' }
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
          </div>
        </Container>
      )}
    </PlacesAutocomplete>
  )
}
