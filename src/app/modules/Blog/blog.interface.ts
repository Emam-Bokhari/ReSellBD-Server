export type TBlog = {
    title: string;
    thumbnail: string;
    category: string;
    authorName: string;
    introduction: string;
    mainContent: string;
    tags?: string[];
    isDeleted?: boolean;
};