import React, { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { targetMealPlan } from '../services/nutri/nutrtiServices';
import Cookies from 'js-cookie';
import './Sidebar.css';


const Sidebar = ({ setMealPlans }) => {
    const [open, setOpen] = useState(true);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('');
    const [dailyKCal, setDailyKCal] = useState('');
    const [selectedMeals, setSelectedMeals] = useState([]);
    const [dietaryPreference, setDietaryPreference] = useState('');
    const token = Cookies.get('token');

    const toggleSidebar = () => {
        setOpen((prev) => !prev);
    };

    const handleMealSelection = (meal) => {
        setSelectedMeals((prevSelectedMeals) =>
            prevSelectedMeals.includes(meal)
                ? prevSelectedMeals.filter((m) => m !== meal)
                : [...prevSelectedMeals, meal]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await targetMealPlan(
                token,
                birthdate,
                gender,
                weight,
                height,
                activityLevel,
                dailyKCal,
                selectedMeals,
                dietaryPreference
            );
            console.log(data);
            setMealPlans(data.first.mealPlans);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Box className="sidebar-wrapper">
            {/* Toggle Button always visible */}
            <IconButton onClick={toggleSidebar} className="sidebar-toggle">
                {open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            {open && (
                <Box component="form" onSubmit={handleSubmit} className="sidebar-container">
                    <Typography variant="h6" gutterBottom>
                        Plan Request Form
                    </Typography>
                    <TextField
                        fullWidth
                        label="Height (cm)"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Weight (kg)"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="activity-level-label">Level of Activity</InputLabel>
                        <Select
                            labelId="activity-level-label"
                            value={activityLevel}
                            label="Level of Activity"
                            onChange={(e) => setActivityLevel(e.target.value)}
                        >
                            <MenuItem value="LOWEST">Sedentary</MenuItem>
                            <MenuItem value="LOW">Lightly Active</MenuItem>
                            <MenuItem value="MEDIUM">Moderately Active</MenuItem>
                            <MenuItem value="HIGH">Very Active</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Date of Birth"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                            labelId="gender-label"
                            value={gender}
                            label="Gender"
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>Select Gender</em>
                            </MenuItem>
                            <MenuItem value="M">Male</MenuItem>
                            <MenuItem value="F">Female</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Daily kCal"
                        type="number"
                        value={dailyKCal}
                        onChange={(e) => setDailyKCal(e.target.value)}
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="dietary-preference-label">Dietary Preference</InputLabel>
                        <Select
                            labelId="dietary-preference-label"
                            value={dietaryPreference}
                            label="Dietary Preference"
                            onChange={(e) => setDietaryPreference(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>Select Dietary Preference</em>
                            </MenuItem>
                            <MenuItem value="VEGETARIAN">Vegetarian</MenuItem>
                            <MenuItem value="VEGAN">Vegan</MenuItem>
                            <MenuItem value="DIABETES">Diabetes</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography variant="subtitle1" gutterBottom>
                        Select Meal Types
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedMeals.includes('MIDDLE_MORNING')}
                                    onChange={() => handleMealSelection('MIDDLE_MORNING')}
                                />
                            }
                            label="Middle Morning"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedMeals.includes('MIDDLE_AFTERNOON')}
                                    onChange={() => handleMealSelection('MIDDLE_AFTERNOON')}
                                />
                            }
                            label="Middle Afternoon"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedMeals.includes('AFTER_DINNER')}
                                    onChange={() => handleMealSelection('AFTER_DINNER')}
                                />
                            }
                            label="After Dinner"
                        />
                    </FormGroup>
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Submit
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Sidebar;