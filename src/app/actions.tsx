'use server'

import { userData } from "@/definitions";
import { Submission } from "@/definitions";

export async function fetchUserData(username: string): Promise<userData> {
    const url = `https://codeforces.com/api/user.info?handles=${username}`

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.status == "OK") {
            // Assuming userData is the type of the user data returned by the API
            const user: userData = {
                handle: data.result[0].handle,
                Name: data.result[0].firstName + " " + data.result[0].lastName,
                rating: data.result[0].rating,
                rank: data.result[0].rank,
                country: data.result[0].country,
                maxRating: data.result[0].maxRating,
            };

            return user;
        } else {
            throw new Error("Failed to fetch user data:" + data.comment);
        }
    } catch (error) {
        console.error('Failed to fetch user data:', error)
        throw error;
    }
}

export async function fetchUserSubmissions(username: string): Promise<Submission[]> {
    const url = `https://codeforces.com/api/user.status?handle=${username}`

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.status == "OK") {
            return data.result;
        } else {
            throw new Error("Failed to fetch user submissions:" + data.comment);
        }
    } catch (error) {
        console.error('Failed to fetch user submissions:', error)
        throw error;
    }
}