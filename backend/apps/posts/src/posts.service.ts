import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './models/create-post.input';
import { UpdatePostInput } from './models/update-post.input';
import { Post } from './types/post.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { CurrentUser } from './common/decorators/current-user.model';
import { ForbiddenError } from '@nestjs/apollo';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
  ) {}

  async create(
    user: CurrentUser,
    createPostInput: CreatePostInput
  ): Promise<Post> {
    const post = new PostEntity();
    post.body = createPostInput.body;
    post.title = createPostInput.title;
    post.authorId = user.sub;
    await this.postRepository.save(post);
    return {
      id: post.id,
      authorId: post.authorId,
      body: post.body,
      title: post.title
    };
  }

  async findAll(): Promise<Post[]> {
    const posts = (await this.postRepository.find()).map(
      (p): Post => ({
        id: p.id,
        authorId: p.authorId,
        body: p.body,
        title: p.title
      })
    );
    return posts;
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postRepository.findOneByOrFail({ id });
    return {
      id: post.id,
      authorId: post.authorId,
      body: post.authorId,
      title: post.title
    };
  }

  async update(
    user: CurrentUser,
    updatePostInput: UpdatePostInput
  ): Promise<string> {
    const post = await this.postRepository.findOneByOrFail({
      id: updatePostInput.id
    });
    if (post.authorId != user.sub)
      throw new ForbiddenError("Can't update this post");
    post.body = updatePostInput.body;
    await this.postRepository.save(post);
    return post.id;
  }

  async remove(user: CurrentUser, id: string): Promise<string> {
    const post = await this.postRepository.findOneByOrFail({
      id
    });
    if (post.authorId != user.sub)
      throw new ForbiddenError("Can't delete this post");
    this.postRepository.remove(post);
    return post.id;
  }

  async forAuthor(authorId: string): Promise<Post[]> {
    return this.postRepository.findBy({ authorId });
  }
}
