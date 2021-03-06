import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {addFriend, editFriend, clearSelected, deleteSelected} from '../actions';

const StyledForm = styled.form`
  max-width: 40%;
  margin: 0 auto;
  background-color: #0e0e13;
  border: 1px solid black;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;

  input {
    width: 50%;
    padding: 5px;
    margin: 3px;
    font-size: 16px;
  }
`;

class FriendForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      age: '',
      email: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.selected !== prevProps.selected) {
      if (this.props.selected) {
        const f = this.props.selected;
        this.setState({name: f.name, age: f.age, email: f.email});
      } else {
        this.setState({name: '', age: '', email: ''});
      }
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.name || !this.state.age || !this.state.email) {
      alert('all fields must be filled before submitting');
    } else {
      const func = this.props.editMode
        ? this.props.editFriend
        : this.props.addFriend;
      const arg = this.props.editMode
        ? {...this.state, id: this.props.selected.id}
        : this.state;
      func(arg);
      this.setState({
        name: '',
        age: '',
        email: '',
      });
    }
  };

  deleteFriend = e => {
    e.preventDefault();
    this.props.deleteSelected(this.props.selected.id);
  };

  clearSelected = e => {
    e.preventDefault();
    this.props.clearSelected();
    this.setState({name: '', age: '', email: ''});
  };

  render() {
    console.log('form render', this.props);
    const createInput = (name, type = 'text') => {
      return (
        <input
          type={type}
          placeholder={name}
          name={name}
          value={this.state[name]}
          onChange={this.handleChange}
        />
      );
    };
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        {createInput('name')}
        {createInput('age', 'number')}
        {createInput('email', 'email')}
        <input type="submit" />
        {this.props.editMode && (
          <div>
            <button onClick={this.clearSelected}>Clear Selected</button>
            <button onClick={this.deleteFriend}>DELETE FRIEND</button>
          </div>
        )}
      </StyledForm>
    );
  }
}

//const mapStateToProps = state => {
//return {
//selected: state.selected,
//};
//};

export default connect(
  null,
  {addFriend, editFriend, clearSelected, deleteSelected},
)(FriendForm);
