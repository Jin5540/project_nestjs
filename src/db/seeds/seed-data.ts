import * as bcrypt from 'bcryptjs';
import { DataSource } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { UserRoles } from "src/auth/user-role.enum";

export async function seedData(dataSource: DataSource): Promise<void> {
      //await dataSource.query('TRUNCATE "role" RESTART IDENTITY;');
  
      const repository = dataSource.getRepository(User);
      const salt =await bcrypt.genSalt();
      const password = 'admin';
      const hashhedPassword = await bcrypt.hash(password, salt);

      await repository.insert([
        {
            email: 'admin@admin.com',
            password: hashhedPassword,
            role: UserRoles.ADMIN
        },
      ]);
}
  