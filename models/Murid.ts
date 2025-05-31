// models/Student.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/lib/sequelize"; // Adjust the import path as necessary

interface StudentAttributes {
  id: number;
  nama: string;
  nis: string;
  kehadiran: "Hadir" | "Izin" | "Sakit" | "Alpa";
  tanggal: string;
  keterangan: string;
  suratName?: string | null;
  suratUrl?: string | null;
}

type StudentCreationAttributes = Optional<StudentAttributes, "id">;

class Student
  extends Model<StudentAttributes, StudentCreationAttributes>
  implements StudentAttributes
{
  public id!: number;
  public nama!: string;
  public nis!: string;
  public kehadiran!: "Hadir" | "Izin" | "Sakit" | "Alpa";
  public tanggal!: string;
  public keterangan!: string;
  public suratName!: string | null;
  public suratUrl!: string | null;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kehadiran: {
      type: DataTypes.ENUM("Hadir", "Izin", "Sakit", "Alpa"),
      allowNull: false,
    },
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    keterangan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    suratName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    suratUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Student",
    tableName: "students",
    timestamps: false,
  }
);

export default Student;
