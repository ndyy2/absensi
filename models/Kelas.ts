// models/Kelas.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/lib/sequelize"; // Adjust the import path as necessary

interface KelasAttributes {
  id: number;
  kelas: string;
  icon: string;
  students: number;
  hadir: number;
  izin: number;
  sakit: number;
  alpa: number;
  bg: string;
}

type KelasCreationAttributes = Optional<KelasAttributes, "id">;

class Kelas
  extends Model<KelasAttributes, KelasCreationAttributes>
  implements KelasAttributes
{
  public id!: number;
  public kelas!: string;
  public icon!: string;
  public students!: number;
  public hadir!: number;
  public izin!: number;
  public sakit!: number;
  public alpa!: number;
  public bg!: string;
}

Kelas.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    kelas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    students: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hadir: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    izin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sakit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alpa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Kelas",
    tableName: "kelas",
    timestamps: false,
  }
);

export default Kelas;
