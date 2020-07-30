// All of the routes related to notes are now in the notes.js module under the controllers directory.

// The router is in fact a middleware,
// that can be used for defining "related routes" in a single place,
// that is typically placed in its own module.
const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

notesRouter.get("/:id", (request, response, next) => {
  const id = request.params.id;
  //   const note = Note.find((note) => note.id == id);
  Note.findById(id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

notesRouter.post("/", (request, response, next) => {
  // Without the json-parser, the body property would be undefined.
  // The json-parser takes the JSON data of a request, transforms it into a JavaScript object
  // and then attaches it to the body property of the request object before the route handler is called.
  const body = request.body;
  console.log(body);
  if (body.content === undefined) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });
  console.log(note);

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});

notesRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  //   the findByIdAndUpdate method receives a regular JavaScript object as its parameter,
  //   and not a new note object created with the Note constructor function.
  //   By default, the updatedNote parameter of the event handler receives the original document
  //   without the modifications. We added the optional { new: true } parameter,
  //   which will cause our event handler to be called with the new modified document instead of the original.
  Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
  })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

notesRouter.delete("/:id", (request, response, next) => {
  const id = request.params.id;
  Note.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

notesRouter.delete("/", (request, response, next) => {
  Note.remove()
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
