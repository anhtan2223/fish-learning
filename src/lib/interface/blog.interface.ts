export interface BlogPost {
    id: string;
    title: string;
    datePublish: string;
    author: string;
    tags: string[];
    image: string;
    views: number;
    excerpt: string;
}