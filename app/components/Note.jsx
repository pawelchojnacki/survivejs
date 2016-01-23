import React from 'react';

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    // track 'editing' state
    this.state = {
      editing: false
    };
  }
  render() {
    // render the component differently based on state
    if (this.state.editing) {
      return this.renderEdit();
    }
    return this.renderNote();
  }
  renderEdit = () => {
    // Deal with blur and input handlers. These map to DOM events.
    // We set selection to input end using a callback at ref. It gets
    // triggered after the component is mounted.
    //
    // We could also use a string reference (i.e., `ref="input") and
    // then refer to the element in question later in the code. This
    // would allow us to use the underlying DOM API.
    return <input type='text'
      ref={
        (e) => e? e.selectionStart = this.props.task.length : null
      }
      autofocus={true}
      defaultValue={this.props.task}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter} />;
  };
  renderNote = () => {
    // if the user clicks on normal note, trigger editing logic
    const onDelete = this.props.onDelete;
    return (
      <div onClick={this.edit}>
        <span>{this.props.task}</span>
        {onDelete ? this.renderDelete() : null}
      </div>
    );
  };
  renderDelete = () => {
    return <button onClick={this.props.onDelete}>x</button>;
  };
  edit = () => {
    this.setState({
      editing: true
    })
  };
  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  };
  finishEdit = (e) => {
    // `Note` will trigger an optional `onEdit` callback once it
    // has a new value. We will use this to communicate the change to
    // `App`.
    const value = e.target.value;
    if (this.props.onEdit && value.trim()) {
      this.props.onEdit(value);
      this.setState({
        editing: false
      });
    }
  };
}
