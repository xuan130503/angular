import { LibraryUserDto } from './LibraryUserDto';
import { Book } from './book.models';

export interface RentalsDto {
  rentalid: number;
  rentalDate: Date;
  returnDate: Date | null;
  bookId: number;
  userId: string;
  book: Book;
  libraryUser: LibraryUserDto;
}

export interface UpdateRentalDto {
  returnDate: Date | null;
}

export interface CreateRentalDto {
  RentalId: number;
  BookId: number;
  rentalDate: Date;
  LibraryUserId: string;
}
