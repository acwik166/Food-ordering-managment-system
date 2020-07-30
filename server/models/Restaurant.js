const mongoose = require('mongoose');
const Dish = require('./Dish');
const Review = require('./Review');
const User = require('./User');
const addressSchema = require('./Address');

const restaurantSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId, ref: User,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  address: {
    type: addressSchema,
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
    type: mongoose.Schema.Types.ObjectId, ref: Dish,
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId, ref: Review,
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
  },
}, { timestamps: true })

// restaurantSchema.pre('remove', (next) => {
//   // Review.remove({ _id: this._id }, next);
// })

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;