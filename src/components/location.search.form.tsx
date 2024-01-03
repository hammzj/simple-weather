import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Button, Stack, TextField} from '@mui/material';
import PATHS from '../routes/paths';
import {size, isEqual} from "lodash";

export default function LocationSearchForm(): React.ReactElement {
    const navigate = useNavigate();
    const [locationName, setLocationName] = useState('');
    const [isFormEmpty, setIsFormEmpty] = useState<boolean>(true);

    async function handleSubmit(event: React.ChangeEvent<HTMLDivElement>) {
        event.preventDefault();
        const params = new URLSearchParams({name: locationName}).toString();
        navigate({pathname: PATHS.RESULTS, search: params})
    }

    function handleChange(event) {
        setIsFormEmpty(isEqual(size(event.target.value), 0));
        setLocationName(event.target.value);
    }

    //@ts-ignore: TS2339
    return (
        <Box
            component="form"
            id='location-search-form'
            onSubmit={handleSubmit}
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding='0.5em'
        >
            <Stack direction='row' spacing='1.5em'>
                <TextField id="location-input"
                           helperText="Search for a city/postal code"
                           size="small"
                           sx={{
                               backgroundColor: 'primary.main',
                               color: 'primary.contrastText',
                               '& label.Mui-focused': {
                                   color: 'primary.contrastText'
                               },
                               '& .MuiOutlinedInput-root': {
                                   '&.Mui-focused fieldset': {
                                       borderColor: 'primary.contrastText'
                                   }
                               }
                           }}
                           onChange={handleChange}
                />
                <Button
                    type="submit"
                    size='small'
                    disabled={isFormEmpty}
                    sx={{
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        border: 1,
                    }}>
                    <span>Submit</span>
                </Button>
            </Stack>
        </Box>
    )
}
