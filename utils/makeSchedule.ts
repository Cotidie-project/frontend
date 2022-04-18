import { Break, PlanType, Task } from "../interface";

export default function makeSchedule(
    tasks: string[],
    breaks: Break[],
    planType: PlanType
): { tasks: any[]; breaks: Break[] } {
    return {
        tasks: tasks.map((task) => ({
            title: task,
            time: new Date(200, 0, 1, Math.random() * 24, Math.random() * 60),
            points: 10,
        })),
        breaks: breaks,
    };
}
