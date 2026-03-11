import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { drizzleDb } from '@/db/drizzle';
import { postTable } from '@/db/drizzle/schemas';
import { eq } from 'drizzle-orm';
import { logColor } from '@/utils/log-color';
import { asyncDelay } from '@/utils/async-delay';
import { SIMULATE_WAIT_IN_MS } from '@/lib/constants';

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor('findAllPublic', Date.now());

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (post, { eq }) => eq(post.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor('findBySlugPublic', Date.now());

    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq, and }) =>
        and(eq(post.slug, slug), eq(post.published, true)),
    });

    if (!post) {
      throw new Error('Post não encontrado para slug');
    }
    return post;
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor('findAll', Date.now());

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }
  async findById(id: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor('findById', Date.now());

    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq }) => eq(post.id, id),
    });

    if (!post) {
      throw new Error('Post não encontrado para ID');
    }
    return post;
  }

  async create(post: PostModel): Promise<PostModel> {
    const postExists = await drizzleDb.query.posts.findFirst({
      where: (posts, { or, eq }) =>
        or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    });

    if (!!postExists) {
      throw new Error('Post com ID ou Slug já existe na base de dados');
    }

    await drizzleDb.insert(postTable).values(post);
    return post;
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    const oldPost = await drizzleDb.query.posts.findFirst({
      where: (posts, { or, eq }) => eq(posts.id, id),
    });

    if (!oldPost) {
      throw new Error('Post não existe');
    }

    const updatedAt = new Date().toISOString();

    const postData = {
      author: newPostData.author,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      excerpt: newPostData.excerpt,
      published: newPostData.published,
      title: newPostData.title,
      updatedAt,
    };

    await drizzleDb.update(postTable).set(postData).where(eq(postTable.id, id));

    return {
      ...oldPost,
      ...postData,
    };
  }
  // async update(
  //   id: string,
  //   postData: Partial<PostModel>,
  // ): Promise<PostModel | null> {
  //   const { id: _, ...dataToUpdate } = postData;

  //   // monta dinamicamente os campos a atualizar
  //   const fieldsToUpdate: Partial<PostModel> = {};

  //   if (dataToUpdate.title !== undefined)
  //     fieldsToUpdate.title = dataToUpdate.title;
  //   if (dataToUpdate.slug !== undefined)
  //     fieldsToUpdate.slug = dataToUpdate.slug;
  //   if (dataToUpdate.excerpt !== undefined)
  //     fieldsToUpdate.excerpt = dataToUpdate.excerpt;
  //   if (dataToUpdate.content !== undefined)
  //     fieldsToUpdate.content = dataToUpdate.content;
  //   if (dataToUpdate.coverImageUrl !== undefined)
  //     fieldsToUpdate.coverImageUrl = dataToUpdate.coverImageUrl;
  //   if (dataToUpdate.published !== undefined)
  //     fieldsToUpdate.published = dataToUpdate.published;
  //   if (dataToUpdate.author !== undefined)
  //     fieldsToUpdate.author = dataToUpdate.author;

  //   // sempre atualiza o timestamp
  //   fieldsToUpdate.updatedAt = new Date().toISOString();

  //   const [updated] = await drizzleDb
  //     .update(postTable)
  //     .set(fieldsToUpdate)
  //     .where(eq(postTable.id, id))
  //     .returning();

  //   return updated ?? null;
  // }

  async delete(id: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) {
      throw new Error('Post não existe');
    }

    await drizzleDb.delete(postTable).where(eq(postTable.id, id));

    return post;
  }
}

(async () => {
  //const repo = new DrizzlePostRepository();
  // console.log('Teste do DrizzlePostRepository');
  // const posts = await repo.findAll();
  // posts.forEach(post => {
  //   console.log(post.slug, post.published);
  // });
  // const post = await repo.findAll();
  // post.slug = 'rotina-matinal-de-pessoas-altamente-eficazes';
  // const postUpdate = await repo.update(post.id, post);
  // console.log(postUpdate);
  // const post = await repo.findBySlugPublic('teste');
  //console.log(post);
  // const posts = await repo.findAll();
  // posts.forEach(post => {
  //   console.log(post.id, post.slug, post.published);
  // });
  // 6b204dab-2312-4525-820a-a0463560835f como-a-tecnologia-impacta-nosso-bem-estar false
  // 76396dd3-9581-43b5-856d-fe1a78714e8c os-desafios-do-trabalho-remoto-moderno true
  // const post = await repo.findById('99f8add4-7684-4c16-a316-616271db199e');
  // console.log(post);
  // post.title = 'Rotina matinal de pessoas altamente eficazes';
  // console.log(post);
  // const postUpdate = await repo.update(post.id, post);
  // console.log(postUpdate);
  // const post1 = await repo.findById('99f8add4-7684-4c16-a316-616271db199e');
  // console.log(post1);
  // // const post = await repo.findById('76396dd3-9581-43b5-856d-fe1a78714e8c');
  //  console.log(postUpdate);
  // const post = await repo.findById('76396dd3-9581-43b5-856d-fe1a78714e8m');
  // console.log(post);
})();
