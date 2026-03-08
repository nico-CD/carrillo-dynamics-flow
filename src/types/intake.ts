import * as z from "zod";

export const intakeSchema = z.object({
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    email: z.string().email("Valid email required"),
    companyName: z.string().min(1, "Required"),
    website: z.string().optional(),
    role: z.string().min(1, "Required"),
    companySize: z.string().min(1, "Required"),
    annualRevenue: z.string().min(1, "Required"),
    projectBudget: z.string().min(1, "Required"),
    howCanWeHelp: z.string().min(1, "Required"),
    automationGoal: z.string().min(1, "Required"),
    anythingElse: z.string().optional(),
});

export type IntakeValues = z.infer<typeof intakeSchema>;
