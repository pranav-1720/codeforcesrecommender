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

export enum Verdict {
    FAILED = "FAILED",
    OK = "OK",
    PARTIAL = "PARTIAL",
    COMPILATION_ERROR = "COMPILATION_ERROR",
    RUNTIME_ERROR = "RUNTIME_ERROR",
    WRONG_ANSWER = "WRONG_ANSWER",
    PRESENTATION_ERROR = "PRESENTATION_ERROR",
    TIME_LIMIT_EXCEEDED = "TIME_LIMIT_EXCEEDED",
    MEMORY_LIMIT_EXCEEDED = "MEMORY_LIMIT_EXCEEDED",
    IDLENESS_LIMIT_EXCEEDED = "IDLENESS_LIMIT_EXCEEDED",
    SECURITY_VIOLATED = "SECURITY_VIOLATED",
    CRASHED = "CRASHED",
    INPUT_PREPARATION_CRASHED = "INPUT_PREPARATION_CRASHED",
    CHALLENGED = "CHALLENGED",
    SKIPPED = "SKIPPED",
    TESTING = "TESTING",
    REJECTED = "REJECTED"
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
    verdict?: Verdict;
    testset: string;
    passedTestCount: number;
    timeConsumedMillis: number;
    memoryConsumedBytes: number;
}

export interface Contest {
    id: number;
    name: string;
    type: string;
    phase: string;
    frozen: boolean;
    durationSeconds: number;
    startTimeSeconds: number;
    relativeTimeSeconds: number;
    division: number;
    preparedBy?: string;
    websiteUrl?: string;
    description?: string;
    difficulty?: number;
    kind?: string;
    icpcRegion?: string;
    country?: string;
    city?: string;
    season?: string;
}