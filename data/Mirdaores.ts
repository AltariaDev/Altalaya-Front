export type MarkerType = {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  views: string;
  image: string;
  key: string;
  title: string;
  description?: string;
};

export const miradores: MarkerType[] = [
  {
    key: "mirador-1",
    title: "Mirador de Gibralfaro",
    views: "8.2k",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
    coordinate: { latitude: 36.7225, longitude: -4.4119 },
  },
  {
    key: "mirador-2",
    title: "Mirador de la Alcazaba",
    views: "9.5k",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
    coordinate: { latitude: 36.7219, longitude: -4.4156 },
  },
  {
    key: "mirador-3",
    title: "Mirador de la Concepción",
    views: "10.3k",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
    coordinate: { latitude: 36.7247, longitude: -4.4183 },
  },
  {
    key: "mirador-4",
    title: "Mirador de Monte Victoria",
    views: "11k",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
    coordinate: { latitude: 36.7261, longitude: -4.4097 },
  },
  {
    key: "mirador-5",
    title: "Mirador de la Malagueta",
    views: "12k",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
    coordinate: { latitude: 36.7189, longitude: -4.4083 },
  },
  {
    key: "mirador-6",
    title: "Mirador de San Antón",
    views: "13k",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
    coordinate: { latitude: 36.7208, longitude: -4.4208 },
  },
  {
    key: "mirador-7",
    title: "Mirador de la Coracha",
    views: "7.8k",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
    coordinate: { latitude: 36.7233, longitude: -4.4133 },
  },
  {
    key: "mirador-8",
    title: "Mirador de la Farola",
    views: "9.1k",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
    coordinate: { latitude: 36.7167, longitude: -4.4167 },
  },
];
