// All imports neededs
import { Class } from "src/classes/entities/class.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// To define entity teacher with column him
@Entity("teachers")
export class Teacher {
    //@PrimaryGeneratedColumn()
    @Column({primary: true, generated: true})
    id_teacher: number;

    @Column()
    name_teacher: string;

    @Column()
    last_name_teacher: string;

    @Column()
    email_teacher: string;

    @Column()
    date_created_teacher: Date;

    @DeleteDateColumn()
    deleteAt: Date

    @OneToMany(() => Class, (classEntity) => classEntity.fk_id_teacher_class)
    classes: Class[];
}
