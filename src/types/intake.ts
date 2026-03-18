import * as z from "zod";

export const intakeSchema = z.object({
    // Step 1 - Required
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    email: z.string().email("Valid email required"),
    companyName: z.string().min(1, "Required"),
    howCanWeHelp: z.string().min(1, "Required"),

    // Step 2 - Optional
    website: z.string().optional(),
    role: z.string().optional(),
    companySize: z.string().optional(),
    annualRevenue: z.string().optional(),
    projectBudget: z.string().optional(),
    automationGoal: z.string().optional(),
    anythingElse: z.string().optional(),
});

export type IntakeValues = z.infer<typeof intakeSchema>;
