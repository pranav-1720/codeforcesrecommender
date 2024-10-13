import { useState, useEffect, useMemo } from "react";
import { fetchUserSubmissions } from "./actions";
import { Submission, Verdict } from "@/definitions";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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

    const totalSubmissions = useMemo(() => submissions.length, [submissions]);

    const successfulSubmissions = useMemo(
        () => submissions.filter(submission => submission.verdict === Verdict.OK).length,
        [submissions]
    );

    const TLESubmissions = useMemo(
        () => submissions.filter(submission => submission.verdict === Verdict.TIME_LIMIT_EXCEEDED).length,
        [submissions]
    );

    const MLESubmissions = useMemo(
        () => submissions.filter(submission => submission.verdict === Verdict.MEMORY_LIMIT_EXCEEDED).length,
        [submissions]
    )

    const WASubmissions = useMemo(
        () => submissions.filter(submission => submission.verdict === Verdict.WRONG_ANSWER).length,
        [submissions]
    )

    if (error) {
        return <div>{error}</div>;
    }

    const chartConfig = {
        WA: {
            label: "WA",
            color: "hsl(var(--chart-1))",
        },
        Accepted: {
            label: "Accepted",
            color: "hsl(var(--chart-2))",
        },
        Other: {
            label: "Other",
            color: "hsl(var(--chart-3))",
        },
        MLE: {
            label: "MLE",
            color: "hsl(var(--chart-4))",
        },
        TLE: {
            label: "TLE",
            color: "hsl(var(--chart-5))",
        },
    } satisfies ChartConfig


    const chartData = [
        { label: "Accepted", Count: successfulSubmissions, fill: "var(--color-Accepted)" },
        { label: "WA", Count: WASubmissions, fill: "var(--color-WA)" },
        { label: "TLE", Count: TLESubmissions, fill: "var(--color-TLE)" },
        { label: "MLE", Count: MLESubmissions, fill: "var(--color-MLE)" },
        { label: "Other", Count: totalSubmissions - successfulSubmissions - TLESubmissions - MLESubmissions - WASubmissions, fill: "var(--color-Other)" },
    ]

    return (
        <div>
            <h1>Overview</h1>
            <p>User: {user}</p>
            <div className="grid grid-cols-2 gap-4">
                <Card className="flex flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Submission Verdicts</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square max-h-[300px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={chartData}
                                    dataKey="Count"
                                    nameKey="label"
                                    innerRadius={60}
                                />
                                <ChartLegend
                                    content={<ChartLegendContent nameKey="label" />}
                                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                                />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Submission Verdicts</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square max-h-[300px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={chartData}
                                    dataKey="Count"
                                    nameKey="label"
                                    innerRadius={60}
                                />
                                <ChartLegend
                                    content={<ChartLegendContent nameKey="label" />}
                                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                                />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Submission Verdicts</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square max-h-[300px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={chartData}
                                    dataKey="Count"
                                    nameKey="label"
                                    innerRadius={60}
                                />
                                <ChartLegend
                                    content={<ChartLegendContent nameKey="label" />}
                                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                                />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// "use client"

// import { Pie, PieChart } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartLegend,
//   ChartLegendContent,
// } from "@/components/ui/chart"

// export const description = "A pie chart with a legend"

// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ]

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Chrome",
//     color: "hsl(var(--chart-1))",
//   },
//   safari: {
//     label: "Safari",
//     color: "hsl(var(--chart-2))",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "hsl(var(--chart-3))",
//   },
//   edge: {
//     label: "Edge",
//     color: "hsl(var(--chart-4))",
//   },
//   other: {
//     label: "Other",
//     color: "hsl(var(--chart-5))",
//   },
// } satisfies ChartConfig

// export function Component() {
//   return (
//     <Card className="flex flex-col">
//       <CardHeader className="items-center pb-0">
//         <CardTitle>Pie Chart - Legend</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[300px]"
//         >
//           <PieChart>
//             <Pie data={chartData} dataKey="visitors" />
//             <ChartLegend
//               content={<ChartLegendContent nameKey="browser" />}
//               className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
//             />
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }
