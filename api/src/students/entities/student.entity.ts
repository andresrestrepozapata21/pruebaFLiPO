// All imports neededs
import { Class } from "src/classes/entities/class.entity";
import { Column, DeleteDateColumn, Entity, ManyToMany } from "typeorm";
// To define entity teacher with column him
@Entity("students")
export class Student {
    //@PrimaryGeneratedColumn()
    @Column({ primary: true, generated: true })
    id_student: number;

    @Column()
    name_student: string;

    @Column()
    last_name_student: string;

    @Column()
    email_student: string;

    @Column()
    date_created_student: Date;

    @DeleteDateColumn()
    deleteAt: Date

    @ManyToMany(() => Class, (classEntity) => classEntity.students)
    classes: Class[];
}
