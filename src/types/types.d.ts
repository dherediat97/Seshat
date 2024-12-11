//Book Result Response of API REQUEST
export type BookListResponse = {
  books: Book[];
  info: InfoBookListResponse;
};

export type InfoBookListResponse = {
  page: number;
  totalSize: number;
  lastPage: number;
};

//Book Class
export type Book = {
  id: string;
  isbn: string;
  imgSrc: string;
  title: string;
  authorName: string;
  publisherName: string;
  pages: number;
  isLocalBook: boolean = false;
  isDeleted: boolean = false;
};

export type ReviewResponse = {
  reviews: Review[];
  page: number;
  totalSize: number;
};

export type Review = {
  id: number;
  title: string;
  authorName: string;
  content: string;
};
