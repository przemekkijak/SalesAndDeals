export class Note {
    shopId : number;
    author: string;
    createdAt: Date;
    content: string;

    constructor(shopId, author, createdAt, contents) {
        this.shopId = shopId;
        this.author = author;
        this.createdAt = createdAt;
        this.content = contents;
    }
}