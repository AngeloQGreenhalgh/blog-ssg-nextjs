import { hashPassword } from '@/lib/login/manage-login';

(async () => {
  const minhaSenha = ''; // NÃO ESQUECER DE APAGAR SUA SENHA DAQUI
  const hasheDaSuaSenhaEmBase64 = await hashPassword(minhaSenha);
  console.log({ hasheDaSuaSenhaEmBase64 });
})();
