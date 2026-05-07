//Ek in Memory DB
//save:(user1,{fname,lname})

//HashMap (key,value)
//          T? ,T?    whats the type it asks
//this is where we use the concept of generic <>

// to take data in we use interface

type UserId = string

interface User {
    id: UserId,
    fname: string,
    lname?: string, // ? makes it optional / not required 
    email: string,
    contact: {
        mobile: string
    },
    address: {
        street: string,
        pin: number,
        country: string
    }
}

class InMemoryDB {

    // private _db: Map<string, User> instead of changing type can mention directly 
    // private _db: Map<User['id'], User> not a good practise so we make custom type
    private _db: Map<UserId, User>

    constructor() {
        this._db = new Map<string, User>()
    }

    public insertUser(data: User): UserId {

        if (this._db.has(data.id)) {
            throw new Error(`User with ${data.id} already exists`)
        }

        this._db.set(data.id, data)

        return data.id
    }


    // Omit helps to not get the input of id as it is risky to take id as input
    public updateUser(id: UserId, updateData: Omit<User, 'id' | 'email'>): boolean {


        if (!this._db.has(id)) throw new Error(`User with ${id} does not exist`)


        //here if there is no id so where to update so we put the same id as in function
        const existingUser = this._db.get(id)!
        this._db.set(id, { ...updateData, id, email: existingUser.email });


        return true;
    }
}

const mydb = new InMemoryDB()
mydb.insertUser({
    id: '1',
    fname: 'Pratham',
    // lname: 'adinawar',
    email: 'pratham@gm.com',
    contact: {
        mobile: '1234566'
    },
    address: {
        street: 'gograss',
        pin: 421221,
        country: 'india',
    },


})

mydb.updateUser('1', {
    // id:'2'   // shows id does not exist
    fname: 'Pratham',
    lname: 'adinawar',
    // email: 'pratham@gm.com',   //shows email does not exists
    contact: {
        mobile: '1234566'
    },
    address: {
        street: 'gograss',
        pin: 421221,
        country: 'india',
    },


})