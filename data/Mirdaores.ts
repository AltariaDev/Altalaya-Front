export type MiradorType = {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  views: number;
  image: string;
  key: string;
  title: string;
  description?: string;
  city: string;
  country: string;
  comments: number;
  likes: number;
};
