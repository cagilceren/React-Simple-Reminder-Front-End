import "./App.css";
import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: [],
      title: "",
      date: "",
      updateId: null,
    };
  }

  onClickUpdate = () => {
    const dataToUpdate = {
      title: this.state.title,
      date: this.state.date,
    };
    axios
      .put(
        "http://localhost:8080/reminder/" + this.state.updateId,
        dataToUpdate
      )
      .then(() => {
        this.setState({
          updateId: null,
          title: "",
          date: "",
        });
        this.getAll();
      })
      .catch(() => alert("An error occured! Please check your inputs!"));
  };

  onClickAdd = () => {
    const dataToAdd = {
      title: this.state.title,
      date: this.state.date,
    };
    axios
      .post("http://localhost:8080/reminder", dataToAdd)
      .then(() => this.getAll())
      .catch(() => alert("An Error occurred! Plesase check your inputs!"));
  };

  onClickDelete = (id) => {
    axios
      .delete("http://localhost:8080/reminder/" + id)
      .then(() => this.getAll())
      .catch(() => alert("An Error occurred! Plesase try it again!"));
  };

  onClickCancel = () => {
    this.setState({
      updateId: null,
      title: "",
      date: "",
    });
  };

  onChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  onChangeDate = (event) => {
    this.setState({
      date: event.target.value,
    });
  };

  getAll = () => {
    axios.get("http://localhost:8080/reminder").then((data) => {
      this.setState({
        reminders: data.data,
      });
    });
  };

  componentDidMount() {
    this.getAll();
  }

  setUpdateItem = (item) => {
    this.setState({
      updateId: item.id,
      title: item.title,
      date: item.date,
    });
  };

  render() {
    return (
      <div className="Reminder">
        <div>
          <input
            onChange={this.onChangeTitle}
            value={this.state.title}
            type="text"
            id="title"
            name="title"
            placeholder="Title"
          />
          <input
            onChange={this.onChangeDate}
            value={this.state.date}
            type="text"
            id="date"
            name="date"
            placeholder="Date"
          />
          {this.state.updateId == null && (
            <button onClick={this.onClickAdd} id="add" name="add">
              Add
            </button>
          )}

          {this.state.updateId != null && (
            <button onClick={this.onClickUpdate} id="update" name="update">
              Update
            </button>
          )}

          {this.state.updateId != null && (
            <button onClick={this.onClickCancel} id="cancel" name="cancel">
              Cancel
            </button>
          )}
          <hr />
        </div>

        <div>
          <table width="100%">
            <tbody>
              <tr>
                <th></th>
                <th>Reminders</th>
                <th></th>
              </tr>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
              {this.state.reminders.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.date}</td>
                    <td>
                      <button
                        onClick={() => this.setUpdateItem(item)}
                        id="update-reminder"
                        name="update"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => this.onClickDelete(item.id)}
                        id="delete-reminder"
                        name="delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
