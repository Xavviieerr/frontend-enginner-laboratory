import { z } from "zod";

export const searchQuerySchema = z
	.string()
	.trim()
	.min(1, "Search query cannot be empty");
