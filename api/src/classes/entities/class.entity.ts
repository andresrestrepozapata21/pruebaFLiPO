// All imports neededs
import { Student } from "src/students/entities/student.entity";
import { Teacher } from "src/teachers/entities/teacher.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// To define entity teacher with column him
@Entity("classes")
export class Class {
    //@PrimaryGeneratedColumn()
    @Column({ primary: true, generated: true })
    id_class: number;

    @Column()
    name_class: string;

    @Column()
    description_class: string;

    @Column()
    date_created_class: Date;

    @DeleteDateColumn()
    deleteAt: Date

    @ManyToOne(() => Teacher, (teacher) => teacher.id_teacher, {
        eager: true,
    })
    @JoinColumn({ name: 'fk_id_teacher_class' })
    fk_id_teacher_class: Teacher;

    @ManyToMany(() => Student, (student) => student.classes, {
        eager: true, // Automatically load students when fetching class
    })
    @JoinTable({
        name: "students_by_classes",
        joinColumn: {
            name: "fk_id_class_sbc",
            referencedColumnName: "id_class"
        },
        inverseJoinColumn: {
            name: "fk_id_student_sbc",
            referencedColumnName: "id_student"
        }
    })
    students: Student[];
}
