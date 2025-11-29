// Simple Toast Hook for Demo
import { useState } from 'react'

export function useToast() {
    const toast = ({ title, description, variant }) => {
        // Simple console log for now - replace with actual toast UI if needed
        console.log(`[${variant || 'info'}] ${title}: ${description}`)

        // You can also use window.alert for immediate feedback
        if (variant === 'destructive') {
            alert(`Error: ${description}`)
        } else {
            alert(`${title}: ${description}`)
        }
    }

    return { toast }
}
