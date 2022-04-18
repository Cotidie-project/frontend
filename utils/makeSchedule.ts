import { Break, PlanType, Task } from "../interface";

export default function makeSchedule(
    tasks: string[],
    breaks: Break[],
    planType: PlanType
): { tasks: Task[]; breaks: Break[] } {
    return {
        tasks: [],
        breaks: [],
    };
}
