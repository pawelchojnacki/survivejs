import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import LaneActions from '../actions/LaneActions';
import Editable from './Editable.jsx';

export default class Lane extends React.Component {
  constructor(props) {
    super(props);
    const id = props.lane.id;
    this.addNote = this.addNote.bind(this, id);
    this.deleteNote = this.deleteNote.bind(this, id);
    this.editName = this.editName.bind(this, id);
    this.deleteLane = this.deleteLane.bind(this, id);
    this.activateLaneEdit = this.activateLaneEdit.bind(this, id);
  }
  render () {
    const {lane, ...props} = this.props;
    return (
      <div {...props}>
        <div className='lane-header' onClick={this.activateLaneEdit}>
          <div className='lane-add-note'>
            <button onClick={this.addNote}>+</button>
          </div>
          <Editable className='lane-name'
            editing={lane.editing}
            value={lane.name}
            onEdit={this.editName} />
          <div className='lane-delete'>
            <button onClick={this.deleteLane}>x</button>
          </div>
        </div>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getNotesByIds(lane.notes)
          }}
        >
          <Notes
            onValueClick={this.activateNoteEdit}
            onEdit={this.editNote}
            onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    );
  }
  addNote(laneId, e) {
    // If note is added, avoid opening lane name edit
    e.stopPropagation();
    const note = NoteActions.create({task: 'New task'});
    LaneActions.attachToLane({
      noteId: note.id,
      laneId
    })
  }
  editNote(id, task) {
    NoteActions.update({id, task});
  }
  deleteNote(laneId, noteId) {
    LaneActions.detachFromLane({laneId, noteId});
    NoteActions.delete(id);
  }
  editName(id, name) {
    console.log(`edit lane ${id} name using ${name}`);
  }
  deleteLane(id) {
    console.log(`delete lane ${id}`);
  }
  activateLaneEdit(id) {
    console.log(`activate lane ${id} edit`);
  }
  activateNoteEdit(id) {
    console.log(`activate note ${id} edit`);
  }
}
