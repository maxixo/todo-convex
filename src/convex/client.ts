// src/convex/client.ts
import { ConvexReactClient } from "convex/react";

// Replace the placeholder with your Convex deployment URL, or set it in env
const CONVEX_URL = process.env.EXPO_PUBLIC_CONVEX_URL || "<YOUR_CONVEX_URL>";
export const convexClient = new ConvexReactClient(CONVEX_URL);
