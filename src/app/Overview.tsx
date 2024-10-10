import { useState, useEffect } from "react";
import { fetchUserSubmissions } from "./actions";
import { Submission } from "@/definitions";

interface OverviewProps {
    user: string;
}

export default function Overview({ user }: OverviewProps) {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUserSubmissions(user);
                setSubmissions(data);
            } catch (err) {
                setError('Failed to fetch submissions: ' + err);
            }
        };

        fetchData();
    }, [user]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Overview</h1>
            <p>User: {user}</p>
        </div>
    );
}