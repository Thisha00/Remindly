export function getPriorityLevel(priority) {
  const score = Number(priority);
  if (!Number.isFinite(score)) return { label: "Unknown", level: "unknown" };
  if (score >= 8) return { label: "Urgent", level: "urgent" };
  if (score >= 6) return { label: "High", level: "high" };
  if (score >= 3) return { label: "Medium", level: "medium" };
  return { label: "Low", level: "low" };
}
