import { Router } from 'express'
import { auth } from '../middleware/auth'
import NoteCtrl from './controller'

export default Router()
    .patch('/update/:note_id', [auth], NoteCtrl.updateNote) //update notes
    .post('/create', [auth], NoteCtrl.newNode) // create new note
    .get('/:user_id', [auth], NoteCtrl.topFive) // get all notes
    .delete('/delete', [auth], NoteCtrl.deleteNote) // delete single note
