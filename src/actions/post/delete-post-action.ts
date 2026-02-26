'use server';
import { drizzleDb } from '@/db/drizzle';
import { postTable } from '@/db/drizzle/schemas';
import { postRepository } from '@/repositories/post';
import { asyncDelay } from '@/utils/async-delay';
import { logColor } from '@/utils/log-color';
import { eq } from 'drizzle-orm/sql';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  await asyncDelay(2000); // Simula um atraso de 2 segundos para a operação de deleção
  // Aqui você pode adicionar a lógica para deletar o post do banco de dados
  // Exemplo:
  // await deletePostById(id);
  logColor(`Post com ID ${id} deletado`);

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos',
    };
  }

  const post = await postRepository.findById(id).catch(() => undefined);

  if (!post) {
    return {
      error: 'Post não existe',
    };
  }

  await drizzleDb.delete(postTable).where(eq(postTable.id, id));

  revalidateTag('posts', 'seconds');
  revalidateTag(`post-${post.slug}`, 'seconds');

  return {
    error: '',
  };
}
