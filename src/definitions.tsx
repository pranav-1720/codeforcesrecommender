export type userData = {
    handle: string;
    Name: string;
    rating: number;
    rank: string;
    country: string;
    maxRating: number;
};

export type userInfo = Array<{ name: string; value: string | number }>;

export type problem = {
    contestId: number;
    problemsetName: string;
    index: string;
    name: string;
    type: "PROGRAMMING" | "QUESTION";
    points: number;
    rating: number;
    tags: string[];
    solvedCount: number;
}

export type problemIdentifier = {
    contestId: number;
    index: string;
}

export interface Submission {
    id: number;
    contestId: number;
    creationTimeSeconds: number;
    relativeTimeSeconds: number;
    problem: {
        contestId: number;
        index: string;
        name: string;
        type: string;
        points?: number;
        rating?: number;
        tags: string[];
    };
    author: {
        contestId: number;
        members: { handle: string }[];
        participantType: string;
        ghost: boolean;
        startTimeSeconds?: number;
    };
    programmingLanguage: string;
    verdict?: string;
    testset: string;
    passedTestCount: number;
    timeConsumedMillis: number;
    memoryConsumedBytes: number;
}
