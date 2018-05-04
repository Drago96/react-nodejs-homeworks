import React, { Component } from "react";
import PropTypes from "prop-types";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import "./PostForm.css";

class PostForm extends Component {
  static propTypes = {
    values: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired
  };

  state = {
    postForm: {
      title: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Title"
        },
        value: this.props.values.title,
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
        value: this.props.values.author,
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
        value: this.props.values.text,
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
        value: this.props.values.tags,
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
        value: this.props.values.imageUrl,
        validation: {
          isUrl: true
        },
        valid: false,
        touched: false
      },
      status: {
        elementType: "radio",
        elementConfig: {
          options: [
            { value: "active", displayValue: "Active" },
            { value: "inactive", displayValue: "Inactive" }
          ],
          name: "status",
          checked: this.props.values.status
        },
        value: this.props.values.status,
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false
  };

  componentDidMount() {
    this.checkFormValidity();
  }

  checkFormValidity() {
    const formData = { ...this.state.postForm };

    let formIsValid = true;
    for (const inputIdentifiers in formData) {
      if (formData.hasOwnProperty(inputIdentifiers)) {
        formData[inputIdentifiers].valid = this.checkValidity(
          formData[inputIdentifiers].value,
          formData[inputIdentifiers].validation
        );
        formIsValid = formData[inputIdentifiers].valid && formIsValid;
      }
    }

    this.setState({ postForm: formData, formIsValid });
  }

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
      ...this.state.postForm
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

    if (updatedFormElement.elementType === "radio") {
      updatedFormElement.elementConfig.checked = updatedFormElement.value;
    }
    formData[inputId] = updatedFormElement;

    let formIsValid = true;
    for (const inputIdentifiers in formData) {
      if (formData.hasOwnProperty(inputIdentifiers)) {
        formIsValid = formData[inputIdentifiers].valid && formIsValid;
      }
    }

    this.setState({ postForm: formData, formIsValid });
  };

  render() {
    const formElementsArray = [];

    for (const key in this.state.postForm) {
      if (this.state.postForm.hasOwnProperty(key)) {
        formElementsArray.push({
          id: key,
          config: this.state.postForm[key]
        });
      }
    }

    const form = (
      <div className="PostForm">
        <h4>{this.props.title}</h4>
        <form onSubmit={this.props.onSubmit}>
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
            {this.props.action}
          </Button>
        </form>
      </div>
    );

    return form;
  }
}

export default PostForm;
