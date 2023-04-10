const mongoose = require('mongoose');
const { Schema } = mongoose;

const HomePageDataBoxSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  boxData: {
    type: [{
      type: Schema.Types.Mixed,
    }],
    required: true,
  },
});

const HomePageDataBox = mongoose.model('HomePageDataBox', HomePageDataBoxSchema);

module.exports = {HomePageDataBox}
