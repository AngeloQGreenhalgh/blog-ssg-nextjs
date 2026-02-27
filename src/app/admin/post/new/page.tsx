import { InputText } from '@/Components/InputText';

export const dynamic = 'force-dynamic';

export default async function AdminNewPage() {
  return (
    <div className='flex flex-col gap-6'>
      <InputText LabelText='Nome' placeholder='Digite seu nome' />
      <InputText LabelText='Sobrenome' placeholder='Digite seu sobrenome' />
      <InputText
        LabelText='Sobrenome'
        disabled
        placeholder='Digite seu sobrenome'
        defaultValue='Olá Mundo'
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
    </div>
  );
}
