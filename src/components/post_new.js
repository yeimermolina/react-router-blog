import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import {connect } from 'react-redux';
import { createPost } from '../actions';

class NewPost extends Component{
  renderField(field){
    const { meta: { touched, error } } = field
    const className = `form-group ${touched && error ? 'has-danger': ''}`
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          type="text"
          {...field.input}
          className="form-control"
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }
  
  
  onSubmit(values){
    // 
    this.props.createPost(values, () =>{
      this.props.history.push('/');
    });
  }
  
  render(){
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="title"
          label="Title"
          component={this.renderField}
        />
        <Field
          name="categories"
          label="Categories"
          component={this.renderField}
        />
        <Field
          name="content"
          label="Content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary"> Submit </button>
        <Link to="/" className="btn btn-danger ml-2"> Cancel</Link>
      </form>
    );
  }
}

function validate(values){
  const errors = {}
  
  //Validate the inputs form values
  if(!values.title){
    errors.title = "Enter a title";
  }
  
  if(!values.categories){
    errors.categories = "Enter categories";
  }
  
  if(!values.content){
    errors.content = "Enter content";
  }
  
  
  //if errors is empty, the form is fine to submit
  //otherwise redux form is invalid
  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'PostsNewForm'
})(
    connect(null, { createPost })(NewPost)
);


