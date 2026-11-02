import {
  Factory,
  Scale,
  Store,
  Tractor,
  User,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export const ROLE_IDS = [
  "farmer",
  "collector",
  "factory",
  "wholesaler",
  "retailer",
  "consumer",
] as const;

export type RoleId = (typeof ROLE_IDS)[number];

export interface RoleConfig {
  id: RoleId;
  icon: LucideIcon;
}

export const ROLES: readonly RoleConfig[] = [
  { id: "farmer", icon: Tractor },
  { id: "collector", icon: Scale },
  { id: "factory", icon: Factory },
  { id: "wholesaler", icon: Warehouse },
  { id: "retailer", icon: Store },
  { id: "consumer", icon: User },
];

export const DEFAULT_ROLE: RoleId = "farmer";
