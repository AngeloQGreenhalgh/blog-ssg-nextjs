import { Button } from '@/Components/Button';
import { BanIcon, BugIcon, CheckIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function AdminNewPage() {
  return (
    <div>
      <div className='py-16 flex gap-4 flex-wrap items-center'>
        <Button variant='default' size='sm' type='submit'>
          <BugIcon /> Confirma
        </Button>
        <Button variant='ghost' size='md' type='submit'>
          <BugIcon />
          Confirma
        </Button>
        <Button variant='danger' size='lg' type='submit'>
          <BugIcon />
          Confirma
        </Button>
      </div>
      <div className='py-16 flex gap-4 flex-wrap items-center'>
        <Button variant='default' size='sm' type='submit' disabled>
          <BugIcon /> Confirma
        </Button>
        <Button variant='ghost' size='md' type='submit' disabled>
          <BugIcon />
          Confirma
        </Button>
        <Button variant='danger' size='lg' type='submit' disabled>
          <BugIcon />
          Confirma
        </Button>
        <Button variant='danger' size='lg' type='submit' className='w-full'>
          <BugIcon />
          Confirma
        </Button>
        <Button variant='ghost' size='lg' type='submit' className='w-full'>
          <BanIcon />
          Cancel
        </Button>
        <Button variant='default' size='lg' type='submit' className='w-full'>
          <CheckIcon />
          OK
        </Button>
      </div>
    </div>
  );
}
