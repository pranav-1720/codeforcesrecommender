// 'use server'

// // import { sql } from '@vercel/postgres';
// import { problem, Contest } from '@/definitions';
// import { db } from '@/db/index'; // Adjust the import path as necessary
// import { problemsTable, contestsTable } from '@/db/schema'; // Adjust the import path as necessary
// import * as dotenv from "dotenv";
// dotenv.config({ path: "./.env" });

// export const fetchCodeforcesContests = async () => {
//     const url = 'https://codeforces.com/api/contest.list';

//     const contests = new Map<number, Contest>();

//     try {
//         console.log("started")
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`Error: ${response.statusText}`);
//         }
//         const data = await response.json();
//         const contestsData = data.result;
//         contestsData.forEach((contestData: Contest) => {
//             contestData.division = 0;
//             if (contestData.name.toLowerCase().includes('div. 4')) {
//                 contestData.division = 4;
//             }
//             else if (contestData.name.toLowerCase().includes('div. 3')) {
//                 contestData.division = 3;
//             }
//             else if (contestData.name.toLowerCase().includes('div. 2')) {
//                 contestData.division = 2;
//             }
//             else if (contestData.name.toLowerCase().includes('div. 1')) {
//                 contestData.division = 1;
//             }
//             contests.set(contestData.id, contestData);
//         });
//         for (const contest of contests.values()) {
//             await db.insert(contestsTable).values(contest).execute();
//         }
//         console.log("done")
//     }
//     catch (error) {
//         console.error('Failed to fetch Codeforces contests:', error);
//         throw error;
//     }
// }

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