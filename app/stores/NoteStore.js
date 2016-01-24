import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);
    this.notes = [];
    this.exportPublicMethods({
      getNotesByIds: this.getNotesByIds.bind(this)
    });
  }
  create(note) {
    const notes = this.notes;
    note.id = uuid.v4();
    this.setState({
      notes: notes.concat(note)
    });
    return note;
  }
  update(updatedNote) {
    const notes = this.notes.map(note => {
      if (note.id === updatedNote.id) {
        return Object.assign({}, note, updatedNote);
      }
      return note;
    });
    this.setState({notes}); /* same as notes: notes */
  }
  delete(id) {
    this.setState({
      notes: this.notes.filter(note => note.id !== id)
    });
  }
  getNotesByIds(ids) {
    // failsafe
    return (ids || []).map(
      id => this.notes.filter(note => note.id === id)
    // filter out possible empty arrays
    ).filter(a => a.length).map(a => a[0]);
  }
}

export default alt.createStore(NoteStore, 'NoteStore');
