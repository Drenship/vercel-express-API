import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'We need a email for create account.'],
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'You need a password for create account.']
    },

    user_profil: {
        lastName: {
            type: String,
            trim: true,
            required: [true, 'Please provide a last name for this pet.'],
            maxlength: [30, 'Last name cannot be more than 30 characters']
        },
        firstName: {
            type: String,
            trim: true,
            required: [true, 'Please provide a first name for this pet.'],
            maxlength: [30, 'First name cannot be more than 30 characters']
        },
        thumbnail_url: {
            type: String,
            default: null
        },
        description: {
            type: String,
            maxlength: [200, 'Description cannot be more than 200 characters'],
            default: null
        },
        professionnel: {
            type: Boolean,
            default: false,
        },
        account_verified: {
            type: Boolean,
            default: false
        },
        favories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }]
    },

    security: {
        code: {
            type: String,
            default: ""
        },
        codeEndDate: {
            type: Date,
            default: Date.now
        },
        _notif_connect: {
            type: Boolean,
            default: false
        },
        _2fa: {
            type: Boolean,
            default: false
        },
        _2fa_type: {
            type: String,
            default: ""
        },
        login_history: [{ 
            ip: {
                type: String,
                default: null
            },
            location: {
                type: String,
                default: null
            },
            date: {
                type: Date,
                default: Date.now
            }
        }],
    },

    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true, 
    strict: false 
});

export default mongoose.models.User || mongoose.model('User', UserSchema);