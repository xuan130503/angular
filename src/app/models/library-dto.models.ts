import { Book } from "./book.models";

export interface LibraryDto {
    libraryId: number;
    libraryName: string;
    location: string;
    books: Book[];
  }