import mongoose from 'mongoose'

const LocationSchema = new mongoose.Schema({

    owner:{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'We need owner id.'],
        },
        professionnel: {
            type: Boolean,
            default: false,
            required: [true, 'Owner is professionnel ?'],
        }
    },

    title: {
        type: String,
        trim: true,
        required: [true, 'Please provide a title for this location.'],
        minlength: [5, 'Name cannot be more than 5 characters'],
        maxlength: [60, 'Name cannot be more than 60 characters']    
    },
    
    description: {
        type: String,
        trim: true,
        required: [true, 'Please provide a description for this location.'],
        minlength: [5, 'Name cannot be more than 5 characters'],
        maxlength: [500, 'Name cannot be more than 500 characters.']
    },

    images_url: [{ type: String }],

    location_type: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories' },

    informations: {
        size: {
            type: Number,
            default: 0, // en mètre carré
            min: 0
        },
        bedroom: {
            type: Number,
            default: 0,
            min: 0
        },
        bed: {
            type: Number,
            default: 0,
            min: 0
        },
        bathrooms: {
            type: Number,
            default: 0,
            min: 0
        }, 
        maxGuests: {
            type: Number,
            default: 0,
            min: 0
        }, 
    },

    internalRegulations: {

        children: {
            type: Boolean,
            default: false,
        },
        pets: {
            type: Boolean,
            default: false,
        },
        events: {
            type: Boolean,
            default: false,
        },
        alcohol: {
            type: Boolean,
            default: false,
        },
        smoking: {
            type: Boolean,
            default: false,
        },
        music: {
            type: Boolean,
            default: false,
        },
        owner_message: {
            type: String,
            default: null, 
            trim: true,
            maxlength: [60, 'Name cannot be more than 60 characters']  
        }
    },

    options: {
        equipments: {
            commun: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipments' }],
            voyageurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipments' }],
            security: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipments' }],
        },

        extras: [{
            title: {
                type: String,
                trim: true,
                required: [true, 'Please provide a title for this extras.'],
                maxlength: [80, 'Name cannot be more than 80 characters']    
            },
            description: {
                type: String,
                trim: true,
                required: [true, 'Please provide a description for this extras.'],
                maxlength: [250, 'Name cannot be more than 250 characters']
            },
            price: {
                type: Number,
                required: [true, 'Please provide a price for this extras.'],
                min: 0
            }
        }]
    },

    price: {
        fixed: {
            type: Boolean,
            default: true // true le prix ne change pas (base) & false le prix change sous certaine conditions
        },
        base: {
            type: Number,
            required: [true, 'Please provide a price for this location.'],
            min: 0
        },
        options: {

        }
    },

    coordinate: {
        latitude: {
            type: Number,
            required: [true, 'We need latitude.'],
        },
        longitude: {
            type: Number,
            required: [true, 'We need longitude.'],
        },

        address_full_name: {
            type: String,
            required: [true, 'We need Address.'],
        },

        street: {
            type: String,
        },

        town: {
            short_code: {
                type: String,
            },
            name: {
                type: String,
            },
            wikidata: {
                type: String,
            },
        },

        postcode: {
            short_code: {
                type: String,
            },
            name: {
                type: String,
            },
            wikidata: {
                type: String,
            },
        },

        region: {
            short_code: {
                type: String,
            },
            name: {
                type: String,
            },
            wikidata: {
                type: String,
            },
        },

        country: {
            short_code: {
                type: String,
            },
            name: {
                type: String,
            },
            wikidata: {
                type: String,
            },
        },
    },

    reserved: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        startAt: {
            type: Date,
            required: [true, 'We need a reservation start at ?'],
        },
        endAt: {
            type: Date,
            required: [true, 'We need a reservation end at ?'],
        },
        reservedAt: {
            type: Date,
            default: Date.now
        },
    }],

    comments: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        message: {
            type: String,
            default: null,
            trim: true,
            minlength: [1, 'Message cannot be more than 1 characters'],
            maxlength: [500, 'Message cannot be more than 500 characters']
        },
        rating: {
            type: Number,
            default: 0,
            min: 1,
            max: 5
        },
        publishAt: {
            type: Date,
            default: Date.now
        },
        updateAt: {
            type: Date,
            default: Date.now
        }
    }],
    
    users_likes_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    
    stats: {
        totals_views: {
            type: Number,
            default: 0,
            min: 0
        },

        totals_comments: {
            type: Number,
            default: 0,
            min: 0
        },

        totals_likes: {
            type: Number,
            default: 0,
            min: 0
        },

        ratings: {
            type: Number,
            default: 0,
            min: 1,
            max: 5
        },
    },

    is_published: {
        type: Boolean,
        default: false
    },

    location_suspended: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true, 
    strict: false 
});

export default mongoose.models.Location || mongoose.model('Location', LocationSchema);