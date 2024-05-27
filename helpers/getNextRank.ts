import { ranks } from "@/helpers/getRank";

export const getNextRank = (id: number) => {
  const nextRank = ranks.find((r) => r.id === id + 1);

  return {
    id: nextRank?.id ?? 0,
    name: nextRank?.name ?? "Unranked",
    color: nextRank?.color ?? "#000",
    minPoints: nextRank?.minPoints ?? 0,
    maxPoints: nextRank?.maxPoints ?? Infinity,
  };
};
