import { Review } from "./review";

export interface Book {
    _id: string;
    authors: string[];
    title: string;
    description: string;
    publisher: string;
    year: string;
    isbn: string;
    coverImageUrl: string;
    category: string;
    ratings: number[];
    reviews: Review[];
  }
