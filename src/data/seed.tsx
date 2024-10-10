// 'use server'

// // import { sql } from '@vercel/postgres';
// import { problem } from '@/definitions';
// import { db } from '@/db/index'; // Adjust the import path as necessary
// import { problemsTable } from '@/db/schema'; // Adjust the import path as necessary
// import * as dotenv from "dotenv";
// dotenv.config({ path: "./.env" });

// export const fetchCodeforcesProblems = async () => {
//     const url = 'https://codeforces.com/api/problemset.problems';

//     const problems = new Map<string, problem>();

//     try {
//         console.log("started")
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`Error: ${response.statusText}`);
//         }
//         const data = await response.json();
//         const problemsData = data.result.problems;
//         problemsData.forEach((problemData: problem) => {
//             problems.set(JSON.stringify({ contestId: problemData.contestId, index: problemData.index }), problemData);
//         });
//         const solvesData = data.result.problemStatistics;
//         solvesData.forEach((solveData: { contestId: number; index: string; solvedCount: number }) => {
//             const problem = problems.get(JSON.stringify({ contestId: solveData.contestId, index: solveData.index }));
//             if (problem) {
//                 problem.solvedCount = solveData.solvedCount;
//             }
//         });
//         for (const problem of problems.values()) {
//             await db.insert(problemsTable).values(problem).execute();
//         }
//         console.log("done")
//     } catch (error) {
//         console.error('Failed to fetch Codeforces problems:', error);
//         throw error;
//     }
// };