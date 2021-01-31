export class Note {
    shopId : number;
    author: string;
    createdAt: Date;
    contents: string;

    constructor(shopId, author, createdAt, contents) {
        this.shopId = shopId;
        this.author = author;
        this.createdAt = createdAt;
        this.contents = contents;
    }
}