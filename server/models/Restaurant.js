const mongoose = require('mongoose');

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
    type: Schema.Types.ObjectId, ref: 'Dish',
  }],
  opinions: [{
    type: Schema.Types.ObjectId, ref: 'Review',
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

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  ingredients: [{
    type: String
  }],
  size: [{
    type: Number
  }],
  category: [{
    type: String
  }]
})

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }
}, { timestamps: true })

// Order schema

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const Review = mongoose.model('Review', reviewSchema);
const Dish = mongoose.model('Dish', dishSchema);