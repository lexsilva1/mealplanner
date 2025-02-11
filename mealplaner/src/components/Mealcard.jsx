import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Typography, Modal, Box, Button } from '@mui/material';
import './MealCard.css';

const MealCard = ({ mealOfDay, mealPlans }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleShowModal = (scaledRecipe) => {
        setSelectedRecipe(scaledRecipe);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedRecipe(null);
    };

    // Helper function to calculate nutritional totals
    const calculateNutritionTotals = (scaledRecipes) => {
        let totalCalories = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFat = 0;
        let totalFiber = 0;
        let totalSugar = 0;
        let totalSalt = 0;

        scaledRecipes.forEach((scaledRecipe) => {
            scaledRecipe.scaledRecipeIngredients.forEach((ingredient) => {
                totalCalories += (ingredient.ingredient.energy * ingredient.quantity) || 0;
                totalProtein += (ingredient.ingredient.protein * ingredient.quantity) || 0;
                totalCarbs += (ingredient.ingredient.carbohydrate * ingredient.quantity) || 0;
                totalFat += (ingredient.ingredient.fat * ingredient.quantity) || 0;
                totalFiber += (ingredient.ingredient.fiber * ingredient.quantity) || 0;
                totalSugar += (ingredient.ingredient.sugar * ingredient.quantity) || 0;
                totalSalt += (ingredient.ingredient.salt * ingredient.quantity) || 0;
            });
        });

        return {
            totalCalories,
            totalProtein,
            totalCarbs,
            totalFat,
            totalFiber,
            totalSugar,
            totalSalt,
        };
    };

    const nutritionTotals = selectedRecipe ? calculateNutritionTotals([selectedRecipe]) : null;

    return (
        <>
            <Card className="meal-card">
                <CardHeader
                    title={<Typography variant="h6">{mealOfDay}</Typography>}
                    className="meal-card-header"
                />
                <CardContent className="meal-card-body">
                    {mealPlans.map((mealPlan, index) =>
                        mealPlan.scaledRecipes.map((scaledRecipe, recipeIndex) => (
                            <div
                                key={`${index}-${recipeIndex}`}
                                onClick={() => handleShowModal(scaledRecipe)}
                                className="recipe-item"
                            >
                                <Typography variant="body2" className="recipe-name">
                                    {scaledRecipe.recipe.name}
                                </Typography>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>

            {selectedRecipe && (
                <Modal open={showModal} onClose={handleCloseModal}>
                    <Box className="modal-box">
                        <Typography variant="h5" className="modal-title">
                            {selectedRecipe.recipe.name}
                        </Typography>

                        <Typography variant="subtitle1" className="nutrition-header">
                            Nutritional Information
                        </Typography>

                        <Box className="nutrition-details">
                            <Typography variant="body2">
                                Calories: {nutritionTotals.totalCalories.toFixed(2)} kcal
                            </Typography>
                            <Typography variant="body2">
                                Protein: {nutritionTotals.totalProtein.toFixed(2)} g
                            </Typography>
                            <Typography variant="body2">
                                Carbohydrates: {nutritionTotals.totalCarbs.toFixed(2)} g
                            </Typography>
                            <Typography variant="body2">
                                Fat: {nutritionTotals.totalFat.toFixed(2)} g
                            </Typography>
                            <Typography variant="body2">
                                Fiber: {nutritionTotals.totalFiber.toFixed(2)} g
                            </Typography>
                            <Typography variant="body2">
                                Sugar: {nutritionTotals.totalSugar.toFixed(2)} g
                            </Typography>
                            <Typography variant="body2">
                                Salt: {nutritionTotals.totalSalt.toFixed(2)} g
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleCloseModal}
                            className="close-button"
                        >
                            Close
                        </Button>
                    </Box>
                </Modal>
            )}
        </>
    );
};

export default MealCard;