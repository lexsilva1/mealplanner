import React, { useEffect } from 'react';
import { Container, Grid, Card, CardHeader, CardContent, Typography } from '@mui/material';
import MealCard from './Mealcard';
import './Mealplan.css';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Group meals by day and mealOfDay
const groupMealsByDayAndMealOfDay = (mealPlans) => {
    return mealPlans.reduce((acc, mealPlan) => {
        const day = mealPlan.dayOfWeek.toUpperCase();
        if (!acc[day]) {
            acc[day] = {};
        }
        if (!acc[day][mealPlan.mealOfDay]) {
            acc[day][mealPlan.mealOfDay] = [];
        }
        acc[day][mealPlan.mealOfDay].push(mealPlan);
        return acc;
    }, {});
};

const Mealplan = ({ mealPlanData }) => {
    useEffect(() => {
        console.log('mealPlanData updated:', mealPlanData);
    }, [mealPlanData]);

    if (
        !mealPlanData ||
        !Array.isArray(mealPlanData.mealPlans) ||
        mealPlanData.mealPlans.length === 0
    ) {
        return (
            <Container className="meal-plan-container">
                <Typography variant="h4" className="my-4 text-center">
                    Meal Plan for the Week
                </Typography>
                <Typography variant="body1" className="no-meal-plan text-center">
                    No meal plan available
                </Typography>
            </Container>
        );
    }

    const mealsByDayAndMealOfDay = groupMealsByDayAndMealOfDay(mealPlanData.mealPlans);

    
    return (
        <Container className="meal-plan-container">
            <Typography variant="h4" className="my-4 text-center">
                Meal Plan for the Week
            </Typography>
            <Grid container spacing={2} wrap="nowrap" className="days-row">
                {daysOfWeek.map((day, index) => (
                    <Grid item key={index} className="day-column">
                        <Card className="h-100">
                            <CardHeader
                                title={
                                    <Typography variant="h5" component="h5" className="text-center">
                                        {day}
                                    </Typography>
                                }
                            />
                            <CardContent className="card-content">
                                {mealsByDayAndMealOfDay[day.toUpperCase()] ? (
                                    Object.keys(mealsByDayAndMealOfDay[day.toUpperCase()]).map(
                                        (mealOfDay, mealIndex) => (
                                            <MealCard
                                                key={`${index}-${mealIndex}`}
                                                mealOfDay={mealOfDay}
                                                mealPlans={
                                                    mealsByDayAndMealOfDay[day.toUpperCase()][mealOfDay]
                                                }
                                            />
                                        )
                                    )
                                ) : (
                                    <Typography variant="body2" className="no-meals">
                                        No meals available
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );

};

export default Mealplan;