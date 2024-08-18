import { Exclude } from "class-transformer";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public uuid: string;

  @Column({ type: "varchar" })
  public name: string;

  @Column({ unique: true })
  public email!: string;

  @Exclude()
  @Column({ type: "varchar" })
  public password!: string;

  @CreateDateColumn({ type: "timestamptz" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  public updatedAt: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  public deletedAt: Date;
}
