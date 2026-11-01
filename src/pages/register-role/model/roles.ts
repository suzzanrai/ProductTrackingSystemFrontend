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
  needsApproval: boolean;
}

export const ROLES: readonly RoleConfig[] = [
  { id: "farmer", icon: Tractor, needsApproval: false },
  { id: "collector", icon: Scale, needsApproval: false },
  { id: "factory", icon: Factory, needsApproval: true },
  { id: "wholesaler", icon: Warehouse, needsApproval: false },
  { id: "retailer", icon: Store, needsApproval: false },
  { id: "consumer", icon: User, needsApproval: false },
];

export const DEFAULT_ROLE: RoleId = "farmer";
