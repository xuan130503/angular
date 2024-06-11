export interface RentalsDto{
    rentalId : number ;
    bookId : number ;
    libraryUserId : number ;
    rentalDate : Date;
    returnRental : Date | null;
}