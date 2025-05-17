const User = require("./User");
const Emotion = require("./Emotion");
const Song = require("./Song");
const Recommendation = require("./Recommendation");

Emotion.hasMany(Song, { foreignKey: "emotionid" });
Song.belongsTo(Emotion, { foreignKey: "emotionid" });

User.hasMany(Recommendation, { foreignKey: "userrec" });
Recommendation.belongsTo(User, { foreignKey: "userrec" });

Song.hasMany(Recommendation, { foreignKey: "songrec" });
Recommendation.belongsTo(Song, { foreignKey: "songrec" });
