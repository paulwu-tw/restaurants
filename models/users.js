const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String, // 資料型別是字串
        required: true // 這是個必填欄位
    },
    email: {
        type: String, // 資料型別是字串
        required: true, // 這是個必填欄位
        unique: true // 這是個唯一值
    },
    password: {
        type: String, // 資料型別是字串
        required: true // 這是個必填欄位
    },
    createdAt: {
        type: Date, // 資料型別是日期
        default: Date.now // 預設值是當下的時間
    },
    restaurants: [{
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    }]
});

module.exports = mongoose.model('user', userSchema);

