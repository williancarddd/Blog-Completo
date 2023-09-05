import { TypeRoles } from "../../routes/Admin/Type_roles/TypeRoles";

const typeRolesSeedData = [
    { name: 'admin' },
    { name: 'writer' },
    { name: 'contribuitor' },
  ];
  
  async function seed() {
    try {
      await TypeRoles.bulkCreate(typeRolesSeedData);
      console.log('Seeds de TypeRoles foram inseridos com sucesso.');
    } catch (error) {
      console.error('Erro ao inserir seeds de TypeRoles:', error);
    }
  }
  
  seed();