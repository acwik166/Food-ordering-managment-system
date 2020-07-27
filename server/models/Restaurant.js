const mongoose = require('mongoose');
const Dish = require('./Dish');
const Review = require('./Review');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  address: {
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  delivery: {
    type: Number,
    required: true
  },
  deliveryFee: {
    type: Number,
    required: true
  },
  dishes: [{
    type: Schema.Types.ObjectId, ref: Dish,
  }],
  opinions: [{
    type: Schema.Types.ObjectId, ref: Review,
  }],
  workHours: {
    monday: {
      open: {
        type: String
      },
      close: {
        type: String
      }
    },
    tuesday: {
      open: {
        type: String
      },
      close: {
        type: String
      }
    },
    wednesday: {
      open: {
        type: String
      },
      close: {
        type: String
      }
    },
    thursday: {
      open: {
        type: String
      },
      close: {
        type: String
      }
    },
    friday: {
      open: {
        type: String
      },
      close: {
        type: String
      }
    },
    saturday: {
      open: {
        type: String
      },
      close: {
        type: String
      }
    },
    sunday: {
      open: {
        type: String
      },
      close: {
        type: String
      }
    },
    required: true
  },
}, { timestamps: true })

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;