import { LibraryUserDto } from './LibraryUserDto';
import { Book } from './book.models';

export interface RentalsDto {
  rentalid: number;
  rentalDate?: Date;
  returnDate?: Date | null;
  bookid: number;
  userid: number;
  book: Book;
  libraryUser: LibraryUserDto;
}
