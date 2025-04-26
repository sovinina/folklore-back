import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const FolkloreWork = sequelize.define('FolkloreWork', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    epoch_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

export default FolkloreWork;


