import React, { Component } from "react";
import PropTypes from "prop-types";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import "./CreatePost.css";
import axios from "../../axios";

class CreatePost extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  state = {
    blogForm: {
      title: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Title"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      author: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Author"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      text: {
        elementType: "textarea",
        elementConfig: {
          type: "text",
          placeholder: "Text",
          rows: 8
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      tags: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Tags"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      imageUrl: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Image Url"
        },
        value: "",
        validation: {
          isUrl: true
        },
        valid: true,
        touched: false
      },
      status: {
        elementType: "radio",
        elementConfig: {
          options: [
            { value: "active", displayValue: "Active" },
            { value: "inactive", displayValue: "Inactive" }
          ],
          name: "status"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    loading: false
  };

  blogCreateHandler = async event => {
    event.preventDefault();

    const formData = {};

    for (const formElementIdentifier in this.state.blogForm) {
      if (this.state.blogForm.hasOwnProperty(formElementIdentifier)) {
        formData[formElementIdentifier] = this.state.blogForm[
          formElementIdentifier
        ].value;
      }
    }

    formData.tags = formData.tags.split(" ");
    formData.createdAt = new Date().getTime();

    this.setState({ loading: true });
    try {
      await axios.post("/posts.json", formData);
      this.props.history.push("/posts/recent");
    } catch (e) {
      this.setState({ loading: false });
    }
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (!rules.required) {
      if (!value.trim()) {
        return true;
      }
    }

    if (rules.isUrl) {
      isValid =
        // eslint-disable-next-line
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
          value
        ) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputId) => {
    const formData = {
      ...this.state.blogForm
    };

    const updatedFormElement = {
      ...formData[inputId]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;

    formData[inputId] = updatedFormElement;

    let formIsValid = true;
    for (const inputIdentifiers in formData) {
      if (formData.hasOwnProperty(inputIdentifiers)) {
        formIsValid = formData[inputIdentifiers].valid && formIsValid;
      }
    }

    this.setState({ blogForm: formData, formIsValid });
  };

  render() {
    const formElementsArray = [];

    for (const key in this.state.blogForm) {
      if (this.state.blogForm.hasOwnProperty(key)) {
        formElementsArray.push({
          id: key,
          config: this.state.blogForm[key]
        });
      }
    }

    let form = (
      <div className="CreatePost">
        <h4>Create Post</h4>
        <form onSubmit={this.blogCreateHandler}>
          {formElementsArray.map(e => {
            return (
              <Input
                key={e.id}
                elementType={e.config.elementType}
                elementConfig={e.config.elementConfig}
                value={e.config.value}
                invalid={!e.config.valid}
                shouldValidate={e.config.touched}
                changed={event => this.inputChangedHandler(event, e.id)}
              />
            );
          })}
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            CREATE
          </Button>
        </form>
      </div>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return form;
  }
}

export default CreatePost;
