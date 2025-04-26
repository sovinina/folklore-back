import sequelize from '../config/database.js';

import FolkloreWork from './work.js';
import Genre from './genre.js';
import Epoch from './epoch.js';
import User from './user.js';

// Установка связей
FolkloreWork.belongsTo(Genre, { foreignKey: 'genre_id' });
FolkloreWork.belongsTo(Epoch, { foreignKey: 'epoch_id' });

Genre.hasMany(FolkloreWork, { foreignKey: 'genre_id' });
Epoch.hasMany(FolkloreWork, { foreignKey: 'epoch_id' });

const initModels = async () => {
  await sequelize.sync(); 
};

export {
  sequelize,
  initModels,
  FolkloreWork,
  Genre,
  Epoch,
  User,
};
