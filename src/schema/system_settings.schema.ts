import { z } from "zod";

export const updateRegistrationLimitSchema = z.object({
  name: z.literal("registration_limit"),
  registration_limit: z.string(),
  registration_time_minutes: z.string(),
  is_enabled: z.boolean(),
});
