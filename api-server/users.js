const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const usersModal = require("./usersschema");
const { ObjectId } = require('mongodb');
//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg')
    }
})

const upload = multer({ storage: storage })

// creating accounts
router.post('/Users', upload.single('identity'), async function (req, res) {

    const saltRounds = 10;
    const myPlainPassword = req.body.password;
    const myPlainCPassword = req.body.c_password;
    const passwordHash = bcrypt.hashSync(myPlainPassword, saltRounds);
    const cpasswordHash = bcrypt.hashSync(myPlainCPassword, saltRounds);

    const newUser = new usersModal();
    newUser.fullname = req.body.fName + " " + req.body.lName;
    newUser.fName = req.body.fName;
    newUser.lName = req.body.lName;
    newUser.email = req.body.email;
    newUser.phoneno = req.body.phoneno;
    newUser.identity = req.file.filename;
    newUser.password = passwordHash;
    newUser.c_password = cpasswordHash;

    console.log("Image path ------>", newUser.identity)
    if (newUser.fullname && newUser.fName && newUser.lName && newUser.email && newUser.phoneno && newUser.identity) {
        const result = await newUser.save();
        if (result) {
            res.send({ status: 1, message: 'successful', data: newUser })
        } else {
            res.send({ status: 0, message: 'Something went wrong' })
        }
    } else {
        res.send({ message: "details need to be filled out" })
    }

})

// login users
router.post('/loginaccount', async function (req, res) {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
        return res.status(400).send({ status: 2, message: 'Email and password are required' });
    }

    try {
        const user = await usersModal.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ status: 1, message: 'Email not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            res.status(200).send({ status: 0, message: 'Login successful' });
        } else {
            res.status(401).send({ status: 3, message: 'Incorrect password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 4, message: 'Server error' });
    }

});


// displaying the users
router.get('/alluserdetails', async function (req, res) {
    try {
        const users = await usersModal.find({});
        // res.json(users);
        res.send({ users: users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving user data');
    }
});


// count of the users
router.get('/datacount', async (req, res) => {
    try {
        const count = await usersModal.countDocuments();
        res.json({ success: true, count: count });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// getting the user through id
router.get('/alluserdetails/:_id', async (req, res) => {
    try {
        const item = await usersModal.findById(req.params._id);
        if (item) {
            res.status(200).json(item); // Send the item as a JSON response
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// editing the user
router.put('/alluserdetails/:_id', async (req, res) => {
    const { _id } = req.params;
    const updateData = req.body;
    try {
        // Set the content-type to application/json
        res.type('json');

        // Find the document by _id and update it with the new data
        const updatedDocument = await usersModal.findByIdAndUpdate(_id, updateData, { new: true });

        // If no document is found, send a 404 response
        if (!updatedDocument) {
            // If the document is not found, send a 404 response
            return res.status(404).send({ message: 'Resource not found' });
        } else {
            // If the update is successful, send a 200 response with the updated document
            res.status(200).send({
                message: 'Update successful',
                updatedDocument
            });
        }

    } catch (error) {
        // If an error occurs, send a 500 response with the error message
        res.status(500).send({ message: error.message });
    }
});

// deleting the user
router.delete('/userdelete/:_id', async (req, res) => {
    try {
        const id = req.params._id;
        const result = await usersModal.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
            return res.status(200).send({ message: 'Document deleted successfully' });
        }
    } catch (error) {
        console.error("Error deleting user:", error);

        return res.status(500).send({ message: 'Internal server error' });

    }

});

module.exports = router;