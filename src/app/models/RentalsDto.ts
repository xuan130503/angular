import { LibraryUserDto } from './LibraryUserDto';
import { Book } from './book.models';

export interface RentalsDto {
  rentalid: number;
  rentalDate?: Date | null;
  returnDate?: Date | null;
  bookId: number;
  userId: number;
  book: Book;
  libraryUser: LibraryUserDto;
}

export interface UpdateRentalDto {
  returnDate?: Date | null;
}
