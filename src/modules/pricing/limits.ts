export type Plan = "free" | "pro" | "business"

export const PLAN_LIMITS: Record<Plan, {
    maxMonitors: number
    minFrequencyMinutes: number
}> = {
    free: { maxMonitors: 5, minFrequencyMinutes: 15 },
    pro: { maxMonitors: 20, minFrequencyMinutes: 10 },
    business: { maxMonitors: 100, minFrequencyMinutes: 5 },
}
