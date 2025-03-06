import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from 'src/tasks/entities/task.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string; // Store hashed password

  @OneToMany(() => Task, (task) => task.user, { cascade: true })
  tasks: Task[];

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
