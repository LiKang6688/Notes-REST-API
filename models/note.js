const mongoose = require("mongoose");

// define the schema for a note and the matching model:
// The schema tells Mongoose how the note objects are to be stored in the database.
const noteSchema = new mongoose.Schema({
  content: { type: String, minlength: 5, required: true },
  date: { type: Date, required: true },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// format the objects returned by Mongoose is to modify the toJSON method of the schema
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// creates a new note object with the help of the Note model
// const note = new Note({
//   content: "HTML is Easy",
//   date: new Date(),
//   important: true,
// });

// Saving the object to the database happens with the appropriately named save method
// note.save().then((result) => {
//   console.log("note saved!");
//   // closes the database connection
//   mongoose.connection.close();
// });

// The objects are retrieved from the database with the find method of the Note model
// The parameter of the method is an object expressing search conditions
// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });

// In the Note model definition, the first "Note" parameter is the singular name of the model.
// The name of the collection will be the lowercased plural notes,
// because the Mongoose convention is to automatically name collections as the plural (e.g. notes)
// when the schema refers to them in the singular (e.g. Note).
// Models are so-called constructor functions that create new JavaScript objects based on the provided parameters.
module.exports = mongoose.model("Note", noteSchema);
// The public interface of the module is defined by setting a value to the module.exports variable.
