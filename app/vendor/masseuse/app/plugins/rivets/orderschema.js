{
    login: '',
        firstname: '',
    lastname: '',
    email: '',
    profile: {
    dob: '',
        gender: '',
        tocDate: '',
        billing: {
        name: '',
            number: '',
            expiration: '',
            address: {
            street: '',
                city: '',
                state: '',
                country: '',
                zip: ''
        }
    },
    subscriptions: [
        'email'
    ],
        restrictions: {
        profile: {
            primary : {
                configured: true,
                    pin: '{one way hashed pin}'
            },
            mature: {
                configured: true,
                    pin: '{one way hashed pin}'
            }
        },
        content: {
            filteredRatings: ['R', 'PG-13']
        }
    }
    devices: [{
        id: "",
        uuid: "",
        name: "",
        type: "",
        ratingsFilter: true,
        purchasePin: true,
        maturePin: true,
        dateCreated: '',
        active: true
    }],
        orders: [{
        _id: "",
        total: "",
        items: []
        title: "",
    }
    ]
}
}