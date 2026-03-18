import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { IntakeValues } from "@/types/intake";

export const useIntake = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const submitIntake = async (data: IntakeValues, step: 1 | 2 = 1) => {
        setIsLoading(true);
        try {
            const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

            if (!webhookUrl) {
                console.error("VITE_N8N_WEBHOOK_URL is not defined");
                toast({
                    variant: "destructive",
                    title: "Configuration Error",
                    description: "Webhook URL is missing. Please contact support.",
                });
                setIsLoading(false);
                return false;
            }

            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                    formStep: step,
                    submittedAt: new Date().toISOString(),
                    source: window.location.hostname,
                }),
            });

            if (response.ok) {
                return true;
            } else {
                throw new Error("Failed to submit");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            toast({
                variant: "destructive",
                title: "Submission Failed",
                description: "There was a problem sending your application. Please try again or email us directly.",
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        submitIntake,
    };
};
