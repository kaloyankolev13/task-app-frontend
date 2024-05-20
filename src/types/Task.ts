export interface IProduct {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    images: Image[];
    inStorage: boolean;

}

interface Image {
    _id: string;
    url: string;
    filename: string;
    blob: Blob;

    // add more properties if needed
  }
