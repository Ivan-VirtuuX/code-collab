import { IRank } from "@/types/Rank";

export const ranks: IRank[] = [
  {
    id: 1,
    name: "Новичок",
    color: "#2D3436",
    minPoints: 1000,
    maxPoints: 2000,
  },
  {
    id: 2,
    name: "Исследователь",
    color: "#F66880",
    minPoints: 2000,
    maxPoints: 3000,
  },
  { id: 3, name: "Ученик", color: "#F0A983", minPoints: 3000, maxPoints: 4000 },
  {
    id: 4,
    name: "Продвинутый",
    color: "#576BE6",
    minPoints: 4000,
    maxPoints: 5000,
  },
  {
    id: 5,
    name: "Эксперт",
    color: "#8612F3",
    minPoints: 5000,
    maxPoints: 6000,
  },
  { id: 6, name: "Мастер", color: "#61D435", minPoints: 6000, maxPoints: 7000 },
  { id: 7, name: "Гуру", color: "#F35812", minPoints: 7000, maxPoints: 8000 },
  {
    id: 8,
    name: "Виртуоз",
    color: "#12A5F3",
    minPoints: 8000,
    maxPoints: 9000,
  },
  {
    id: 9,
    name: "Чемпион",
    color: "#2912F3",
    minPoints: 9000,
    maxPoints: 10000,
  },
  {
    id: 10,
    name: "Легенда",
    color: "#F39C12",
    minPoints: 10000,
    maxPoints: Infinity,
  },
];

export const getRank = (
  ratingPoints: number
): Omit<IRank, "minPoints" | "maxPoints"> => {
  const rank = ranks.find(
    (r) => ratingPoints >= r.minPoints && ratingPoints < r.maxPoints
  );

  return {
    id: rank?.id ?? 0,
    name: rank?.name ?? "Unranked",
    color: rank?.color ?? "#000",
  };
};
