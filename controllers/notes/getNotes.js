const selectAllNotesIdQuery = require('../../db/queries/notes/selectAllNotesIdQuery');

const getNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    // Para ver las entradas hay que estar logueados.
    const notes = await selectAllNotesIdQuery(noteId, req.user.id);

    // Enviar la respuesta con la nota obtenida
    res.send({
      status: 'Success',
      data: {
        notes,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getNote;
