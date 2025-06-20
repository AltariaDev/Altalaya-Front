export type MiradorType = {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  views: string;
  image: string;
  key: string;
  title: string;
  description?: string;
  city: string;
  country: string;
  comments: number;
  likes: number;
};

export const miradores: MiradorType[] = [
  {
    key: "mirador-1",
    title: "Mirador de Gibralfaro",
    views: "8.2k",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
    coordinate: { latitude: 36.7225, longitude: -4.4119 },
    city: "Málaga",
    country: "Spain",
    description:
      "Spectacular views of Málaga city and port from the historic Gibralfaro castle",
    comments: 342,
    likes: 2156,
  },
  {
    key: "mirador-2",
    title: "Mirador de la Alcazaba",
    views: "9.5k",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
    coordinate: { latitude: 36.7219, longitude: -4.4156 },
    city: "Málaga",
    country: "Spain",
    description:
      "Ancient Moorish fortress offering panoramic views of the Mediterranean",
    comments: 456,
    likes: 2891,
  },
  {
    key: "mirador-3",
    title: "Mirador de la Concepción",
    views: "10.3k",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
    coordinate: { latitude: 36.7247, longitude: -4.4183 },
    city: "Málaga",
    country: "Spain",
    description: "Romantic viewpoint with stunning sunset views over the city",
    comments: 523,
    likes: 3247,
  },
  {
    key: "mirador-4",
    title: "Mirador de Monte Victoria",
    views: "11k",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
    coordinate: { latitude: 36.7261, longitude: -4.4097 },
    city: "Málaga",
    country: "Spain",
    description:
      "Highest viewpoint in Málaga with 360-degree city and mountain views",
    comments: 678,
    likes: 4123,
  },
  {
    key: "mirador-5",
    title: "Mirador de la Malagueta",
    views: "12k",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
    coordinate: { latitude: 36.7189, longitude: -4.4083 },
    city: "Málaga",
    country: "Spain",
    description:
      "Coastal viewpoint overlooking the famous Malagueta beach and bullring",
    comments: 789,
    likes: 4567,
  },
  {
    key: "mirador-6",
    title: "Mirador de San Antón",
    views: "13k",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
    coordinate: { latitude: 36.7208, longitude: -4.4208 },
    city: "Málaga",
    country: "Spain",
    description:
      "Hidden gem with intimate views of the historic center and cathedral",
    comments: 234,
    likes: 1892,
  },
  {
    key: "mirador-7",
    title: "Mirador de la Coracha",
    views: "7.8k",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
    coordinate: { latitude: 36.7233, longitude: -4.4133 },
    city: "Málaga",
    country: "Spain",
    description: "Seaside viewpoint with dramatic cliffs and ocean vistas",
    comments: 156,
    likes: 1234,
  },
];
