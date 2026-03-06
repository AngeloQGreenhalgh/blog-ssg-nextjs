'use client';

import { Button } from '@/Components/Button';
import { InputCheckbox } from '@/Components/InputCheckbox';
import { InputText } from '@/Components/InputText';
import { MarkdownEditor } from '@/Components/MarkdownEditor';
import { useState } from 'react';
import { ImageUploader } from '../ImageUploader';

export function ManagePostForm() {
  const [contentValue, setContentValue] = useState('Este é **um** exemplo.');
  return (
    <form action='' className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText LabelText='Nome' placeholder='Digite seu nome' />

        <ImageUploader />

        <InputText LabelText='Sobrenome' placeholder='Digite seu sobrenome' />
        <InputCheckbox labelText='Sobrenome' />

        <InputText
          LabelText='Sobrenome'
          disabled
          placeholder='Digite seu sobrenome'
          defaultValue='Olá Mundo'
        />

        <MarkdownEditor
          labelText='Conteúdo'
          disabled={false}
          textAreaName='content'
          value={contentValue}
          setValue={setContentValue}
        />

        <InputText
          LabelText='Sobrenome'
          disabled
          placeholder='Digite seu sobrenome'
        />
        <InputText
          LabelText='Sobrenome'
          placeholder='Digite seu sobrenome'
          readOnly
        />
        <InputText
          LabelText='Sobrenome'
          placeholder='Digite seu sobrenome'
          defaultValue='Olá Mundo'
          readOnly
        />
        <div className='mt-4'>
          <Button type='submit'>Enviar</Button>
        </div>
      </div>
    </form>
  );
}
