export type Plan = "free" | "pro" | "business"

export type ButtonState = {
    label: string
    action: "portal" | "upgrade" | "none"
}

export function getPlanButtonState(
    current: Plan,
    card: Plan
): ButtonState {
    if (current === card) {
        if (card === "free") {
            return { label: "Current Plan", action: "none" }
        }
        return { label: "Manage subscription", action: "portal" }
    }

    const hierarchy: Plan[] = ["free", "pro", "business"]
    const currentIndex = hierarchy.indexOf(current)
    const cardIndex = hierarchy.indexOf(card)

    if (cardIndex > currentIndex) {
        return {
            label: `Upgrade to ${card.charAt(0).toUpperCase() + card.slice(1)}`,
            action: "upgrade",
        }
    }

    return { label: "", action: "none" }
}
