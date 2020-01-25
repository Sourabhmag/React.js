import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import ViewAgendaOutlinedIcon from "@material-ui/icons/ViewAgendaOutlined";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import PersistantDrawer from "./PersistantDrawer";
import KeepLogo from "../Images/keepLogo.png";
import { withStyles } from "@material-ui/styles";
import ProfPopoverButton from "./ProfPopoverButton";
import { search } from "./Service";
import { listView, gridView } from "../Redux/Action";
import { connect } from "react-redux";

const OverridedInputBase = withStyles({
  input: {
    width: "670px",
    minWidth: "80px"
  }
})(InputBase);
class Appbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKey: "",
      searchArray: []
    };
  }

  searchAllNotes = () => {};
  handleSearch = event => {
    this.setState(
      {
        searchKey: event.target.value
      },
      () => {
        search(this.state.searchKey).then(Response => {
          this.setState(
            {
              searchArray: Response.data.data
            },
            () => {
              this.props.props.history.push({
                pathname: "/dashboard/search",
                state: { searchArray: this.state.searchArray }
              });
            }
          );
        });
      }
    );
  };
  handleSearchClick = () => {
    this.props.props.history.push({
      pathname: "/dashboard/search",
      state: { searchArray: this.state.searchArray }
    });
  };
  render() {
    return (
      <div className="dashboard">
        <AppBar className="appbar" position="fixed">
          <Toolbar className="appbar">
            <div className="keepAndLogo">
              <div>
                <PersistantDrawer
                  array={this.props.array}
                  handelNoteClick={this.props.handelNoteClick}
                  handelReminderClick={this.props.handelReminderClick}
                  handelArchiveClick={this.props.handelArchiveClick}
                  handelTrashClick={this.props.handelTrashClick}
                  handelLabelsClick={this.props.handelLabelsClick}
                  isGrid={this.state.grid}
                />
              </div>

              <div className="logo">
                <img src={KeepLogo} alt={KeepLogo} />
              </div>
              <div>
                <span className="keep">Keep</span>
              </div>
            </div>
            <div className="searchDiv">
              <div className="logo">
                <IconButton
                  onClick={this.handleSearchClick}
                  color="black"
                  aria-label="Open drawer"
                >
                  <SearchIcon />
                </IconButton>
              </div>
              <div className="searchBar">
                <OverridedInputBase
                  onChange={this.handleSearch}
                  placeholder="Search…"
                />
              </div>
            </div>

            <div>
              <IconButton color="black">
                <Badge color="black">
                  <RefreshIcon />
                </Badge>
              </IconButton>
              <IconButton
                color="black"
                aria-label="Toggle password visibility"
                onClick={() =>
                  !this.props.view
                    ? this.props.listView()
                    : this.props.gridView()
                }
              >
                <Badge color="black">
                  {!this.props.view ? (
                    <ViewAgendaOutlinedIcon />
                  ) : (
                    <DashboardOutlinedIcon />
                  )}
                </Badge>
              </IconButton>
              <IconButton color="black">
                <SettingsOutlinedIcon />
              </IconButton>
            </div>
            <div className="profile">
              <div>
                <IconButton color="inherit">
                  <ProfPopoverButton DashboardProps={this.props} />
                </IconButton>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    view: state.view
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listView: () => dispatch(listView()),
    gridView: () => dispatch(gridView())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Appbar);
