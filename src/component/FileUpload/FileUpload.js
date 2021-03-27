import React, { Component } from "react";
import axios from "axios";
import "./FileUpload.css";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }

  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });

    console.log(event.target.files[0]);
  };

  onClickHandler = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);

    console.log(data);
    if (this.state.selectedFile) {
      axios
        .post("http://localhost:8000/upload", data)
        .then((res) => console.log(res.statusText))
        .catch((e) => console.log(e));
    }
  };

  render() {
    return (
      <div className="FileUpload">
        <h1>UPLOAD EXCEL FILE</h1>
        <input
          className="form-control-file"
          type="file"
          name="file"
          onChange={this.onChangeHandler}
        />
        <button
          className="btn btn-success btn-block"
          onClick={this.onClickHandler}
        >
          UPLOAD
        </button>
      </div>
    );
  }
}

export default FileUpload;
