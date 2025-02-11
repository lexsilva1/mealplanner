import baseURL from "../baseURl";
import loginURL from "./login";

export const getNutrition = async (token) => {
    try {
        const response = await fetch(`http://${baseURL}/mealplan/getMealPlan?mealPlanId=1`, {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`, // Add Bearer token
            },
            redirect: 'follow',
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching nutrition data:', error);
        throw error;
    }
};
export const targetMealPlan = async (token, birthdate, gender, weight, height, activityLevel, dailyKCal, selectedMeals, dietaryPreference) => {
    try {
        // Permanent queries
        const permanentQueries = ['MIDDLE_MORNING', 'MIDDLE_AFTERNOON', 'AFTER_DINNER'];

        // Filter out permanent queries from selectedMeals
        const filteredSelectedMeals = selectedMeals
            .filter(meal => !permanentQueries.includes(meal))
            .join(',');

        // Assemble the URL
        const url = new URL(`http://${baseURL}/mealplan/targetedMealPlan`);
        url.searchParams.append('birthdate', birthdate);
        url.searchParams.append('gender', gender);
        url.searchParams.append('weight', weight);
        url.searchParams.append('height', height);
        url.searchParams.append('activityLevel', activityLevel);
        url.searchParams.append('cKalTarget', dailyKCal);
        url.searchParams.append('diets' ,dietaryPreference )

        // Add permanent queries
        const finalSelectedMeals = permanentQueries.filter(meal => !selectedMeals.includes(meal)).join(',');
        url.searchParams.append('selectedMeals', finalSelectedMeals);

        // Add filtered selected meals if any
        if (filteredSelectedMeals) {
            url.searchParams.append('selectedMeals', filteredSelectedMeals);
        }

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`, // Add Bearer token
            },
            redirect: 'follow',
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        if(response.status === 401){
            Cookies.remove('token');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching nutrition data:', error);
        throw error;
    }
};
export const login = async (username, password) => {
    const client_id = 'nutri_login';
    const client_secret = 'fHo4wDivczZx6NLOEdnKgWGgcQOQe4Ig';
    const grant_type = 'password';
    const scope = 'openid';

    const body = new URLSearchParams({
        client_id,
        client_secret,
        username,
        password,
        grant_type,
        scope
    });

    try {
        const response = await fetch(`http://${loginURL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.access_token; // Assuming the token is returned in the response as 'access_token'
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};




