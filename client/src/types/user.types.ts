export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  role: "USER" | "ADMIN";
  language?: string;
  createdAt: string;
  savedDestinations?: any[];
}
