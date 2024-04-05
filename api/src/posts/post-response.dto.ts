import { UserResponseDTO } from "src/user/user-response.dto";
import { PostType } from "./post.entity";

export class PostResponseDto {
    id: string;
    title: string;
    content: string;
    timestamp: Date;
    cost: number;
    address: string;
    image?: string[];
    type: PostType;
    user?: UserResponseDTO;
}
  