import {
  Building2,
  GraduationCap,
  Plane,
  Briefcase,
  HeartPulse,
  Home,
  Sparkles,
  Bath,
  Wrench,
  Recycle,
  Armchair,
  Award,
  Trophy,
  type LucideIcon,
} from 'lucide-react'

export const ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  GraduationCap,
  Plane,
  Briefcase,
  HeartPulse,
  Home,
  Sparkles,
  Bath,
  Wrench,
  Recycle,
  Armchair,
  Award,
  Trophy,
}

export function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Building2
}
