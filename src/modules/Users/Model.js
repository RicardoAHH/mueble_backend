import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../database/sequelize.js";
import { Roles } from "../Roles/Model.js";

export class Users extends Model { }

Users.init(
  /**
   * Configuración del campo id: 🚀
   *   - **type**: 'DataTypes.BIGINT' 🛠️
   *   - **BIGINT**: Utilizado para almacenar números enteros grandes. 📊
   *   - Nota: Usa el mismo tipo de dato para llaves foráneas (ej: 'id BIGINT'). 🔑
   *   - **autoIncrement**: true 🔄
   *   - Incrementa automáticamente el valor cada vez que se inserta un nuevo registro. 📈
   *   - **primaryKey**: true 🏷️
   *   - Define este campo como la clave primaria de la tabla. 🗂️
   */
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      get() {
        const value = this.getDataValue("status");
        return value ? "active" : "inactive";
      },
    },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "roles", // Nombre de la tabla referenciada
        key: "id", // Clave primaria de la tabla referenciada
      },
    },
  },
  {
    sequelize,
    modelName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Users.belongsTo(Roles, {
  foreignKey: "role_id",
  as: "role",
});