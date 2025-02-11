import { makeAutoObservable } from 'mobx';

class MealPlanStore {
    mealPlanData = { mealPlans: [] };

    constructor() {
        // No persistence to localStorage
        makeAutoObservable(this);
    }

    setMealPlans(mealPlans) {
        this.mealPlanData.mealPlans = mealPlans;
    }

    updateMealPlan(day, mealOfDay, updatedMeal) {
        this.mealPlanData.mealPlans = this.mealPlanData.mealPlans.map(plan => {
            if (
                plan.dayOfWeek.toUpperCase() === day.toUpperCase() &&
                plan.mealOfDay === mealOfDay
            ) {
                return { ...plan, ...updatedMeal };
            }
            return plan;
        });
    }

    deleteMealPlan(day, mealOfDay, recipeId) {
        this.mealPlanData.mealPlans = this.mealPlanData.mealPlans.map(plan => {
            if (
                plan.dayOfWeek.toUpperCase() === day.toUpperCase() &&
                plan.mealOfDay === mealOfDay
            ) {
                return {
                    ...plan,
                    scaledRecipes: plan.scaledRecipes.filter(
                        scaledRecipe => scaledRecipe.recipe.id !== recipeId
                    )
                };
            }
            return plan;
        });
    }
}

export const mealPlanStore = new MealPlanStore();